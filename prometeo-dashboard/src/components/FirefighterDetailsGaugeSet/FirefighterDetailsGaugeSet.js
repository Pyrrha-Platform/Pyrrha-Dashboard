import React, { useContext } from "react";
import FirefighterGauge from "../FirefighterGauge";
import FirefighterChartHolder from "../FirefighterChartHolder";
import Context from "../../context/app";
import Utils from "../../utils/Utils";

function FirefighterDetailsGaugeSet({
  chart,
  setChart,
  type,
  setType,
  increment,
  setIncrement,
  firefighterId,
  firefighterFirst,
  firefighterLast,
  firefighterCode,
  firefighterEmail,
  deviceId,
  temperature,
  humidity,
  carbonMonoxide,
  nitrogenDioxide,
  timestampMins,
  deviceTimestamp,
  carbonMonoxideTwa10min,
  carbonMonoxideTwa30min,
  carbonMonoxideTwa60min,
  carbonMonoxideTwa240min,
  carbonMonoxideTwa480min,
  carbonMonoxideGauge10min,
  carbonMonoxideGauge30min,
  carbonMonoxideGauge60min,
  carbonMonoxideGauge240min,
  carbonMonoxideGauge480min,
  nitrogenDioxideTwa10min,
  nitrogenDioxideTwa30min,
  nitrogenDioxideTwa60min,
  nitrogenDioxideTwa240min,
  nitrogenDioxideTwa480min,
  nitrogenDioxideGauge10min,
  nitrogenDioxideGauge30min,
  nitrogenDioxideGauge60min,
  nitrogenDioxideGauge240min,
  nitrogenDioxideGauge480min,
}) {
  console.log("FirefighterDetailsGaugeSet", increment);

  /*
  console.log("temperature", temperature);
  console.log("humidity", humidity);
  console.log("carbonMonoxide", carbonMonoxide);
  console.log("nitrogenDioxide", nitrogenDioxide);
  console.log("carbonMonoxideTwa10min", carbonMonoxideTwa10min);
  console.log("carbonMonoxideTwa30min", carbonMonoxideTwa30min);
  console.log("carbonMonoxideTwa60min", carbonMonoxideTwa60min);
  console.log("carbonMonoxideTwa240min", carbonMonoxideTwa240min);
  console.log("carbonMonoxideTwa480min", carbonMonoxideTwa480min);
  console.log("carbonMonoxideGauge10min", carbonMonoxideGauge10min);
  console.log("carbonMonoxideGauge30min", carbonMonoxideGauge30min);
  console.log("carbonMonoxideGauge60min", carbonMonoxideGauge60min);
  console.log("carbonMonoxideGauge240min", carbonMonoxideGauge240min);
  console.log("carbonMonoxideGauge480min", carbonMonoxideGauge480min);
  console.log("nitrogenDioxideTwa10min", nitrogenDioxideTwa10min);
  console.log("nitrogenDioxideTwa30min", nitrogenDioxideTwa30min);
  console.log("nitrogenDioxideTwa60min", nitrogenDioxideTwa60min);
  console.log("nitrogenDioxideTwa240min", nitrogenDioxideTwa240min);
  console.log("nitrogenDioxideTwa480min", nitrogenDioxideTwa480min);
  console.log("nitrogenDioxideGauge10min", nitrogenDioxideGauge10min);
  console.log("nitrogenDioxideGauge30min", nitrogenDioxideGauge30min);
  console.log("nitrogenDioxideGauge60min", nitrogenDioxideGauge60min);
  console.log("nitrogenDioxideGauge240min", nitrogenDioxideGauge240min);
  console.log("nitrogenDioxideGauge480min", nitrogenDioxideGauge480min);
  console.log("--------------------------");
  */

  const { t } = useContext(Context);

  return (
    <>
      <div className="bx--row">
        <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
          <div className="bx--grid bx--grid--full-width dashboard-content">
            <div className="bx--row dashboard-tile">
              <div className="bx--col-md-8 label-firefighter">
                {firefighterCode} - {firefighterFirst} {firefighterLast}
                <br />
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
                    unit={"ppm"}
                    increment={"now"}
                    gauge={Utils.getPercentage("CO", carbonMonoxide, "now")}
                  />
                </div>
                <div className="label-legend">
                  <a
                    href="javascript:void(0)"
                    className="bx--link label-legend-link"
                    onClick={() => {
                      console.log("Setting type to CO");
                      setType("CO");
                    }}
                  >
                    CO
                  </a>
                </div>
              </div>
              <div className="bx--col bx--col-md-2">
                <div>
                  <FirefighterGauge
                    firefighterId={firefighterId}
                    type={"NO2"}
                    value={nitrogenDioxide}
                    unit={"ppm"}
                    increment={"now"}
                    gauge={Utils.getPercentage("NO2", nitrogenDioxide, "now")}
                  />
                </div>
                <div className="label-legend">
                  <a
                    href="javascript:void(0)"
                    className="bx--link label-legend-link"
                    onClick={() => {
                      console.log("Setting type to CO");
                      setType("NO2");
                    }}
                  >
                    NO<sub>2</sub>
                  </a>
                </div>
              </div>
              <div className="bx--col bx--col-md-2">
                <div>
                  <FirefighterGauge
                    firefighterId={firefighterId}
                    type={"Tmp"}
                    value={temperature}
                    unit={"°C"}
                    increment={"now"}
                    gauge={Utils.getPercentage("Tmp", temperature, "now")}
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
                    unit={"%"}
                    increment={"now"}
                    gauge={Utils.getPercentage("Hum", humidity, "now")}
                  />
                </div>
                <div className="label-legend">
                  {t("content.common.humidity")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {(increment === "10min" || increment === "all") && (
          <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
            <div className="bx--grid bx--grid--full-width dashboard-content">
              <div className="bx--row dashboard-tile">
                <div className="bx--col-md-8 label-firefighter">
                  {firefighterCode} - {firefighterFirst} {firefighterLast}
                  <br />
                  {t("content.details.10min")}
                </div>
              </div>
              <div className="bx--row dashboard-tile">
                <div className="bx--col bx--col-md-2">
                  <div>
                    <FirefighterGauge
                      firefighterId={firefighterId}
                      type={"CO"}
                      value={carbonMonoxideTwa10min}
                      increment={"10min"}
                      unit={"ppm"}
                      gauge={Utils.getPercentage("CO", carbonMonoxideTwa10min, "10min")}
                    />
                    {/* gauge={carbonMonoxideGauge10min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log(
                          "Setting type to CO and increment to 10min"
                        );
                        setType("CO");
                        setIncrement("10min");
                      }}
                    >
                      CO
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <FirefighterGauge
                      firefighterId={firefighterId}
                      type={"NO2"}
                      value={nitrogenDioxideTwa10min}
                      increment={"10min"}
                      unit={"ppm"}
                      gauge={Utils.getPercentage(
                        "NO2",
                        nitrogenDioxideTwa10min,
                        "10min"
                      )}
                    />
                    {/* gauge={nitrogenDioxideGauge10min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log(
                          "Setting type to CO and increment to 10min"
                        );
                        setType("NO2");
                        setIncrement("10min");
                      }}
                    >
                      NO<sub>2</sub>
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <FirefighterGauge
                      firefighterId={firefighterId}
                      type={"Tmp"}
                      value={"-"}
                      increment={"10min"}
                      unit={"°C"}
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
                      value={"-"}
                      increment={"10min"}
                      unit={"%"}
                    />
                  </div>
                  <div className="label-legend">
                    {t("content.common.humidity")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(increment === "30min" || increment === "all") && (
          <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
            <div className="bx--grid bx--grid--full-width dashboard-content">
              <div className="bx--row dashboard-tile">
                <div className="bx--col-md-8 label-firefighter">
                  {firefighterCode} - {firefighterFirst} {firefighterLast}
                  <br />
                  {t("content.details.30min")}
                </div>
              </div>
              <div className="bx--row dashboard-tile">
                <div className="bx--col bx--col-md-2">
                  <div>
                    <FirefighterGauge
                      firefighterId={firefighterId}
                      type={"CO"}
                      value={carbonMonoxideTwa30min}
                      increment={"30min"}
                      unit={"ppm"}
                      gauge={Utils.getPercentage("CO", carbonMonoxideTwa30min, "30min")}
                    />
                    {/* gauge={carbonMonoxideGauge30min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log(
                          "Setting type to CO and increment to 30min"
                        );
                        setType("CO");
                        setIncrement("30min");
                      }}
                    >
                      CO
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <FirefighterGauge
                      firefighterId={firefighterId}
                      type={"NO2"}
                      value={nitrogenDioxideTwa30min}
                      increment={"30min"}
                      unit={"ppm"}
                      gauge={Utils.getPercentage(
                        "NO2",
                        nitrogenDioxideTwa30min,
                        "30min"
                      )}
                    />
                    {/* gauge={nitrogenDioxideGauge30min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log(
                          "Setting type to CO and increment to 30min"
                        );
                        setType("NO2");
                        setIncrement("30min");
                      }}
                    >
                      NO<sub>2</sub>
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <FirefighterGauge
                      firefighterId={firefighterId}
                      type={"Tmp"}
                      value={"-"}
                      increment={"30min"}
                      unit={"°C"}
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
                      value={"-"}
                      increment={"30min"}
                      unit={"%"}
                    />
                  </div>
                  <div className="label-legend">
                    {t("content.common.humidity")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(increment === "1hr" || increment === "all") && (
          <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
            <div className="bx--grid bx--grid--full-width dashboard-content">
              <div className="bx--row dashboard-tile">
                <div className="bx--col-md-8 label-firefighter">
                  {firefighterCode} - {firefighterFirst} {firefighterLast}
                  <br />
                  {t("content.details.1hr")}
                </div>
              </div>
              <div className="bx--row dashboard-tile">
                <div className="bx--col bx--col-md-2">
                  <div>
                    <FirefighterGauge
                      firefighterId={firefighterId}
                      type={"CO"}
                      value={carbonMonoxideTwa60min}
                      increment={"1hr"}
                      unit={"ppm"}
                      gauge={Utils.getPercentage("CO", carbonMonoxideTwa60min, "1hr")}
                    />
                    {/* gauge={carbonMonoxideGauge60min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log("Setting type to CO and increment to 1hr");
                        setType("CO");
                        setIncrement("1hr");
                      }}
                    >
                      CO
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <FirefighterGauge
                      firefighterId={firefighterId}
                      type={"NO2"}
                      value={nitrogenDioxideTwa60min}
                      increment={"1hr"}
                      unit={"ppm"}
                      gauge={Utils.getPercentage("NO2", nitrogenDioxideTwa60min, "1hr")}
                    />
                    {/* gauge={nitrogenDioxideGauge60min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log("Setting type to CO and increment to 1hr");
                        setType("NO2");
                        setIncrement("1hr");
                      }}
                    >
                      NO<sub>2</sub>
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <FirefighterGauge
                      firefighterId={firefighterId}
                      type={"Tmp"}
                      value={"-"}
                      increment={"1hr"}
                      unit={"°C"}
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
                      value={"-"}
                      increment={"1hr"}
                      unit={"%"}
                    />
                  </div>
                  <div className="label-legend">
                    {t("content.common.humidity")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(increment === "4hr" || increment === "all") && (
          <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
            <div className="bx--grid bx--grid--full-width dashboard-content">
              <div className="bx--row dashboard-tile">
                <div className="bx--col-md-8 label-firefighter">
                  {firefighterCode} - {firefighterFirst} {firefighterLast}
                  <br />
                  {t("content.details.4hr")}
                </div>
              </div>
              <div className="bx--row dashboard-tile">
                <div className="bx--col bx--col-md-2">
                  <div>
                    <FirefighterGauge
                      firefighterId={firefighterId}
                      type={"CO"}
                      value={carbonMonoxideTwa240min}
                      increment={"4hr"}
                      unit={"ppm"}
                      gauge={Utils.getPercentage("CO", carbonMonoxideTwa240min, "4hr")}
                    />
                    {/* gauge={carbonMonoxideGauge240min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log("Setting type to CO and increment to 4hr");
                        setType("CO");
                        setIncrement("4hr");
                      }}
                    >
                      CO
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <FirefighterGauge
                      firefighterId={firefighterId}
                      type={"NO2"}
                      value={nitrogenDioxideTwa240min}
                      increment={"4hr"}
                      unit={"ppm"}
                      gauge={Utils.getPercentage("NO2", nitrogenDioxideTwa240min, "4hr")}
                    />
                    {/* gauge={nitrogenDioxideGauge240min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log("Setting type to CO and increment to 4hr");
                        setType("NO2");
                        setIncrement("4hr");
                      }}
                    >
                      NO<sub>2</sub>
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <FirefighterGauge
                      firefighterId={firefighterId}
                      type={"Tmp"}
                      value={"-"}
                      increment={"4hr"}
                      unit={"°C"}
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
                      value={"-"}
                      increment={"4hr"}
                      unit={"%"}
                    />
                  </div>
                  <div className="label-legend">
                    {t("content.common.humidity")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(increment === "8hr" || increment === "all") && (
          <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
            <div className="bx--grid bx--grid--full-width dashboard-content">
              <div className="bx--row dashboard-tile">
                <div className="bx--col-md-8 label-firefighter">
                  {firefighterCode} - {firefighterFirst} {firefighterLast}
                  <br />
                  {t("content.details.8hr")}
                </div>
              </div>
              <div className="bx--row dashboard-tile">
                <div className="bx--col bx--col-md-2">
                  <div>
                    <FirefighterGauge
                      firefighterId={firefighterId}
                      type={"CO"}
                      value={carbonMonoxideTwa480min}
                      increment={"8hr"}
                      unit={"ppm"}
                      gauge={Utils.getPercentage("CO", carbonMonoxideTwa480min, "8hr")}
                    />
                    {/* gauge={carbonMonoxideGauge480min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log("Setting type to CO and increment to 8hr");
                        setType("CO");
                        setIncrement("8hr");
                      }}
                    >
                      CO
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <FirefighterGauge
                      firefighterId={firefighterId}
                      type={"NO2"}
                      value={nitrogenDioxideTwa480min}
                      increment={"8hr"}
                      unit={"ppm"}
                      gauge={Utils.getPercentage("NO2", nitrogenDioxideTwa480min, "8hr")}
                    />
                    {/* gauge={nitrogenDioxideGauge480min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log("Setting type to CO and increment to 8hr");
                        setType("NO2");
                        setIncrement("8hr");
                      }}
                    >
                      NO<sub>2</sub>
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <FirefighterGauge
                      firefighterId={firefighterId}
                      type={"Tmp"}
                      value={"-"}
                      increment={"8hr"}
                      unit={"°C"}
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
                      value={"-"}
                      increment={"8hr"}
                      unit={"%"}
                    />
                  </div>
                  <div className="label-legend">
                    {t("content.common.humidity")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bx--row">
        <div className="bx--col-lg-16 bx--col-md-8 bx--col-sm-1">
          <FirefighterChartHolder
            firefighterId={firefighterId}
            type={!type ? "CO" : type}
            data={chart}
            unit={"ppm"}
            gauge={""}
            increment={
              increment === "all" ? t("content.details.10min") : increment
            }
          />
        </div>
      </div>
    </>
  );
}

export default FirefighterDetailsGaugeSet;
