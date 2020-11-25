import React from "react";
import FirefighterGauge from "../FirefighterGauge";

function FirefighterDetailsGaugeSet({
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
  return (
    <>
      <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
        <div className="bx--grid bx--grid--full-width dashboard-content">
          <div className="bx--row dashboard-tile">
            <div className="bx--col-md-8 label-firefighter">
              {firefighterCode} - {firefighterFirst} {firefighterLast}
              <br />
              Now
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
                  limit={0.8}
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
                  unit={"ppm"}
                  limit={0.5}
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
                  unit={"°C"}
                />
              </div>
              <div className="label-legend">Temperature</div>
            </div>
            <div className="bx--col bx--col-md-2">
              <div>
                <FirefighterGauge
                  firefighterId={firefighterId}
                  type={"Hum"}
                  value={humidity}
                  unit={"%"}
                />
              </div>
              <div className="label-legend">Humidity</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
        <div className="bx--grid bx--grid--full-width dashboard-content">
          <div className="bx--row dashboard-tile">
            <div className="bx--col-md-8 label-firefighter">
              {firefighterCode} - {firefighterFirst} {firefighterLast}
              <br />
              10 min avg
            </div>
          </div>
          <div className="bx--row dashboard-tile">
            <div className="bx--col bx--col-md-2">
              <div>
                <FirefighterGauge
                  firefighterId={firefighterId}
                  type={"CO"}
                  value={carbonMonoxideTwa10min}
                  unit={"ppm"}
                  limit={carbonMonoxideGauge10min}
                />
              </div>
              <div className="label-legend">CO</div>
            </div>
            <div className="bx--col bx--col-md-2">
              <div>
                <FirefighterGauge
                  firefighterId={firefighterId}
                  type={"NO2"}
                  value={nitrogenDioxideTwa10min}
                  unit={"ppm"}
                  limit={nitrogenDioxideGauge10min}
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
                  value={"-"}
                  unit={"°C"}
                />
              </div>
              <div className="label-legend">Temperature</div>
            </div>
            <div className="bx--col bx--col-md-2">
              <div>
                <FirefighterGauge
                  firefighterId={firefighterId}
                  type={"Hum"}
                  value={"-"}
                  unit={"%"}
                />
              </div>
              <div className="label-legend">Humidity</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
        <div className="bx--grid bx--grid--full-width dashboard-content">
          <div className="bx--row dashboard-tile">
            <div className="bx--col-md-8 label-firefighter">
              {firefighterCode} - {firefighterFirst} {firefighterLast}
              <br />
              30 min avg
            </div>
          </div>
          <div className="bx--row dashboard-tile">
            <div className="bx--col bx--col-md-2">
              <div>
                <FirefighterGauge
                  firefighterId={firefighterId}
                  type={"CO"}
                  value={carbonMonoxideTwa30min}
                  unit={"ppm"}
                  limit={carbonMonoxideGauge30min}
                />
              </div>
              <div className="label-legend">CO</div>
            </div>
            <div className="bx--col bx--col-md-2">
              <div>
                <FirefighterGauge
                  firefighterId={firefighterId}
                  type={"NO2"}
                  value={nitrogenDioxideTwa30min}
                  unit={"ppm"}
                  limit={nitrogenDioxideGauge30min}
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
                  value={"-"}
                  unit={"°C"}
                />
              </div>
              <div className="label-legend">Temperature</div>
            </div>
            <div className="bx--col bx--col-md-2">
              <div>
                <FirefighterGauge
                  firefighterId={firefighterId}
                  type={"Hum"}
                  value={"-"}
                  unit={"%"}
                />
              </div>
              <div className="label-legend">Humidity</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
        <div className="bx--grid bx--grid--full-width dashboard-content">
          <div className="bx--row dashboard-tile">
            <div className="bx--col-md-8 label-firefighter">
              {firefighterCode} - {firefighterFirst} {firefighterLast}
              <br />1 hr avg
            </div>
          </div>
          <div className="bx--row dashboard-tile">
            <div className="bx--col bx--col-md-2">
              <div>
                <FirefighterGauge
                  firefighterId={firefighterId}
                  type={"CO"}
                  value={carbonMonoxideTwa60min}
                  unit={"ppm"}
                  limit={carbonMonoxideGauge60min}
                />
              </div>
              <div className="label-legend">CO</div>
            </div>
            <div className="bx--col bx--col-md-2">
              <div>
                <FirefighterGauge
                  firefighterId={firefighterId}
                  type={"NO2"}
                  value={nitrogenDioxideTwa60min}
                  unit={"ppm"}
                  limit={nitrogenDioxideGauge60min}
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
                  value={"-"}
                  unit={"°C"}
                />
              </div>
              <div className="label-legend">Temperature</div>
            </div>
            <div className="bx--col bx--col-md-2">
              <div>
                <FirefighterGauge
                  firefighterId={firefighterId}
                  type={"Hum"}
                  value={"-"}
                  unit={"%"}
                />
              </div>
              <div className="label-legend">Humidity</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
        <div className="bx--grid bx--grid--full-width dashboard-content">
          <div className="bx--row dashboard-tile">
            <div className="bx--col-md-8 label-firefighter">
              {firefighterCode} - {firefighterFirst} {firefighterLast}
              <br />4 hr avg
            </div>
          </div>
          <div className="bx--row dashboard-tile">
            <div className="bx--col bx--col-md-2">
              <div>
                <FirefighterGauge
                  firefighterId={firefighterId}
                  type={"CO"}
                  value={carbonMonoxideTwa240min}
                  unit={"ppm"}
                  limit={carbonMonoxideGauge240min}
                />
              </div>
              <div className="label-legend">CO</div>
            </div>
            <div className="bx--col bx--col-md-2">
              <div>
                <FirefighterGauge
                  firefighterId={firefighterId}
                  type={"NO2"}
                  value={nitrogenDioxideTwa240min}
                  unit={"ppm"}
                  limit={nitrogenDioxideGauge240min}
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
                  value={"-"}
                  unit={"°C"}
                />
              </div>
              <div className="label-legend">Temperature</div>
            </div>
            <div className="bx--col bx--col-md-2">
              <div>
                <FirefighterGauge
                  firefighterId={firefighterId}
                  type={"Hum"}
                  value={"-"}
                  unit={"%"}
                />
              </div>
              <div className="label-legend">Humidity</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
        <div className="bx--grid bx--grid--full-width dashboard-content">
          <div className="bx--row dashboard-tile">
            <div className="bx--col-md-8 label-firefighter">
              {firefighterCode} - {firefighterFirst} {firefighterLast}
              <br />8 hr avg
            </div>
          </div>
          <div className="bx--row dashboard-tile">
            <div className="bx--col bx--col-md-2">
              <div>
                <FirefighterGauge
                  firefighterId={firefighterId}
                  type={"CO"}
                  value={carbonMonoxideTwa480min}
                  unit={"ppm"}
                  limit={carbonMonoxideGauge480min}
                />
              </div>
              <div className="label-legend">CO</div>
            </div>
            <div className="bx--col bx--col-md-2">
              <div>
                <FirefighterGauge
                  firefighterId={firefighterId}
                  type={"NO2"}
                  value={nitrogenDioxideTwa480min}
                  unit={"ppm"}
                  limit={nitrogenDioxideGauge480min}
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
                  value={"-"}
                  unit={"°C"}
                />
              </div>
              <div className="label-legend">Temperature</div>
            </div>
            <div className="bx--col bx--col-md-2">
              <div>
                <FirefighterGauge
                  firefighterId={firefighterId}
                  type={"Hum"}
                  value={"-"}
                  unit={"%"}
                />
              </div>
              <div className="label-legend">Humidity</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirefighterDetailsGaugeSet;
