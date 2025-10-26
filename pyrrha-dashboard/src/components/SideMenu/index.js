import React from 'react';
import { Link } from 'react-router-dom';
import {
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
} from '@carbon/react';
import { Settings } from '@carbon/icons-react';

function SideMenu() {
  return (
    <SideNav isRail isChildOfHeader={false} aria-label="Side navigation">
      <SideNavItems>
        <SideNavMenu renderIcon={Settings} title="Settings" large>
          <SideNavMenuItem element={Link} to="/language">
            Language
          </SideNavMenuItem>
          <SideNavMenuItem element={Link} to="/profile">
            Profile
          </SideNavMenuItem>
        </SideNavMenu>
      </SideNavItems>
    </SideNav>
  );
}

export default SideMenu;
