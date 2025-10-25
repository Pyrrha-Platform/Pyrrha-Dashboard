import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeviceTable from '../../components/DeviceTable';
import DeviceMap from '../../components/DeviceMap';
import useMap from '../../hooks/useMap';
import AppContext from '../../context/app';

const processDeviceData = (devices) => {
  return devices.slice().map((s) => ({
    ...s,
    statusColor: (() => {
      if (!s.lastCheckin) {
        return 'yellow';
      }

      const secondsAgo =
        Math.floor(Date.now() / 1000) -
        Math.floor(new Date(s.lastCheckin) / 1000);

      if (secondsAgo > 604800) {
        return 'yellow';
      }

      return 'green';
    })(),
  }));
};

const MapPage = (props) => {
  const { t, currentUser, setCurrentUser, addToast } = useContext(AppContext);

  const navigate = useNavigate();

  const active = props.active;
  const language = props.language;
  // const page = props.page;
  const setActive = props.setActive;
  // const setPage = props.setPage;

  //const [loading, setLoading] = useState('Loading...');
  const [loading, setLoading] = useState(false);

  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [devices, setDevices] = useState([]);
  const [currentlyVisibleDevices, setCurrentlyVisibleDevices] = useState([]);

  const [shouldShowSideMenu, setShouldShowSideMenu] = useState(false);
  const [displayedDevice, setDisplayedDevice] = useState({});
  const [currentHoveredDevice, setCurrentHoveredDevice] = useState();

  const [
    // loading,
    // setLoading,
    map,
    // setDashboard,
    normal,
    // setNormal,
    warning,
    // setWarning,
    danger,
    // setDanger,
  ] = useMap();

  useEffect(() => {
    if (map && map.devices) {
      setDevices(processDeviceData(map.devices));
    }
  }, [map]);

  useEffect(() => {
    setCurrentlyVisibleDevices(
      devices.slice((page - 1) * pageSize, page * pageSize),
    );
  }, [page, pageSize, devices]);

  const onPaginationChange = (paginationInfo) => {
    setPage(paginationInfo.page);
    setPageSize(paginationInfo.pageSize);
  };

  const onDeviceHover = (index) => {
    setCurrentHoveredDevice(index);
  };

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

      <div className="device-map__container">
        <DeviceMap
          devices={devices}
          setDisplayedDevice={setDisplayedDevice}
          setShouldShowSideMenu={setShouldShowSideMenu}
          onDeviceHover={onDeviceHover}
          currentHoveredDevice={currentHoveredDevice}
        />
      </div>

      <div className="device-table__container">
        <DeviceTable
          loading={loading}
          navigate={navigate}
          devices={devices}
          setDevices={setDevices}
          page={page}
          pageSize={pageSize}
          onPaginationChange={onPaginationChange}
          currentlyVisibleDevices={currentlyVisibleDevices}
          shouldShowSideMenu={shouldShowSideMenu}
          setShouldShowSideMenu={setShouldShowSideMenu}
          displayedDevice={displayedDevice}
          setDisplayedDevice={setDisplayedDevice}
          onDeviceHover={onDeviceHover}
          currentHoveredDevice={currentHoveredDevice}
        />
      </div>
    </div>
  );
};

export default MapPage;
