import React, { useContext } from "react";
import { Link } from "react-router-dom";
import FirefighterGauge from "../FirefighterGauge";
import Context from "../../context/app";
import Utils from "../../utils/Utils";

function FirefighterDashboardGaugeSet({
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
}) {
  const { t } = useContext(Context);

  return (
    <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
      <div className="bx--grid bx--grid--full-width dashboard-content">
        <div className="bx--row dashboard-tile">
          <div className="bx--col-md-8 label-firefighter">
            <Link to={"/details/" + firefighterId} className="bx--link label-firefighter">
              {firefighterCode} - {firefighterFirst} {firefighterLast}
              <br />
            </Link>
            {t("content.details.now")}
          </div>
        </div>
        <div className="bx--row dashboard-tile">
          <div className="bx--col bx--col-md-2">
            <div>
              <FirefighterGauge
                firefighterId={firefighterId}
                type={"CO"}
                value={carbonMonoxide}
                increment={increment}
                unit={"ppm"}
                gauge={Utils.getWhole("CO", carbonMonoxide)}
              />
            </div>
            <div className="label-legend">CO</div>
          </div>
          <div className="bx--col bx--col-md-2">
            <div>
              <FirefighterGauge
                firefighterId={firefighterId}
                type={"NO2"}
                value={nitrogenDioxide}
                increment={increment}
                unit={"ppm"}
                gauge={Utils.getWhole("NO2", nitrogenDioxide)}
              />
            </div>
            <div className="label-legend">
              NO<sub>2</sub>
            </div>
          </div>
          <div className="bx--col bx--col-md-2">
            <div>
              <FirefighterGauge
                firefighterId={firefighterId}
                type={"Tmp"}
                value={temperature}
                increment={increment}
                unit={"°C"}
                gauge={Utils.getWhole("Tmp", temperature)}
              />
            </div>
            <div className="label-legend">
              {t("content.common.temperature")}
            </div>
          </div>
          <div className="bx--col bx--col-md-2">
            <div>
              <FirefighterGauge
                firefighterId={firefighterId}
                type={"Hum"}
                value={humidity}
                increment={increment}
                unit={"%"}
                gauge={Utils.getWhole("Hum", humidity)}
              />
            </div>
            <div className="label-legend">{t("content.common.humidity")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirefighterDashboardGaugeSet;
