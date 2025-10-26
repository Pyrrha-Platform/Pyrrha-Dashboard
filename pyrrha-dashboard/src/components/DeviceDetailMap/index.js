import React, { memo, useEffect, useRef } from 'react';
/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';
import './DeviceDetailMap.scss';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const DeviceDetailMap = ({ device }) => {
  let mapWrapper = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    // Only create map if device has location data
    if (!device || !device.latitude || !device.longitude) {
      return;
    }

    if (map.current) {
      map.current.remove();
    }

    // Create map focused on the specific device
    map.current = new mapboxgl.Map({
      container: mapWrapper,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [parseFloat(device.longitude), parseFloat(device.latitude)],
      zoom: 15, // Zoomed in to show device location detail
      attributionControl: false,
      preserveDrawingBuffer: true,
    }).addControl(
      new mapboxgl.AttributionControl({
        compact: true,
      }),
    );

    map.current.once('load', () => {
      map.current.resize();

      // Add the device marker
      map.current.addSource('device', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {
            id: device.id,
            deviceId: device.device_id || device.id,
            statusColor: device.statusColor || 'green',
          },
          geometry: {
            type: 'Point',
            coordinates: [parseFloat(device.longitude), parseFloat(device.latitude)],
          },
        },
      });

      // Add device marker layer
      map.current.addLayer({
        id: 'device-marker',
        type: 'circle',
        source: 'device',
        paint: {
          'circle-radius': 12,
          'circle-color': [
            'match',
            ['get', 'statusColor'],
            'green',
            '#24a148',
            'yellow',
            '#f1c21b',
            'red',
            '#da1e28',
            '#24a148', // default green
          ],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      });

      // Add device label
      map.current.addLayer({
        id: 'device-label',
        type: 'symbol',
        source: 'device',
        layout: {
          'text-field': ['get', 'deviceId'],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 2],
          'text-anchor': 'top',
          'text-size': 12,
        },
        paint: {
          'text-color': '#ffffff',
          'text-halo-color': '#000000',
          'text-halo-width': 1,
        },
      });
    });

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [device]);

  // Show message if no location data
  if (!device || !device.latitude || !device.longitude) {
    return (
      <div className="device-detail-map__no-location">
        <p>Location data not available for this device</p>
      </div>
    );
  }

  return (
    <div className="device-detail-map">
      <div className="device-detail-map__info">
        <h4>Device Location: {device.device_id || device.id}</h4>
        <p>
          Coordinates: {parseFloat(device.latitude).toFixed(6)}, {parseFloat(device.longitude).toFixed(6)}
        </p>
      </div>
      <div
        ref={(el) => (mapWrapper = el)}
        className="device-detail-map__container"
      />
    </div>
  );
};

export default memo(DeviceDetailMap);