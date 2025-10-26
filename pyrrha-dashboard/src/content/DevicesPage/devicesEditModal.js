import React, { useState, useContext } from 'react';
import {
  TextInput,
  Modal,
  Button,
} from '@carbon/react';
import { Edit } from '@carbon/icons-react';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

const DevicesEditModal = ({ row, loadDevices }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(row.cells[1].value);
  const [model, setModel] = useState(row.cells[2].value);
  const [version, setVersion] = useState(row.cells[3].value);
  const { t } = useContext(AppContext);

  const deviceId = row.cells[0].value;

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${Constants.API_BASE_URL}/devices/${deviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: deviceId,
          name,
          model,
          version,
        }),
      });

      if (response.ok) {
        loadDevices();
        setOpen(false);
      }
    } catch (error) {
      console.error('Error updating device:', error);
    }
  };

  return (
    <>
      <Button
        kind="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        renderIcon={Edit}
        iconDescription="Edit device"
        hasIconOnly
      />
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        modalHeading="Edit device"
        modalLabel="Devices"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onRequestSubmit={handleSubmit}
      >
        <div style={{ marginBottom: '1rem' }}>
          <TextInput
            id="device-name-edit"
            value={name}
            labelText={t('content.devices.name') + ':'}
            onChange={(e) => setName(e.target.value.trim())}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextInput
            id="device-model-edit"
            value={model}
            labelText={t('content.devices.model') + ':'}
            onChange={(e) => setModel(e.target.value.trim())}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextInput
            id="device-version-edit"
            value={version}
            labelText={t('content.devices.version') + ':'}
            onChange={(e) => setVersion(e.target.value.trim())}
          />
        </div>
      </Modal>
    </>
  );
};

export default DevicesEditModal;
