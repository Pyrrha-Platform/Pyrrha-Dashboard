import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
  SwitcherItemLink,
  SkipToContent,
} from "carbon-components-react/lib/components/UIShell";
import UserAvatar20 from "@carbon/icons-react/lib/user--avatar/20";
import Search20 from "@carbon/icons-react/lib/search/20";
import Translate20 from "@carbon/icons-react/lib/translate/20";

function PrometeoHeader() {

    const history = useHistory()
    const [active, setActive] = useState(false);
    const [language, setLanguage] = useState('EN');
  
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
          <HeaderMenuItem element={Link} to="/events">
            Events
          </HeaderMenuItem>
          <HeaderMenuItem element={Link} to="/devices">
            Devices
          </HeaderMenuItem>
          <HeaderMenuItem element={Link} to="/firefighters">
            Firefighters
          </HeaderMenuItem>
          {/* 
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
          */}
        </HeaderNavigation>
        <HeaderGlobalBar>
          {/* 
          <HeaderGlobalAction aria-label="Search" onClick={() => { console.log('search click') }}>
            <Search20 element={Link} to="/" />
          </HeaderGlobalAction>
          */}
          <HeaderGlobalAction aria-label="Translate" onClick={ () => setActive(!active) } isActive={active}>
            <Translate20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="User Avatar" onClick={ () => history.push({ pathname: '/profile' }) }>
            <UserAvatar20 />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
        <HeaderPanel aria-label="Header Panel" expanded={active}>
          <Switcher aria-label="Switcher Container">
            <SwitcherItem aria-label="English" className="Switcher-module--link">
              <SwitcherItemLink onClick={() => setLanguage('EN')} isSelected={ (language === 'EN') } >
                English
              </SwitcherItemLink>
            </SwitcherItem>
            <SwitcherItem aria-label="Spanish">
              <SwitcherItemLink onClick={() => setLanguage('ES')} isSelected={ (language === 'ES') }>
                Spanish
              </SwitcherItemLink>
            </SwitcherItem>
            <SwitcherItem aria-label="Catalan">
              <SwitcherItemLink onClick={() => setLanguage('CA')} isSelected={ (language === 'CA') }>
                Catalan
              </SwitcherItemLink>
            </SwitcherItem>
          </Switcher>
        </HeaderPanel>
      </Header>
    );
}

export default PrometeoHeader;
