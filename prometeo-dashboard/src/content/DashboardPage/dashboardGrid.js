import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
    Link, 
} from 'react-router-dom';
import {
    ContentSwitcher,
    Switch
  } from  'carbon-components-react';
import "@carbon/charts/styles.css";
import FirefighterChart from '../../components/FirefighterChart/FirefighterChart';
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
      <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
        <div className="bx--row dashboard-page__r2">
            <div className="bx--col-md-8">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-8">
                            <h1 className="dashboard-head">Dashboard</h1>
                            {/*
                            <ContentSwitcher onChange={() => {}}>
                                <Switch name="Now" text="Now" />
                                <Switch name="10min" text="10 min avg" />
                                <Switch name="30min" text="30 min avg" />
                                <Switch name="1hr" text="1 hr avg" />
                                <Switch name="4hr" text="4 hr avg" />
                                <Switch name="6hr" text="6 hr avg" />
                            </ContentSwitcher>
                            */}
                        </div>
                    </div>
                </div>
            </div>
        </div>                        

        <div className="bx--row">
            <div className="bx--col label-firefighter">GRAF7<br />10 min avg</div>
            <div className="bx--col label-firefighter"></div>
            <div className="bx--col label-firefighter"></div>
            <div className="bx--col label-firefighter"></div>
        </div>
        <div className="bx--row">
            <div className="bx--col">
            <div><FirefighterGauge firefighterId={1} type={'CO'} initialNumber={30} unit={'ppm'} /></div>
            <div className="label-legend">CO</div>
            </div>
            <div className="bx--col">
            <div><FirefighterGauge firefighterId={1} type={'NO2'} initialNumber={20} unit={'ppm'} /></div>
            <div className="label-legend">NO<sub>2</sub></div>
            </div>
            <div className="bx--col">
            <div><FirefighterGauge firefighterId={1} type={'Tmp'} initialNumber={38} unit={'°C'} /></div>
            <div className="label-legend">Temperature</div>
            </div>
            <div className="bx--col">
            <div><FirefighterGauge firefighterId={1} type={'Hum'} initialNumber={72} unit={'%'} /></div>
            <div className="label-legend">Humidity</div>
            </div>
        </div>

        <div className="bx--row dashboard-page__r2">
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">GRAF 4</p>
                            <p>40ppm</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>20ppm</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>28&#8451;</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>72%</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">GRAF 7</p>
                            <p>40ppm</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>20ppm</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>28&#8451;</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>72%</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bx--row dashboard-page__r3">
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">GRAF 5</p>
                            <p>40ppm</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>20ppm</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>28&#8451;</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>72%</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2">
                            <Link className="App-link" to="/reports?code=GRAF1&amp;reading=co">
                                <p className="dashboard-header">GRAF 1</p>
                                <p>40ppm</p>
 
                            </Link>
                        </div>
                        <div className="bx--col-md-2">
                            <Link className="App-link" to="/reports?code=GRAF1&amp;reading=no2">
                                <p className="dashboard-header">&nbsp;</p>
                                <p>20ppm</p>

                            </Link>
                        </div>
                        <div className="bx--col-md-2">
                            <Link className="App-link" to="/reports?code=GRAF1&amp;reading=tmp">
                                <p className="dashboard-header">&nbsp;</p>
                                <p>28&#8451;</p>

                            </Link>
                        </div>
                        <div className="bx--col-md-2">
                            <Link className="App-link" to="/reports?code=GRAF1&amp;reading=hum">
                                <p className="dashboard-header">&nbsp;</p>
                                <p>72%</p>

                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bx--row dashboard-page__r4">
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">GRAF 3</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">GRAF 6</p>
                            <p>40ppm</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>20ppm</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>28&#8451;</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>72%</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bx--row dashboard-page__r5">
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">GRAF 2</p>
                            <p>40ppm</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>20ppm</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>28&#8451;</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>72%</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">GRAF 8</p>
                            <p>40ppm</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>20ppm</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>28&#8451;</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>72%</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bx--row dashboard-page__r5">
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">GRAF 2</p>
                            <p>40ppm</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>20ppm</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>28&#8451;</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>72%</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">GRAF 8</p>
                            <p>40ppm</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>20ppm</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>28&#8451;</p>

                        </div>
                        <div className="bx--col-md-2">
                            <p className="dashboard-header">&nbsp;</p>
                            <p>72%</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="bx--row dashboard-page__r2">
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2" id="graf7-co-chart">
                            <FirefighterChart firefighterId={1} type={'CO'} initialNumber={30} unit={'ppm'} />
                            {/* <FirefighterChart firefighterId={1} type={'NO2'} initialNumber={30} unit={'ppm'} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    );
    
}
  
export default DashboardGrid;
