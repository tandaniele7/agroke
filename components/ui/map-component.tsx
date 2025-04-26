"use client";

import { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Polygon } from "ol/geom";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import { Style, Fill, Stroke, Text } from "ol/style";
import XYZ from "ol/source/XYZ";
import { MapComponentProps } from "@/lib/definitions";



export default function MapComponent({ initialFields }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const vectorSource = new VectorSource();
      
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: function(feature) {
          return new Style({
            fill: new Fill({
              color: 'rgba(128, 0, 30, 0.3)',
            }),
            stroke: new Stroke({
              color: 'red',
              width: 2,
            }),
            text: new Text({
              text: feature.get('name'),
              font: '14px Calibri,sans-serif',
              fill: new Fill({ color: '#000' }),
              stroke: new Stroke({ color: '#fff', width: 2 }),
              offsetY: -15
            })
          });
        }
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
          center: fromLonLat([12.4964, 41.9028]),
          zoom: 5,
        }),
      });

      mapInstanceRef.current = map;

      // Add field polygons
      initialFields.forEach(field => {
        try {
          const polygonCoords = field.coordinates.map((coord: number[]) => 
            fromLonLat([coord[0], coord[1]])
          );
          
          const polygon = new Polygon([polygonCoords]);
          const feature = new Feature({
            geometry: polygon,
            name: field.fieldName,
            id: field.id,
            description: field.description
          });
          
          vectorSource.addFeature(feature);
        } catch (err) {
          console.error(`Error adding field ${field.id} to map:`, err);
        }
      });

      // Fit view to show all fields
      if (vectorSource.getFeatures().length > 0) {
        map.getView().fit(vectorSource.getExtent(), {
          padding: [50, 50, 50, 50],
          duration: 1000
        });
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.dispose();
        mapInstanceRef.current = null;
      }
    };
  }, [initialFields]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full"
    />
  );
}