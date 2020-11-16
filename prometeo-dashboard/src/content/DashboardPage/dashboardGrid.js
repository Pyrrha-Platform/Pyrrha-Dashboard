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
import FirefighterChart from '../../components/FirefighterChart/FirefighterChart';
import FirefighterGauge from '../../components/FirefighterGauge/FirefighterGauge';

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

    const [rawData, setRawData] = React.useState([]);
    const [transformedData, setTransformedData] = React.useState([]);
    const [fetched, setFetched] = React.useState(false);
    const [data, setData] = React.useState([]);
  
    React.useEffect(() => {
      loadDashboard();
      changeData();
    }, [fetched]);
  
    const loadDashboard = React.useCallback(async () => {
      try {
        const data = await client(`/api/v1/dashboard-now`);
        console.log(data);
        setRawData(data.firefighters);
        setTransformedData(transformData(data.firefighters));
      } catch (e) {
        console.log(e);
      }
    });

    //
    const datas = [
        [10, 30, 40, 20],
        [10, 40, 30, 20, 50, 10],
        [60, 30, 40, 20, 30]
    ];
    var i = 0;
    
    const changeData = React.useCallback(async () => {
        console.log('In changeData');
        setData(datas[i++]);
        if (i === datas.length) i = 0;
    });
    //

    const transformData = ( { data } ) => {
        // Need to take the raw array of firefighter info and put it into the format 
        // that the gauges expect... an data array an options object. There are 4
        // gauges per firefighter. 
        return data;
    }

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
                        <div className="bx--col-md-2" id="graf7-co-chart">
                            <FirefighterChart firefighterId={1} type={'CO'} initialNumber={30} unit={'ppm'} />
                            {/* <FirefighterChart firefighterId={1} type={'NO2'} initialNumber={30} unit={'ppm'} /> */}
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
