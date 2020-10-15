import React from 'react';
import { 
    GaugeChart
} from '@carbon/charts-react';
import { 
    Link, 
} from 'react-router-dom';
import {
    ContentSwitcher,
    Switch
  } from  'carbon-components-react';
import "@carbon/charts/styles.css";

// Utility to access the backend API
const client = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

const headerData = [

];

// Table and data
const DashboardGrid = ( { deviceId } ) => {

    const [devices, setDashboard] = React.useState([]);
    const [fetched, setFetched] = React.useState(false);
  
    React.useEffect(() => {
      loadDashboard();
    }, [fetched]);
  
    const loadDashboard = React.useCallback(async () => {
      try {
        const data = await client(`/api/v1/dashboard/1`);
        console.log(data);
        setDashboard(data.devices);
      } catch (e) {
        console.log(e);
      }
    });

    const headStyle = {
        fontSize: '200%',
        fontWeight: 'bold',
        marginBottom: '15px',
    }

    const headerStyle = {
        fontSize: '150%',
        fontWeight: 'bold',
        marginBottom: '15px',
    };

    const tileStyle = {
        backgroundColor: '#ddd'
    };

    const state = {
        coData: [
            {
                "group": "value",
                "value": 75
            }
        ],
        coOptions: {
            "title": "CO",
            "resizable": true,
            "gauge": {
                "type": "full"
            },
            "color": {
                "scale": {
                    "value": "#da1e28"
                }
            },
            "height": "100px"
        },
        no2Data: [
            {
                "group": "value",
                "value": 50
            }
        ],
        no2Options: {
            "title": "NO2",
            "resizable": true,
            "gauge": {
                "type": "full"
            },
            "color": {
                "scale": {
                    "value": "#ff832b"
                }
            },
            "height": "100px"
        },
        tmpData: [
            {
                "group": "value",
                "value": 25
            }
        ],
        tmpOptions: {
            "title": "Temp",
            "resizable": true,
            "gauge": {
                "type": "full"
            },
            "color": {
                "scale": {
                    "value": "#24a148"
                }
            },
            "height": "100px"
        },
        humData: [
            {
                "group": "value",
                "value": 0
            }
        ],
        humOptions: {
            "title": "Hum",
            "resizable": true,
            "gauge": {
                "type": "full"
            },
            "color": {
                "scale": {
                    "value": "#eee"
                }
            },
            "height": "100px"
        },
    };
  
    return (
      <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
        <div className="bx--row dashboard-page__r2">
            <div className="bx--col-md-8">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-8">
                            <h1 style={headStyle}>Dashboard</h1>
                            <ContentSwitcher onChange={() => {}}>
                                <Switch name="10min" text="10 minute average" />
                                <Switch name="30min" text="30 minute average" />
                                <Switch name="1hr" text="1 hour average" />
                                <Switch name="2hr" text="2 hour average" />
                                <Switch name="4hr" text="4 hour average" />
                                <Switch name="6hr" text="6 hour average" />
                            </ContentSwitcher>
                        </div>
                    </div>
                </div>
            </div>
        </div>                        
        <div className="bx--row dashboard-page__r2">
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>GRAF 4</p>
                            <p>40ppm</p>
                            <GaugeChart
                                data={state.coData}
                                options={state.coOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>20ppm</p>
                            <GaugeChart
                                data={state.no2Data}
                                options={state.no2Options}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>28&#8451;</p>
                            <GaugeChart
                                data={state.tmpData}
                                options={state.tmpOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>72%</p>
                            <GaugeChart
                                data={state.humData}
                                options={state.humOptions}>
                            </GaugeChart>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>GRAF 7</p>
                            <p>40ppm</p>
                            <GaugeChart
                                data={state.coData}
                                options={state.coOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>20ppm</p>
                            <GaugeChart
                                data={state.no2Data}
                                options={state.no2Options}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>28&#8451;</p>
                            <GaugeChart
                                data={state.tmpData}
                                options={state.tmpOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>72%</p>
                            <GaugeChart
                                data={state.humData}
                                options={state.humOptions}>
                            </GaugeChart>
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
                            <p style={headerStyle}>GRAF 5</p>
                            <p>40ppm</p>
                            <GaugeChart
                                data={state.coData}
                                options={state.coOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>20ppm</p>
                            <GaugeChart
                                data={state.no2Data}
                                options={state.no2Options}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>28&#8451;</p>
                            <GaugeChart
                                data={state.tmpData}
                                options={state.tmpOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>72%</p>
                            <GaugeChart
                                data={state.humData}
                                options={state.humOptions}>
                            </GaugeChart>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2">
                            <Link className="App-link" to="/reports?code=GRAF1&amp;reading=co">
                                <p style={headerStyle}>GRAF 1</p>
                                <p>40ppm</p>
                                <GaugeChart
                                    data={state.coData}
                                    options={state.coOptions}>
                                </GaugeChart>
                            </Link>
                        </div>
                        <div className="bx--col-md-2">
                            <Link className="App-link" to="/reports?code=GRAF1&amp;reading=no2">
                                <p style={headerStyle}>&nbsp;</p>
                                <p>20ppm</p>
                                <GaugeChart
                                    data={state.no2Data}
                                    options={state.no2Options}>
                                </GaugeChart>
                            </Link>
                        </div>
                        <div className="bx--col-md-2">
                            <Link className="App-link" to="/reports?code=GRAF1&amp;reading=tmp">
                                <p style={headerStyle}>&nbsp;</p>
                                <p>28&#8451;</p>
                                <GaugeChart
                                    data={state.tmpData}
                                    options={state.tmpOptions}>
                                </GaugeChart>
                            </Link>
                        </div>
                        <div className="bx--col-md-2">
                            <Link className="App-link" to="/reports?code=GRAF1&amp;reading=hum">
                                <p style={headerStyle}>&nbsp;</p>
                                <p>72%</p>
                                <GaugeChart
                                    data={state.humData}
                                    options={state.humOptions}>
                                </GaugeChart>
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
                            <p style={headerStyle}>GRAF 3</p>
                            <GaugeChart
                                data={state.coData}
                                options={state.coOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <GaugeChart
                                data={state.no2Data}
                                options={state.no2Options}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <GaugeChart
                                data={state.tmpData}
                                options={state.tmpOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <GaugeChart
                                data={state.humData}
                                options={state.humOptions}>
                            </GaugeChart>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>GRAF 6</p>
                            <p>40ppm</p>
                            <GaugeChart
                                data={state.coData}
                                options={state.coOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>20ppm</p>
                            <GaugeChart
                                data={state.no2Data}
                                options={state.no2Options}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>28&#8451;</p>
                            <GaugeChart
                                data={state.tmpData}
                                options={state.tmpOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>72%</p>
                            <GaugeChart
                                data={state.humData}
                                options={state.humOptions}>
                            </GaugeChart>
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
                            <p style={headerStyle}>GRAF 2</p>
                            <p>40ppm</p>
                            <GaugeChart
                                data={state.coData}
                                options={state.coOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>20ppm</p>
                            <GaugeChart
                                data={state.no2Data}
                                options={state.no2Options}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>28&#8451;</p>
                            <GaugeChart
                                data={state.tmpData}
                                options={state.tmpOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>72%</p>
                            <GaugeChart
                                data={state.humData}
                                options={state.humOptions}>
                            </GaugeChart>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>GRAF 8</p>
                            <p>40ppm</p>
                            <GaugeChart
                                data={state.coData}
                                options={state.coOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>20ppm</p>
                            <GaugeChart
                                data={state.no2Data}
                                options={state.no2Options}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>28&#8451;</p>
                            <GaugeChart
                                data={state.tmpData}
                                options={state.tmpOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>72%</p>
                            <GaugeChart
                                data={state.humData}
                                options={state.humOptions}>
                            </GaugeChart>
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
                            <p style={headerStyle}>GRAF 2</p>
                            <p>40ppm</p>
                            <GaugeChart
                                data={state.coData}
                                options={state.coOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>20ppm</p>
                            <GaugeChart
                                data={state.no2Data}
                                options={state.no2Options}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>28&#8451;</p>
                            <GaugeChart
                                data={state.tmpData}
                                options={state.tmpOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>72%</p>
                            <GaugeChart
                                data={state.humData}
                                options={state.humOptions}>
                            </GaugeChart>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>GRAF 8</p>
                            <p>40ppm</p>
                            <GaugeChart
                                data={state.coData}
                                options={state.coOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>20ppm</p>
                            <GaugeChart
                                data={state.no2Data}
                                options={state.no2Options}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>28&#8451;</p>
                            <GaugeChart
                                data={state.tmpData}
                                options={state.tmpOptions}>
                            </GaugeChart>
                        </div>
                        <div className="bx--col-md-2">
                            <p style={headerStyle}>&nbsp;</p>
                            <p>72%</p>
                            <GaugeChart
                                data={state.humData}
                                options={state.humOptions}>
                            </GaugeChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
    
}
  
export default DashboardGrid;
