import React, { useState, useContext } from 'react';
import { Modal, Button } from '@carbon/react';
import { TrashCan } from '@carbon/icons-react';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

const EventsDeleteModal = ({ row, loadEvents }) => {
  const [open, setOpen] = useState(false);
  const { t } = useContext(AppContext);

  const eventId = row.cells[0].value;
  const eventName = row.cells[1].value;

  const onRequestSubmit = async () => {
    try {
      const response = await fetch(
        `${Constants.API_BASE_URL}/api-main/v1/events/${eventId}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        loadEvents();
        setOpen(false);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <>
      <Button
        kind="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        renderIcon={TrashCan}
        iconDescription="Delete event"
        hasIconOnly
      />
      <Modal
        open={open}
        danger
        onRequestClose={() => setOpen(false)}
        modalHeading={`Delete event ${eventName}?`}
        modalLabel="Events"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onRequestSubmit={onRequestSubmit}>
        <p>This action cannot be undone.</p>
      </Modal>
    </>
  );
};

export default EventsDeleteModal;
