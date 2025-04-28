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

  return (
    <main className="min-h-screen flex flex-col">
      <section className="flex-grow container mx-auto p-4 md:flex gap-6">
        {/* Map Section */}
        <div className="md:w-2/3 mb-6 md:mb-0">
          <div className="bg-white rounded-lg shadow-lg p-4 h-full">
            <h2 className="text-2xl font-semibold mb-4">Field Map</h2>
            <p className="mb-4">
              Draw the perimeter of your land on the map and enter the
              information.
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
                className={`px-4 py-2 rounded font-semibold w-full ${
                  isDrawing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-agroke-green/65 text-agroke-black-light hover:bg-agroke-green-dark/90 hover:text-white font-bold"
                }`}
              >
                {isDrawing ? "Drawing in progress..." : "Draw area"}
              </button>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-2xl font-semibold mb-4">Field Information</h2>
            {!state.isLoading && (
              <form action={formAction}>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="fieldName"
                  >
                    Field Name
                  </label>
                  <input
                    id="fieldName"
                    required
                    type="text"
                    name="fieldName"
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter the field name"
                  />
                </div>
                {polygonCoordinates.length > 0 &&
                  polygonCoordinates.map((point, index) => (
                    <div className="hidden" key={index}>
                      <div className="mb-4 ">
                        <label
                          className="block text-sm font-medium mb-2"
                          htmlFor="lng"
                        >
                          Longitude
                        </label>
                        <textarea
                          id="lng"
                          name="lng"
                          readOnly
                          value={point[0]}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          placeholder="I punti della longitudine verranno visualizzati qui"
                        ></textarea>
                      </div>
                      <div className="mb-4 ">
                        <label
                          className="block text-sm font-medium mb-2"
                          htmlFor="lng"
                        >
                          Latitude
                        </label>
                        <textarea
                          id="lat"
                          name="lat"
                          readOnly
                          value={point[1]}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          placeholder="I punti della latitudine verranno visualizzati qui"
                        ></textarea>
                      </div>
                    </div>
                  ))}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="fieldDescription"
                  >
                    Description
                  </label>
                  <textarea
                    id="fieldDescription"
                    name="fieldDescription"
                    required
                    value={fieldDescription}
                    onChange={(e) => setFieldDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter a description of the field"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-agroke-green/65 text-agroke-black-light hover:bg-agroke-green-dark/90 hover:text-white font-bold rounded"
                >
                  Save field
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
