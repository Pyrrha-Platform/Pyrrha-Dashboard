import React from 'react';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import ProfileGrid from './profileGrid';

function ProfilePage() {
  return (
    <div>
      <Header />
      {/* <SideMenu /> */}
      <ProfileGrid />
    </div>
  );
}

export default ProfilePage;
