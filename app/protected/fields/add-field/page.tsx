"use client";

import { useEffect, useRef, useState, useActionState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Draw from "ol/interaction/Draw";
import { Geometry, Polygon } from "ol/geom";
import { fromLonLat, toLonLat } from "ol/proj";
import Feature from "ol/Feature";
import { Style, Fill, Stroke } from "ol/style";
import XYZ from "ol/source/XYZ";
import { addFieldData } from "@/app/actions";

export default function Home() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const vectorSourceRef = useRef<VectorSource<Feature<Geometry>> | null>(null);
  const drawInteractionRef = useRef<Draw | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [polygonCoordinates, setPolygonCoordinates] = useState<number[][]>([]);
  const [fieldName, setFieldName] = useState("");
  const [fieldDescription, setFieldDescription] = useState("");
  const [fields, setFields] = useState<any[]>([]);
  const initialState = {
    isLoading: false,
    error: null,
  };
  const [state, formAction] = useActionState(addFieldData, initialState);
  // Initialize the map when the component mounts
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const vectorSource = new VectorSource();
      vectorSourceRef.current = vectorSource;

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
          fill: new Fill({
            color: "rgba(128, 0, 30, 0.3)",
          }),
          stroke: new Stroke({
            color: "red",
            width: 2,
          }),
        }),
      });

      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              attributions: "Imagery provided by Esri",
              url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              maxZoom: 19,
            }),
          }),
          vectorLayer,
        ],
        view: new View({
          center: fromLonLat([12.4964, 41.9028]), // Center on Rome
          zoom: 5,
        }),
      });

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.dispose();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Start drawing a polygon on the map
  const startDrawing = () => {
    if (!mapInstanceRef.current || !vectorSourceRef.current) return;

    if (drawInteractionRef.current) {
      mapInstanceRef.current.removeInteraction(drawInteractionRef.current);
    }

    vectorSourceRef.current.clear();
    setPolygonCoordinates([]);

    const draw = new Draw({
      source: vectorSourceRef.current,
      type: "Polygon",
    });

    draw.on("drawend", (event) => {
      const feature = event.feature;
      const geometry = feature.getGeometry() as Polygon;

      const coordinates = geometry
        .getCoordinates()[0]
        .map((coord) => toLonLat(coord));
      setPolygonCoordinates(coordinates);
      setIsDrawing(false);

      if (mapInstanceRef.current) {
        mapInstanceRef.current.removeInteraction(draw);
      }
    });

    mapInstanceRef.current.addInteraction(draw);
    drawInteractionRef.current = draw;
    setIsDrawing(true);
  };

  // Save the field data
  const saveField = () => {
    if (!fieldName || polygonCoordinates.length === 0) {
      alert("Inserisci il nome del campo e disegna un'area sulla mappa.");
      return;
    }

    const newField = {
      name: fieldName,
      description: fieldDescription,
      coordinates: polygonCoordinates,
    };

    setFields((prevFields) => [...prevFields, newField]);
    setFieldName("");
    setFieldDescription("");
    setPolygonCoordinates([]);
    vectorSourceRef.current?.clear();
    alert("Campo salvato con successo!");
  };

  return (
    <main className="min-h-screen flex flex-col">
      <section className="flex-grow container mx-auto p-4 md:flex gap-6">
        {/* Map Section */}
        <div className="md:w-2/3 mb-6 md:mb-0">
          <div className="bg-white rounded-lg shadow-lg p-4 h-full">
            <h2 className="text-2xl font-semibold mb-4">
              Mappa del tuo terreno
            </h2>
            <p className="mb-4">
              Disegna il perimetro del tuo terreno sulla mappa e inserisci le
              informazioni.
            </p>
            <div
              ref={mapRef}
              className="w-full border border-gray-300 rounded mb-4"
              style={{ height: "500px" }}
            ></div>

            <div className="flex space-x-4">
              <button
                onClick={startDrawing}
                disabled={isDrawing}
                className={`px-4 py-2 rounded font-semibold ${
                  isDrawing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {isDrawing ? "Disegno in corso..." : "Disegna area"}
              </button>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-2xl font-semibold mb-4">
              Informazioni sul campo
            </h2>
            <form action={formAction}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="fieldName"
                >
                  Nome del campo
                </label>
                <input
                  id="fieldName"
                  required
                  type="text"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Inserisci il nome del campo"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="fieldDescription"
                >
                  Descrizione
                </label>
                <textarea
                  id="fieldDescription"
                  required
                  value={fieldDescription}
                  onChange={(e) => setFieldDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Inserisci una descrizione del campo"
                ></textarea>
              </div>
              <div className="mb-4 hidden">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="polygonCoordinates"
                >
                  Punti del poligono
                </label>
                <textarea
                  id="polygonCoordinates"
                  readOnly
                  value={polygonCoordinates
                    .map((point) => {
                      console.log(point);
                      point.join(", ");
                    })
                    .join("\n")}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="I punti del poligono verranno visualizzati qui"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
              >
                Salva campo
              </button>
            </form>
          </div>

          {/* Display Saved Fields */}
          {fields.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-4 mt-6">
              <h2 className="text-2xl font-semibold mb-4">Campi salvati</h2>
              <ul className="space-y-4">
                {fields.map((field, index) => (
                  <li key={index} className="p-3 border rounded">
                    <h3 className="font-semibold">{field.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {field.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Coordinate: {field.coordinates.length} punti
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
