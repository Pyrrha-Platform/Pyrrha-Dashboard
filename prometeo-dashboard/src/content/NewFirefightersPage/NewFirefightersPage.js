import React from 'react';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import NewFirefightersTable from './newFirefightersTable';

function NewFirefightersPage() {
  return (
    <div>
      <Header />
      <SideMenu />
      <NewFirefightersTable />
    </div>
  );
}

export default NewFirefightersPage;
