import React from 'react';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import DevicesTable from './devicesTable';

function DevicesPage() {
  return (
    <div>
      <Header />
      <SideMenu />
      <DevicesTable />
    </div>
  );
}

export default DevicesPage;
