import React from "react";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import EventsTable from "./eventsTable";

function EventsPage() {
  return (
    <div>
      <Header />
      {/* <SideMenu /> */}
      <EventsTable />
    </div>
  );
}

export default EventsPage;
