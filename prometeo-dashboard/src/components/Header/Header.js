import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Header,
  HeaderName,
  HeaderNavigation,
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
import Translate20 from "@carbon/icons-react/lib/translate/20";

function PrometeoHeader() {
  const history = useHistory();
  const [active, setActive] = useState(false);
  const [language, setLanguage] = useState("EN");

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
        <HeaderMenuItem element={Link} to="/details">
          Details
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
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="Translate"
          onClick={() => setActive(!active)}
          isActive={active}
        >
          <Translate20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="User Avatar"
          onClick={() => history.push({ pathname: "/profile" })}
        >
          <UserAvatar20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      <HeaderPanel aria-label="Header Panel" expanded={active}>
        <Switcher aria-label="Switcher Container">
          <SwitcherItem
            aria-label="English"
            onClick={() => {
              setLanguage("EN");
              setActive(false);
              console.log(language, active);
            }}
          >
            <SwitcherItemLink isSelected={language === "EN"}>
              English
            </SwitcherItemLink>
          </SwitcherItem>
          <SwitcherItem
            aria-label="Spanish"
            onClick={() => setLanguage("ES")}
            isSelected={language === "ES"}
          >
            <SwitcherItemLink>Spanish</SwitcherItemLink>
          </SwitcherItem>
          <SwitcherItem
            aria-label="Catalan"
            onClick={() => setLanguage("CA")}
            isSelected={language === "CA"}
          >
            <SwitcherItemLink>Catalan</SwitcherItemLink>
          </SwitcherItem>
        </Switcher>
      </HeaderPanel>
    </Header>
  );
}

export default PrometeoHeader;
