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
const DashboardTile = ( { deviceId } ) => {

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
        firefighter: "GRAF 21",
        data: [
            {
                "group": "value",
                "value": 75
            }
        ],
        options: {
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

    };
  
    return (
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
    );
    
}
  
export default DashboardTile;
