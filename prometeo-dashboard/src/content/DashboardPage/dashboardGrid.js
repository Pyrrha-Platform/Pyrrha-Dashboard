import React, { useRef, useEffect, useState, useCallback } from 'react';
import "@carbon/charts/styles.css";
import FirefighterGauge from '../../components/FirefighterGauge/FirefighterGauge';

// Utility to access the backend API
const client = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

// Table and data
const DashboardGrid = ( { deviceId } ) => {

    // Initially loaded data from database
    const [rawData, setRawData] = useState([]);
    const [transformedData, setTransformedData] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
      loadDashboard();
    }, [fetched]);
  
    const loadDashboard = useCallback(async () => {
      try {
        const data = await client(`/api/v1/dashboard-now`);
        console.log(data);
        setRawData(data.firefighters);
        setTransformedData(transformData(data.firefighters));
      } catch (e) {
        console.log(e);
      }
    });

    // WebSocket updates (readings variable changes)
    const [readings, setReadings] = useState([]);

    useEffect(() => {
        changeReadings();
        console.log(readings);
    }, [readings]);

    const changeReadings = useCallback(async () => {
        console.log('In changeReadings');
        // For each reading, update the correct gauge
    });

    const transformData = ( { data } ) => {
        // Need to take the raw array of firefighter info and put it into the format 
        // that the gauges expect... an data array an options object. There are 4
        // gauges per firefighter. 
        return data;
    }
 
    return (
      <div className="bx--grid bx--grid--full-width dashboard-content">
        <div className="bx--row">
            <div className="bx--col-md-16">
                <h1 className="dashboard-page__heading">Dashboard</h1>
            </div>
        </div>   

        <div className="bx--row">
            <div className="bx--col-md-16">
                <h1 className="dashboard-page__subheading">You are now viewing the real-time data and 10 minute average exposure thresholds.</h1>
            </div>
        </div> 

        <div class="bx--row">
            <div class="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
                <div className="bx--grid bx--grid--full-width dashboard-content">
                    <div className="bx--row dashboard-tile">
                        <div className="bx--col-md-8 label-firefighter">
                            GRAF7<br />10 min avg
                        </div>
                    </div>
                    <div className="bx--row dashboard-tile">
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={7} type={'CO'} initialNumber={30} unit={'ppm'} /></div>
                            <div className="label-legend">CO</div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={7} type={'NO2'} initialNumber={20} unit={'ppm'} /></div>
                            <div className="label-legend">NO<sub>2</sub></div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={7} type={'Tmp'} initialNumber={38} unit={'°C'} /></div>
                            <div className="label-legend">Temperature</div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={7} type={'Hum'} initialNumber={72} unit={'%'} /></div>
                            <div className="label-legend">Humidity</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
                <div className="bx--grid bx--grid--full-width dashboard-content">
                    <div className="bx--row dashboard-tile">
                        <div className="bx--col-md-8 label-firefighter">
                        GRAF8<br />10 min avg
                        </div>
                    </div>
                    <div className="bx--row dashboard-tile">
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={8} type={'CO'} initialNumber={30} unit={'ppm'} /></div>
                            <div className="label-legend">CO</div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={8} type={'NO2'} initialNumber={20} unit={'ppm'} /></div>
                            <div className="label-legend">NO<sub>2</sub></div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={8} type={'Tmp'} initialNumber={38} unit={'°C'} /></div>
                            <div className="label-legend">Temperature</div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={8} type={'Hum'} initialNumber={72} unit={'%'} /></div>
                            <div className="label-legend">Humidity</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>           

        <div class="bx--row">
            <div class="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
                <div className="bx--grid bx--grid--full-width dashboard-content">
                    <div className="bx--row dashboard-tile">
                        <div className="bx--col-md-8 label-firefighter">
                            GRAF9<br />10 min avg
                        </div>
                    </div>
                    <div className="bx--row dashboard-tile">
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={9} type={'CO'} initialNumber={30} unit={'ppm'} /></div>
                            <div className="label-legend">CO</div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={9} type={'NO2'} initialNumber={20} unit={'ppm'} /></div>
                            <div className="label-legend">NO<sub>2</sub></div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={9} type={'Tmp'} initialNumber={38} unit={'°C'} /></div>
                            <div className="label-legend">Temperature</div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={9} type={'Hum'} initialNumber={72} unit={'%'} /></div>
                            <div className="label-legend">Humidity</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
                <div className="bx--grid bx--grid--full-width dashboard-content">
                    <div className="bx--row dashboard-tile">
                        <div className="bx--col-md-8 label-firefighter">
                        GRAF10<br />10 min avg
                        </div>
                    </div>
                    <div className="bx--row dashboard-tile">
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={10} type={'CO'} initialNumber={30} unit={'ppm'} /></div>
                            <div className="label-legend">CO</div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={10} type={'NO2'} initialNumber={20} unit={'ppm'} /></div>
                            <div className="label-legend">NO<sub>2</sub></div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={10} type={'Tmp'} initialNumber={38} unit={'°C'} /></div>
                            <div className="label-legend">Temperature</div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={10} type={'Hum'} initialNumber={72} unit={'%'} /></div>
                            <div className="label-legend">Humidity</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>     

        <div class="bx--row">
            <div class="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
                <div className="bx--grid bx--grid--full-width dashboard-content">
                    <div className="bx--row dashboard-tile">
                        <div className="bx--col-md-8 label-firefighter">
                            GRAF11<br />11 min avg
                        </div>
                    </div>
                    <div className="bx--row dashboard-tile">
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={11} type={'CO'} initialNumber={30} unit={'ppm'} /></div>
                            <div className="label-legend">CO</div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={11} type={'NO2'} initialNumber={20} unit={'ppm'} /></div>
                            <div className="label-legend">NO<sub>2</sub></div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={11} type={'Tmp'} initialNumber={38} unit={'°C'} /></div>
                            <div className="label-legend">Temperature</div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={11} type={'Hum'} initialNumber={72} unit={'%'} /></div>
                            <div className="label-legend">Humidity</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
                <div className="bx--grid bx--grid--full-width dashboard-content">
                    <div className="bx--row dashboard-tile">
                        <div className="bx--col-md-8 label-firefighter">
                        GRAF12<br />10 min avg
                        </div>
                    </div>
                    <div className="bx--row dashboard-tile">
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={12} type={'CO'} initialNumber={30} unit={'ppm'} /></div>
                            <div className="label-legend">CO</div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={12} type={'NO2'} initialNumber={20} unit={'ppm'} /></div>
                            <div className="label-legend">NO<sub>2</sub></div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={12} type={'Tmp'} initialNumber={38} unit={'°C'} /></div>
                            <div className="label-legend">Temperature</div>
                        </div>
                        <div className="bx--col bx--col-md-2">
                            <div><FirefighterGauge firefighterId={12} type={'Hum'} initialNumber={72} unit={'%'} /></div>
                            <div className="label-legend">Humidity</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  

        {/* 
        <div className="bx--row dashboard-tile">
            <div className="bx--col-md-4">
                <div className="bx--row dashboard-tile2">
                    <FirefighterChart firefighterId={1} type={'CO'} initialNumber={30} unit={'ppm'} />
                    <FirefighterChart firefighterId={1} type={'NO2'} initialNumber={30} unit={'ppm'} /> 
                </div>
            </div>
        </div>
        */}

      </div>
    );
    
}
  
export default DashboardGrid;
