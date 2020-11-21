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
const DetailsGrid = ( { deviceId } ) => {

    // Initially loaded data from database
    const [rawData, setRawData] = useState([]);
    const [transformedData, setTransformedData] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
      loadDetails();
    }, [fetched]);
  
    const loadDetails = useCallback(async () => {
      try {
        const data = await client(`/api/v1/details-now`);
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
      <div className="bx--grid bx--grid--full-width details-content">
        <div className="bx--row">
            <div className="bx--col-md-16">
                <h1 className="details-page__heading">Details</h1>
            </div>
        </div>   

        <div className="bx--row">
            <div className="bx--col-md-16">
                <h1 className="details-page__subheading">You are now viewing the details for the readings for a specific firefighter.</h1>
            </div>
        </div> 

        <ContentSwitcher onChange={() => {}} size={'xl'} className="details-page__switcher">
            <Switch name="All" text="All" />
            <Switch name="Now" text="Now" />
            <Switch name="10min" text="10 min avg" />
            <Switch name="30min" text="30 min avg" />
            <Switch name="1hr" text="1 hr avg" />
            <Switch name="4hr" text="4 hr avg" />
            <Switch name="6hr" text="6 hr avg" />
        </ContentSwitcher>

        <div class="bx--row">
            <div class="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
                <div className="bx--grid bx--grid--full-width details-content">
                    <div className="bx--row details-tile">
                        <div className="bx--col-md-8 label-firefighter">
                            Now
                        </div>
                    </div>
                    <div className="bx--row details-tile">
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
                <div className="bx--grid bx--grid--full-width details-content">
                    <div className="bx--row details-tile">
                        <div className="bx--col-md-8 label-firefighter">
                        10 min avg
                        </div>
                    </div>
                    <div className="bx--row details-tile">
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
                <div className="bx--grid bx--grid--full-width details-content">
                    <div className="bx--row details-tile">
                        <div className="bx--col-md-8 label-firefighter">
                            30 min avg
                        </div>
                    </div>
                    <div className="bx--row details-tile">
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
                <div className="bx--grid bx--grid--full-width details-content">
                    <div className="bx--row details-tile">
                        <div className="bx--col-md-8 label-firefighter">
                        1 hr avg
                        </div>
                    </div>
                    <div className="bx--row details-tile">
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
                <div className="bx--grid bx--grid--full-width details-content">
                    <div className="bx--row details-tile">
                        <div className="bx--col-md-8 label-firefighter">
                            4 hr avg
                        </div>
                    </div>
                    <div className="bx--row details-tile">
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
                <div className="bx--grid bx--grid--full-width details-content">
                    <div className="bx--row details-tile">
                        <div className="bx--col-md-8 label-firefighter">
                        8 hr avg
                        </div>
                    </div>
                    <div className="bx--row details-tile">
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


        <div class="bx--row">
            <div class="bx--col-lg-16 bx--col-md-8 bx--col-sm-1">
                <div className="bx--grid bx--grid--full-width details-content">
                    <div className="bx--row details-tile">
                        <div className="bx--col-md-16 label-firefighter">
                            CO<br/>4 hr avg
                        </div>
                    </div>
                    <div className="bx--row details-tile">
                        <div className="bx--col bx--col-md-16">
                            <FirefighterChart firefighterId={1} type={'CO'} initialNumber={30} unit={'ppm'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>  

      </div>
    );
    
}
  
export default DetailsGrid;
