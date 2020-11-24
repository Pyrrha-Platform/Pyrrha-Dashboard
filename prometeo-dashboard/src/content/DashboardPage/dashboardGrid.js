import React, { useEffect, useState, useRef } from "react";
import "@carbon/charts/styles.css";
import FirefighterGaugeSet from "../../components/FirefighterGaugeSet";
import useDashboard from "../../hooks/useDashboard";

const DashboardGrid = () => {
  const [loading, setLoading, dashboard, setDashboard] = useDashboard();

  //
  const [message, setMessage] = useState([""]);

  const socket = useRef(new WebSocket("ws://localhost:8010"));

  useEffect(() => {
    socket.current.onmessage = (msg) => {
      console.log(msg);
      const incomingMessage = msg.data;
      // setDashboard(Some transformed version of the data with a slice for specific firefighter)
      // Can we swap out objects by id in the dashboard array?
      // Use stub version of what's returned as JSON from useDashboard, with slightly different values
      // Use the test client to post that to the web socket from elsewhere
      // setDashboard(msg.data);
      setMessage(message.concat([incomingMessage]));
    };
    socket.current.onclose = (msg) => {
      console.log(msg);
      setMessage(message.concat(["Connection Closed"]));
    };
    return () => {
      console.log("Closing connection");
      socket.current.close();
    };
  }, []);
  //

  return (
    <div className="bx--grid bx--grid--full-width dashboard-content">
      <div className="bx--row">
        <div className="bx--col-md-16">
          <h1 className="dashboard-page__heading">Dashboard</h1>
        </div>
      </div>

      <div className="bx--row">
        <div className="bx--col-md-16">
          <h1 className="dashboard-page__subheading">
            You are now viewing the real-time data and 10 minute average
            exposure thresholds.
          </h1>
          <h1 className="dashboard-page__subheading">{message}</h1>
        </div>
      </div>

      <div class="bx--row">
        {dashboard.map(
          ({
            firefighterId,
            firefighterCode,
            firefighterFirst,
            firefighterLast,
            firefighterEmail,
            deviceId,
            timestampMins,
            temperature,
            humidity,
            carbonMonoxide,
            nitrogenDioxide,
            increment,
          }) => (
            <FirefighterGaugeSet
              firefighterId={firefighterId}
              firefighterCode={firefighterCode}
              firefighterFirst={firefighterFirst}
              firefighterLast={firefighterLast}
              firefighterEmail={firefighterEmail}
              deviceId={deviceId}
              timestampMins={timestampMins}
              temperature={temperature}
              humidity={humidity}
              carbonMonoxide={carbonMonoxide}
              nitrogenDioxide={nitrogenDioxide}
              increment={increment}
            />
          )
        )}
      </div>
    </div>
  );
};

export default DashboardGrid;
