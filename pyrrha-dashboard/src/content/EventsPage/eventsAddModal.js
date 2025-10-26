import React, { useState, useContext, useEffect } from 'react';
import {
  TextInput,
  DatePicker,
  DatePickerInput,
  TimePicker,
  Modal,
  Button,
  Dropdown,
  TextArea,
} from '@carbon/react';
import { Add } from '@carbon/icons-react';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

const EventsAddModal = ({ loadEvents }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [eventType, setEventType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [status, setStatus] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [initTime, setInitTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [extraInfo, setExtraInfo] = useState('');

  // Dropdown options
  const [eventTypes, setEventTypes] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  const { t } = useContext(AppContext);

  // Load dropdown options
  useEffect(() => {
    loadDropdownOptions();
  }, []);

  const loadDropdownOptions = async () => {
    try {
      // Load event types
      const eventTypesResponse = await fetch(
        `${Constants.API_BASE_URL}/api-main/v1/event-types`,
      );
      const eventTypesData = await eventTypesResponse.json();
      setEventTypes(eventTypesData.event_types || []);

      // Load fuel types
      const fuelTypesResponse = await fetch(
        `${Constants.API_BASE_URL}/api-main/v1/fuel-types`,
      );
      const fuelTypesData = await fuelTypesResponse.json();
      setFuelTypes(fuelTypesData.fuel_types || []);

      // Load status options
      const statusResponse = await fetch(
        `${Constants.API_BASE_URL}/api-main/v1/status`,
      );
      const statusData = await statusResponse.json();
      setStatusOptions(statusData.status_options || []);
    } catch (error) {
      console.error('Error loading dropdown options:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${Constants.API_BASE_URL}/api-main/v1/events`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            event_type: eventType,
            fuel_type: fuelType,
            status,
            event_date: eventDate,
            init_time: initTime,
            end_time: endTime,
            extra_info: extraInfo,
          }),
        },
      );

      if (response.ok) {
        loadEvents();
        setOpen(false);
        // Reset form
        setName('');
        setEventType('');
        setFuelType('');
        setStatus('');
        setEventDate('');
        setInitTime('');
        setEndTime('');
        setExtraInfo('');
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        renderIcon={Add}
        iconDescription="Add event"
      >
        Add event
      </Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        modalHeading="Add event"
        modalLabel="Events"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onRequestSubmit={handleSubmit}
      >
        <div style={{ marginBottom: '1rem' }}>
          <TextInput
            id="event-name"
            value={name}
            placeholder="Wildfire Response 2024"
            labelText={t('content.events.name') + ':'}
            onChange={(e) => setName(e.target.value.trim())}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <Dropdown
            id="event-type"
            titleText={t('content.events.type') + ':'}
            label="Select event type"
            items={eventTypes}
            itemToString={(item) => (item ? item.event_description : '')}
            selectedItem={eventTypes.find(
              (item) => item.event_id === eventType,
            )}
            onChange={({ selectedItem }) =>
              setEventType(selectedItem ? selectedItem.event_id : '')
            }
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <Dropdown
            id="fuel-type"
            titleText={t('content.events.fuel_type') + ':'}
            label="Select fuel type"
            items={fuelTypes}
            itemToString={(item) => (item ? item.fuel_description : '')}
            selectedItem={fuelTypes.find((item) => item.fuel_id === fuelType)}
            onChange={({ selectedItem }) =>
              setFuelType(selectedItem ? selectedItem.fuel_id : '')
            }
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <Dropdown
            id="status"
            titleText={t('content.events.status') + ':'}
            label="Select status"
            items={statusOptions}
            itemToString={(item) => (item ? item.status_description : '')}
            selectedItem={statusOptions.find(
              (item) => item.status_id === status,
            )}
            onChange={({ selectedItem }) =>
              setStatus(selectedItem ? selectedItem.status_id : '')
            }
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <DatePicker
            datePickerType="single"
            onChange={(dates) => {
              if (dates && dates.length > 0) {
                const date = dates[0];
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                setEventDate(`${year}-${month}-${day}`);
              }
            }}
          >
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText={t('content.events.date') + ':'}
              id="event-date"
            />
          </DatePicker>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TimePicker
            id="init-time"
            labelText={t('content.events.init_time') + ':'}
            onChange={(e) => setInitTime(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TimePicker
            id="end-time"
            labelText={t('content.events.end_time') + ':'}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextArea
            id="extra-info"
            value={extraInfo}
            placeholder="Additional event information..."
            labelText={t('content.events.extra_info') + ':'}
            onChange={(e) => setExtraInfo(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

export default EventsAddModal;
