import React from "react";
import { Link } from 'react-router-dom';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
  Switcher,
  SwitcherItem,
  SkipToContent,
} from "carbon-components-react/lib/components/UIShell";
import UserAvatar20 from "@carbon/icons-react/lib/user--avatar/20";
import Search20 from "@carbon/icons-react/lib/search/20";
import Translate20 from "@carbon/icons-react/lib/translate/20";

  function PrometeoHeader() {

    var active = false;
  
    const toggleActive = function() {
      console.log('Toggling state from ' + active + ' to ' + !active);
      active = !active;
    }

    return (
    <Header aria-label="Prometeo">
      <SkipToContent />
      <HeaderName element={Link} to="/" prefix="Prometeo">
        Platform
      </HeaderName>
      <HeaderNavigation aria-label="Prometeo Dashboard">
        <HeaderMenuItem isCurrentPage href="/">
          Dashboard
        </HeaderMenuItem>
        <HeaderMenu aria-label="Administration" menuLinkName="Administration">
          <HeaderMenuItem element={Link} to="/events">
            Events
          </HeaderMenuItem>
          <HeaderMenuItem element={Link} to="/devices">
            Devices
          </HeaderMenuItem>
          <HeaderMenuItem element={Link} to="/firefighters">
            Firefighters
          </HeaderMenuItem>
          <HeaderMenuItem element={Link} to="/reports">
            Reports
          </HeaderMenuItem>
        </HeaderMenu>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Search" onClick={() => { console.log('search click') }}>
          <Search20 element={Link} to="/" />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Translate" onClick={toggleActive} isActive={active}>
          <Translate20 element={Link} to="/" />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="User Avatar">
          <UserAvatar20 element={Link} to="/profile" />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      <HeaderPanel aria-label="Header Panel" expanded={active}>
        <Switcher aria-label="Switcher Container">
          <SwitcherItem isSelected aria-label="English" href="#">
            English
          </SwitcherItem>
          <SwitcherItem href="#" aria-label="Spanish">
            Spanish
          </SwitcherItem>
        </Switcher>
      </HeaderPanel>
    </Header>
  );
}

export default PrometeoHeader;
