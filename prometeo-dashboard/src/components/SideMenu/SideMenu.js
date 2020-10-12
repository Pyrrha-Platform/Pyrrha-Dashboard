import React from 'react';
import { Link } from 'react-router-dom';
import {
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
} from 'carbon-components-react/lib/components/UIShell';
import { Settings32 } from '@carbon/icons-react';

function SideMenu() {
  return (
    <SideNav isRail isChildOfHeader={false} aria-label="Side navigation">
      <SideNavItems>
        <SideNavMenu renderIcon={Settings32} title="Settings" large>
          <SideNavMenuItem element={Link} to="/language">Language</SideNavMenuItem>
          <SideNavMenuItem element={Link} to="/profile">Profile</SideNavMenuItem>
        </SideNavMenu>
      </SideNavItems>
    </SideNav>
  );
}

export default SideMenu;
