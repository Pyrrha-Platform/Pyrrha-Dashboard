import React, { useState, useContext } from 'react';
import { TextInput, Modal, Button } from '@carbon/react';
import { Add } from '@carbon/icons-react';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

const DevicesAddModal = ({ loadDevices }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [version, setVersion] = useState('');
  const { t } = useContext(AppContext);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${Constants.API_BASE_URL}/api-main/v1/devices`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            model,
            version,
          }),
        }
      );

      if (response.ok) {
        loadDevices();
        setOpen(false);
        // Reset form
        setName('');
        setModel('');
        setVersion('');
      }
    } catch (error) {
      console.error('Error adding device:', error);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        renderIcon={Add}
        iconDescription="Add device">
        Add device
      </Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        modalHeading="Add device"
        modalLabel="Devices"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onRequestSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <TextInput
            id="device-name"
            value={name}
            placeholder="Device-001"
            labelText={t('content.devices.name') + ':'}
            onChange={(e) => setName(e.target.value.trim())}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextInput
            id="device-model"
            value={model}
            placeholder="Model A"
            labelText={t('content.devices.model') + ':'}
            onChange={(e) => setModel(e.target.value.trim())}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextInput
            id="device-version"
            value={version}
            placeholder="1.0"
            labelText={t('content.devices.version') + ':'}
            onChange={(e) => setVersion(e.target.value.trim())}
          />
        </div>
      </Modal>
    </>
  );
};

export default DevicesAddModal;
