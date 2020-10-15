import React from 'react';
import { 
    AreaChart 
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
const ReportsGrid = ( { deviceId } ) => {

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

    const headStyle = {
        fontSize: '200%',
        fontWeight: 'bold',
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
        data: [
            {
                "group": "CO 10min",
                "date": "2020-02-10T05:00:00.000Z",
                "value": 0
            },
            {
                "group": "CO 10min",
                "date": "2020-02-10T06:00:00.000Z",
                "value": 57312
            },
            {
                "group": "CO 10min",
                "date": "2020-02-10T07:00:00.000Z",
                "value": 21432
            },
            {
                "group": "CO 10min",
                "date": "2020-02-10T08:00:00.000Z",
                "value": 70323
            },
            {
                "group": "CO 10min",
                "date": "2020-02-10T09:00:00.000Z",
                "value": 21300
            },
            {
                "group": "CO 30min",
                "date": "2020-02-10T05:00:00.000Z",
                "value": 0
            },
            {
                "group": "CO 30min",
                "date": "2020-02-10T06:00:00.000Z",
                "value": 56312
            },
            {
                "group": "CO 30min",
                "date": "2020-02-10T07:00:00.000Z",
                "value": 20432
            },
            {
                "group": "CO 30min",
                "date": "2020-02-10T08:00:00.000Z",
                "value": 69323
            },
            {
                "group": "CO 30min",
                "date": "2020-02-10T09:00:00.000Z",
                "value": 20300
            },
            {
                "group": "CO 1hr",
                "date": "2020-02-10T05:00:00.000Z",
                "value": 0
            },
            {
                "group": "CO 1hr",
                "date": "2020-02-10T06:00:00.000Z",
                "value": 58312
            },
            {
                "group": "CO 1hr",
                "date": "2020-02-10T07:00:00.000Z",
                "value": 22432
            },
            {
                "group": "CO 1hr",
                "date": "2020-02-10T08:00:00.000Z",
                "value": 71323
            },
            {
                "group": "CO 1hr",
                "date": "2020-02-10T09:00:00.000Z",
                "value": 22300
            },
            {
                "group": "CO 2hr",
                "date": "2020-02-10T05:00:00.000Z",
                "value": 50000
            },
            {
                "group": "CO 2hr",
                "date": "2020-02-10T06:00:00.000Z",
                "value": 15000
            },
            {
                "group": "CO 2hr",
                "date": "2020-02-10T07:00:00.000Z",
                "value": 20000
            },
            {
                "group": "CO 2hr",
                "date": "2020-02-10T08:00:00.000Z",
                "value": 39213
            },
            {
                "group": "CO 2hr",
                "date": "2020-02-10T09:00:00.000Z",
                "value": 61213
            },
            {
                "group": "CO 4hr",
                "date": "2020-02-10T05:00:00.000Z",
                "value": 10
            },
            {
                "group": "CO 4hr",
                "date": "2020-02-10T06:00:00.000Z",
                "value": 37312
            },
            {
                "group": "CO 4hr",
                "date": "2020-02-10T07:00:00.000Z",
                "value": 51432
            },
            {
                "group": "CO 4hr",
                "date": "2020-02-10T08:00:00.000Z",
                "value": 40323
            },
            {
                "group": "CO 4hr",
                "date": "2020-02-10T09:00:00.000Z",
                "value": 31300
            },
            {
                "group": "CO 8hr",
                "date": "2020-02-10T05:00:00.000Z",
                "value": 10
            },
            {
                "group": "CO 8hr",
                "date": "2020-02-10T06:00:00.000Z",
                "value": 37312
            },
            {
                "group": "CO 8hr",
                "date": "2020-02-10T07:00:00.000Z",
                "value": 51432
            },
            {
                "group": "CO 8hr",
                "date": "2020-02-10T08:00:00.000Z",
                "value": 40323
            },
            {
                "group": "CO 8hr",
                "date": "2020-02-10T09:00:00.000Z",
                "value": 31300
            },
            {
                "group": "CO Limit",
                "date": "2020-02-10T05:00:00.000Z",
                "value": 80000
            },
            {
                "group": "CO Limit",
                "date": "2020-02-10T06:00:00.000Z",
                "value": 80000
            },
            {
                "group": "CO Limit",
                "date": "2020-02-10T07:00:00.000Z",
                "value": 80000
            },
            {
                "group": "CO Limit",
                "date": "2020-02-10T08:00:00.000Z",
                "value": 80000
            },
            {
                "group": "CO Limit",
                "date": "2020-02-10T09:00:00.000Z",
                "value": 80000
            }
        ],
        options: {
            "title": "Carbon Monoxide",
            "resizable": true,
            "axes": {
                "bottom": {
                    "title": "Time",
                    "mapsTo": "date",
                    "scaleType": "time"
                },
                "left": {
                    "mapsTo": "value",
                    "title": "Measure (PPM)",
                    "scaleType": "linear"
                }
            },
            "height": "400px"
        },
    };
  
    return (
      <div className="bx--grid bx--grid--full-width reports-content sensors-page">
        <div className="bx--row reports-page__r2">
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width reports-content sensors-page">
                    <div className="bx--row reports-page__r2">
                        <div className="bx--col-md-8">
                            <h1 style={headStyle}>GRAF 1</h1>
                            <h2>Sensor Values from Device</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>                        
        <div className="bx--row reports-page__r2">
            <div className="bx--col-md-4">
                <div className="bx--grid bx--grid--full-width reports-content sensors-page">
                    <div className="bx--row reports-page__r2">
                        <div className="bx--col-md-8">
                            <AreaChart
                                data={state.data}
                                options={state.options}>
                            </AreaChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
      </div>
    );
    
}
  
export default ReportsGrid;
