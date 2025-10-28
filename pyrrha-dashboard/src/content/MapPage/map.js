import React, { useContext } from 'react';
import '@carbon/charts/styles.css';
import { Tile } from 'carbon-components-react';
import DeviceMap from '../../components/DeviceMap';
import useMap from '../../hooks/useMap';
import AppContext from '../../context/app';

const Map = () => {
  const [
    // loading,
    // setLoading,
    map,
    // setMap,
    normal,
    // setNormal,
    warning,
    // setWarning,
    danger,
    // setDanger,
  ] = useMap();
  const { t } = useContext(AppContext);

  return (
    <div className="cds--grid cds--grid--full-width map-content">
      <div className="cds--row">
        <div className="cds--col-md-16">
          <h1 className="map-page__heading">{t('content.map.heading')}</h1>
        </div>
      </div>

      <div className="cds--row">
        <div className="cds--col-md-16">
          <h2 className="map-page__subheading">
            {t('content.map.subheading')}
          </h2>
        </div>
      </div>

      <div className="cds--row">
        <div className="cds--col cds--no-gutter">
          <div className="cds--grid cds--grid--full-width">
            <div className="cds--row">
              <div className="cds--col">
                <Tile>
                  <div className="cds--grid cds--grid--full-width">
                    <div className="cds--row">
                      <div className="cds--col-md-1 map-page__tile_number">
                        <span className="map-page__danger">{danger}</span>
                      </div>
                      <div className="cds--col-md-7">
                        <div className="map-page__tile_heading">
                          {t('content.map.tileHeadingDanger')}
                        </div>
                        <div className="map-page__tile_subheading">
                          {t('content.map.tileSubheadingDanger')}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tile>
              </div>
              <div className="cds--col">
                <Tile>
                  <div className="cds--grid cds--grid--full-width">
                    <div className="cds--row">
                      <div className="cds--col-md-1 map-page__tile_number">
                        <span className="map-page__warning">{warning}</span>
                      </div>
                      <div className="cds--col-md-7">
                        <div className="map-page__tile_heading">
                          {t('content.map.tileHeadingWarning')}
                        </div>
                        <div className="map-page__tile_subheading">
                          {t('content.map.tileSubheadingWarning')}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tile>
              </div>
              <div className="cds--col">
                <Tile>
                  <div className="cds--grid cds--grid--full-width">
                    <div className="cds--row">
                      <div className="cds--col-md-1 map-page__tile_number">
                        <span className="map-page__normal">{normal}</span>
                      </div>
                      <div className="cds--col-md-7">
                        <div className="map-page__tile_heading">
                          {t('content.map.tileHeadingNormal')}
                        </div>
                        <div className="map-page__tile_subheading">
                          {t('content.map.tileSubheadingNormal')}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tile>
              </div>
            </div>
          </div>
        </div>
      </div>

      {map !== undefined && map.length !== 0 && map.map !== undefined && (
        <div className="cds--row">
          {map.map(
            ({
              device_id,
              timestamp_mins,
              device_timestamp,
              temperature,
              humidity,
              carbon_monoxide,
              nitrogen_dioxide,
              increment,
              longitude,
              latitude,
            }) => (
              <DeviceMap
                device_id={device_id}
                timestamp_mins={timestamp_mins}
                device_timestamp={device_timestamp}
                temperature={temperature}
                humidity={humidity}
                carbon_monoxide={carbon_monoxide}
                nitrogen_dioxide={nitrogen_dioxide}
                longitude={longitude}
                latitude={latitude}
                increment={'now'}
              />
            ),
          )}
        </div>
      )}

      {/*console.log('Map', map)*/}

      {(map == undefined || map.length == 0 || map.map == undefined) && (
        <div className="cds--row">
          <div className="cds--grid cds--grid--full-width cds--col-lg-16 cds--col-md-4 cds--col-sm-2">
            <div className="cds--grid cds--grid--full-width map-content">
              <div className={'cds--row map-tile background-'}>
                <div className="cds--grid cds--grid--full-width label-firefighter">
                  {t('content.map.noDevices')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
