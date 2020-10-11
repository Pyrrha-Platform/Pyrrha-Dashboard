import React from 'react';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import ReportsGrid from './reportsGrid';

function ReportsPage() {
  return (
    <div>
      <Header />
      <SideMenu />
      <ReportsGrid />
    </div>
  );
}

export default ReportsPage;
