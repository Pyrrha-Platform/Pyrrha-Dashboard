import React from "react";
import { Link } from "react-router-dom";
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
  SkipToContent,
} from "carbon-components-react/lib/components/UIShell";
import UserAvatar20 from "@carbon/icons-react/lib/user--avatar/20";
import Translate20 from "@carbon/icons-react/lib/translate/20";

function PrometeoHeader(props) {
  const history = props.history;
  const active = props.active;
  const language = props.language;
  const page = props.page;
  const setActive = props.setActive;
  const setLanguage = props.setLanguage;
  const setPage = props.setPage;
  return (
    <Header aria-label="Prometeo">
      <SkipToContent />
      <HeaderName
        element={Link}
        to="/"
        prefix="Prometeo"
        onClick={() => {
          setPage("Dashboard");
        }}
      >
        Platform
      </HeaderName>
      <HeaderNavigation aria-label="Prometeo Dashboard">
        <HeaderMenuItem
          element={Link}
          to="/"
          isCurrentPage={page === "Dashboard"}
          onClick={() => {
            setPage("Dashboard");
          }}
        >
          Dashboard
        </HeaderMenuItem>
        <HeaderMenuItem
          element={Link}
          to="/events"
          isCurrentPage={page === "Events"}
          onClick={() => {
            setPage("Events");
          }}
        >
          Events
        </HeaderMenuItem>
        <HeaderMenuItem
          element={Link}
          to="/devices"
          isCurrentPage={page === "Devices"}
          onClick={() => {
            setPage("Devices");
          }}
        >
          Devices
        </HeaderMenuItem>
        <HeaderMenuItem
          element={Link}
          to="/firefighters"
          isCurrentPage={page === "Firefighters"}
          onClick={() => {
            setPage("Firefighters");
          }}
        >
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
          element={Link}
          to="/profile"
        >
          <UserAvatar20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      <HeaderPanel aria-label="Header Panel" expanded={active}>
        <Switcher aria-label="Switcher Container">
          <SwitcherItem
            aria-label="English"
            isSelected={language === "EN"}
            onClick={() => {
              setLanguage("EN");
              setActive(false);
            }}
          >
            English
          </SwitcherItem>
          <SwitcherItem
            aria-label="Spanish"
            isSelected={language === "ES"}
            onClick={() => {
              setLanguage("ES");
              setActive(false);
            }}
          >
            Spanish
          </SwitcherItem>
          <SwitcherItem
            aria-label="Catalan"
            isSelected={language === "CA"}
            onClick={() => {
              setLanguage("CA");
              setActive(false);
            }}
          >
            Catalan
          </SwitcherItem>
        </Switcher>
      </HeaderPanel>
    </Header>
  );
}

export default PrometeoHeader;
