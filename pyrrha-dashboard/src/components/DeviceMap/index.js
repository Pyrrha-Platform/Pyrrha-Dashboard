import React, { memo, useEffect, useRef } from 'react';
import { ZoomIn16, ZoomOut16 } from '@carbon/icons-react';
import mapboxgl from 'mapbox-gl';
import Utils from '../../utils/Utils';

const DEFAULT_LATITUDE = 28;
const DEFAULT_LONGITUDE = -90;
const DEFAULT_ZOOM = 2.3;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const transformToGeoJSON = (device) => {
  return device
    .filter((s) => s.latitude && s.longitude)
    .map((sensor) => {
      return {
        type: 'Feature',
        properties: {
          id: sensor.id,
          highlighted: false,
          pos: [parseFloat(sensor.longitude), parseFloat(sensor.latitude)],
          isUserOwner: sensor.isUserOwner ? 1 : 0,
          statusColor: sensor.statusColor,
          hover: false,
        },
        geometry: {
          type: 'Point',
          coordinates: [
            parseFloat(sensor.longitude),
            parseFloat(sensor.latitude),
          ],
        },
      };
    });
};

const DeviceMap = ({
  device,
  setDisplayedSensor,
  setShouldShowSideMenu,
  onSensorHover,
  currentHoveredSensor,
}) => {
  let mapWrapper = useRef();
  let map = useRef();

  const deviceData = {
    type: 'FeatureCollection',
    features: transformToGeoJSON(device),
  };

  useEffect(() => {
    if (!map.current || currentHoveredSensor === undefined) return;

    const updateSensorHover = (index, hover) => {
      let newDeviceFeatures = [...deviceData.features];

      newDeviceFeatures[index].properties.hover = hover;

      map.current
        .getSource('device')
        .setData({ ...deviceData, features: newDeviceFeatures });
    };

    updateSensorHover(currentHoveredSensor, true);

    return () => updateSensorHover(currentHoveredSensor, false);
  }, [currentHoveredSensor]);

  useEffect(() => {
    //if (device.length > 0) {
    map.current = new mapboxgl.Map({
      container: mapWrapper,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [DEFAULT_LONGITUDE, DEFAULT_LATITUDE],
      zoom: DEFAULT_ZOOM,
      attributionControl: false,
      preserveDrawingBuffer: true,
    }).addControl(
      new mapboxgl.AttributionControl({
        compact: true,
      })
    );

    map.current.once('load', () => {
      map.current.resize();

      map.current.addSource('device', {
        type: 'geojson',
        data: deviceData,
      });

      map.current.addLayer({
        id: 'device',
        type: 'circle',
        source: 'device',
        paint: {
          'circle-blur': 0,
          'circle-opacity': {
            base: 1,
            stops: [
              [DEFAULT_ZOOM, 1],
              [8, 1],
              [12, 0.7],
            ],
          },
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            5,
            ['case', ['boolean', ['get', 'hover'], true], 10, 5],
            10,
            100,
          ],
          'circle-color': [
            'match',
            ['get', 'statusColor'],
            'green',
            '#3DC04E',
            'yellow',
            '#c9bc0d',
            '#c9bc0d',
          ],
        },
      });

      map.current.addLayer({
        id: 'ownedDevice',
        type: 'circle',
        source: 'device',
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            5,
            ['match', ['get', 'hover'], 'true', 65, 30],
            12,
            ['*', 5, ['zoom']],
          ],
          'circle-opacity': 0,
          'circle-stroke-width': [
            'match',
            ['get', 'isUserOwner'],
            1,
            2,
            0,
            0,
            0,
          ],
          'circle-stroke-color': '#e5dfdf',
        },
      });

      map.current.on('mouseenter', 'device', function (e) {
        if (e.features[0].properties.isUserOwner) {
          map.current.getCanvas().style.cursor = 'pointer';
        }

        map.current.setFeatureState(
          {
            source: 'device',
            id: e.features[0].properties.id,
          },
          {
            hover: true,
          }
        );
        const index = deviceData.features
          .map((s) => s.properties.id)
          .indexOf(e.features[0].properties.id);

        onSensorHover(index);
      });

      map.current.on('mouseleave', 'device', function () {
        map.current.getCanvas().style.cursor = '';

        onSensorHover(undefined);
      });

      map.current.on('click', 'device', function (e) {
        const clickedSensor = device.filter(
          (sensor) => sensor.id === e.features[0].properties.id
        )[0];

        if (clickedSensor.isUserOwner) {
          setDisplayedSensor(
            device.filter(
              (sensor) => sensor.id === e.features[0].properties.id
            )[0]
          );
          setShouldShowSideMenu(true);
        }
      });
    });
    //}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device]);

  const zoomIn = () => {
    map.current.flyTo({ zoom: map.current.getZoom() + 1 });
  };
  const zoomOut = () => {
    map.current.flyTo({ zoom: map.current.getZoom() - 1 });
  };

  return (
    <>
      <div className="device-map__header">
        <h4 className="device-map__title" tabIndex={0}>
          Sensor locations
        </h4>
        <div className="device-map__controls">
          <span
            tabIndex={0}
            onClick={zoomIn}
            onKeyDown={(e) => Utils.keyboardOnlySubmit(e, zoomIn)}
          >
            <ZoomIn16 />
          </span>
          <span
            tabIndex={0}
            onClick={zoomOut}
            onKeyDown={(e) => Utils.keyboardOnlySubmit(e, zoomOut)}
          >
            <ZoomOut16 />
          </span>
        </div>
      </div>
      <div ref={(el) => (mapWrapper = el)} className="map-wrapper" />
    </>
  );
};

export default memo(DeviceMap);
