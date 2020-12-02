import React, { useContext } from "react";
import "@carbon/charts/styles.css";
import FirefighterDashboardGaugeSet from "../../components/FirefighterDashboardGaugeSet";
import useDashboard from "../../hooks/useDashboard";
import Context from "../../context/app";

const DashboardGrid = () => {
  const [loading, setLoading, dashboard, setDashboard] = useDashboard();
  const { t } = useContext(Context);

  return (
    <div className="bx--grid bx--grid--full-width dashboard-content">
      <div className="bx--row">
        <div className="bx--col-md-16">
          <h1 className="dashboard-page__heading">
            {t("content.dashboard.heading")}
          </h1>
        </div>
      </div>

      <div className="bx--row">
        <div className="bx--col-md-16">
          <h2 className="dashboard-page__subheading">
            {t("content.dashboard.subheading")}
          </h2>
        </div>
      </div>

      <div className="bx--row">
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
            <FirefighterDashboardGaugeSet
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
              increment={"now"}
            />
          )
        )}
      </div>
    </div>
  );
};

export default DashboardGrid;
