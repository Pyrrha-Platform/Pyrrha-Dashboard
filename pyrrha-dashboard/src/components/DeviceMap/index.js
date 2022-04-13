import React, { memo, useEffect, useRef } from 'react';
import { ZoomIn16, ZoomOut16 } from '@carbon/icons-react';
import mapboxgl from '!mapbox-gl';
import Utils from '../../utils/Utils';

const DEFAULT_LATITUDE = 40.4;
const DEFAULT_LONGITUDE = -3.5;
const DEFAULT_ZOOM = 3.3;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const transformToGeoJSON = (devices) => {
  return devices
    .filter((s) => s.latitude && s.longitude)
    .map((device) => {
      return {
        type: 'Feature',
        properties: {
          id: device.id,
          highlighted: false,
          pos: [parseFloat(device.longitude), parseFloat(device.latitude)],
          isUserOwner: device.isUserOwner ? 1 : 0,
          statusColor: device.statusColor,
          hover: false,
        },
        geometry: {
          type: 'Point',
          coordinates: [
            parseFloat(device.longitude),
            parseFloat(device.latitude),
          ],
        },
      };
    });
};

const DeviceMap = ({
  devices,
  setDisplayedDevice,
  setShouldShowSideMenu,
  onDeviceHover,
  currentHoveredDevice,
}) => {
  let mapWrapper = useRef(null);
  let map = useRef(null);

  // console.log('devices', devices);

  const devicesData = {
    type: 'FeatureCollection',
    features: transformToGeoJSON(devices),
  };

  useEffect(() => {
    if (!map.current || currentHoveredDevice === undefined) return;

    const updateDeviceHover = (index, hover) => {
      let newDevicesFeatures = [...devicesData.features];

      newDevicesFeatures[index].properties.hover = hover;

      map.current
        .getSource('devices')
        .setData({ ...devicesData, features: newDevicesFeatures });
    };

    updateDeviceHover(currentHoveredDevice, true);

    return () => updateDeviceHover(currentHoveredDevice, false);
  }, [currentHoveredDevice]);

  useEffect(() => {
    console.log('Drawing map');
    if (devices.length > 0) {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapWrapper,
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [DEFAULT_LONGITUDE, DEFAULT_LATITUDE],
        zoom: DEFAULT_ZOOM,
        attributionControl: false,
        preserveDrawingBuffer: true,
      }).addControl(
        new mapboxgl.AttributionControl({
          compact: true,
        })
      );

      console.log('Created map. Decorating now.');

      map.current.once('load', () => {
        map.current.resize();

        map.current.addSource('devices', {
          type: 'geojson',
          data: devicesData,
        });

        map.current.addLayer({
          id: 'devices',
          type: 'circle',
          source: 'devices',
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
              '#24a148',
              '#3DC04E',
              '#f1c21b',
              '#c9bc0d',
              '#c9bc0d',
            ],
          },
        });

        /*
        map.current.addLayer({
          id: 'ownedDevices',
          type: 'circle',
          source: 'devices',
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
        */

        map.current.on('mouseenter', 'devices', function (e) {
          if (e.features[0].properties.isUserOwner) {
            map.current.getCanvas().style.cursor = 'pointer';
          }

          map.current.setFeatureState(
            {
              source: 'devices',
              id: e.features[0].properties.id,
            },
            {
              hover: true,
            }
          );
          const index = devicesData.features
            .map((s) => s.properties.id)
            .indexOf(e.features[0].properties.id);

          onDeviceHover(index);
        });

        map.current.on('mouseleave', 'devices', function () {
          map.current.getCanvas().style.cursor = '';

          onDeviceHover(undefined);
        });

        map.current.on('click', 'devices', function (e) {
          const clickedDevice = devices.filter(
            (device) => device.id === e.features[0].properties.id
          )[0];

          if (clickedDevice.isUserOwner) {
            setDisplayedDevice(
              devices.filter(
                (device) => device.id === e.features[0].properties.id
              )[0]
            );
            setShouldShowSideMenu(true);
          }
        });

        console.log('Done with map.');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devices]);

  const zoomIn = () => {
    map.current.flyTo({ zoom: map.current.getZoom() + 1 });
  };
  const zoomOut = () => {
    map.current.flyTo({ zoom: map.current.getZoom() - 1 });
  };

  return (
    <>
      <div className="devices-map__header" tabIndex={0}>
        {/*
        <h4 className="devices-map__title" tabIndex={0}>
          Device locations
        </h4>
        */}
        <div className="devices-map__controls">
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
      <div
        ref={(el) => (mapWrapper = el)}
        className="map-wrapper"
        style={{ height: '300px' }}
      />
    </>
  );
};

export default memo(DeviceMap);
