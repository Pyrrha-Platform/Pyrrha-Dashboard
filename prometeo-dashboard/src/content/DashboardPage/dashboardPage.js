import React from 'react';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import DashboardGrid from './dashboardGrid';

function DashboardPage() {
  return (
    <div>
      <Header />
      {/* <SideMenu /> */}
      <DashboardGrid />
    </div>
  );
}

export default DashboardPage;
