import React from 'react';
import { 
    DonutChart 
} from '@carbon/charts-react';
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

    const [devices, setDevices] = React.useState([]);
    const [fetched, setFetched] = React.useState(false);
  
    React.useEffect(() => {
      loadDevices();
    }, [fetched]);
  
    const loadDevices = React.useCallback(async () => {
      try {
        const data = await client(`/api/v1/devices`);
        console.log(data);
        setDevices(data.devices);
      } catch (e) {
        console.log(e);
      }
    });

    const state = {
        data: [
            {
                "group": "CO",
                "value": 25
            },
            {
                "group": "Non CO",
                "value": 75
            }
        ],
        options: {
            "title": "CO",
            "legend": false,
            "resizable": true,
            "donut": {
                "center": {
                    "label": "CO"
                },
                "alignment": "center"
            },
            "height": "400px"
        }
    };
  
    return (
      <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
        <div className="bx--row dashboard-page__r2">
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                        <div className="bx--col-md-2">
                            <DonutChart
                                data={state.data}
                                options={state.options}>
                            </DonutChart>
                        </div>
                        <div className="bx--col-md-2">
                            NO<sub>2</sub>
                        </div>
                        <div className="bx--col-md-2">
                            Temperature
                        </div>
                        <div className="bx--col-md-2">
                            Humidity
                        </div>
                    </div>
                </div>
            </div>
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
                    <div className="bx--row dashboard-page__r2">
                    <div className="bx--col-md-2">
                            CO
                        </div>
                        <div className="bx--col-md-2">
                            NO<sub>2</sub>
                        </div>
                        <div className="bx--col-md-2">
                            Temperature
                        </div>
                        <div className="bx--col-md-2">
                            Humidity
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bx--row dashboard-page__r3">
            <div className="bx--col-md-4">
                Carbon is Modular
            </div>
            <div className="bx--col-md-4">
                Carbon is Consistent
            </div>
        </div>
        <div className="bx--row dashboard-page__r43">
            <div className="bx--col-md-4">
                Carbon is Modular
            </div>
            <div className="bx--col-md-4">
                Carbon is Consistent
            </div>
        </div>
        <div className="bx--row dashboard-page__r5">
            <div className="bx--col-md-4">
                Carbon is Modular
            </div>
            <div className="bx--col-md-4">
                Carbon is Consistent
            </div>
        </div>
      </div>
    );
    
}
  
export default DashboardGrid;
