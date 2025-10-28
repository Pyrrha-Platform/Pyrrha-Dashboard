import React, { useState, useContext } from 'react';
import { Modal, Button } from '@carbon/react';
import { TrashCan } from '@carbon/icons-react';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

const DevicesDeleteModal = ({ row, loadDevices }) => {
  const [open, setOpen] = useState(false);
  const { t } = useContext(AppContext);

  const deviceId = row.cells[0].value;
  const deviceName = row.cells[1].value;
  const deviceModel = row.cells[2].value;

  const onRequestSubmit = async () => {
    try {
      const response = await fetch(
        `${Constants.API_BASE_URL}/api-main/v1/devices/${deviceId}`,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) {
        loadDevices();
        setOpen(false);
      }
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  return (
    <>
      <Button
        kind="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        renderIcon={TrashCan}
        iconDescription="Delete device"
        hasIconOnly
      />
      <Modal
        open={open}
        danger
        onRequestClose={() => setOpen(false)}
        modalHeading={`Delete device ${deviceName} ${deviceModel}?`}
        modalLabel="Devices"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onRequestSubmit={onRequestSubmit}>
        <p>This action cannot be undone.</p>
      </Modal>
    </>
  );
};

export default DevicesDeleteModal;
