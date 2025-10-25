import React, { useState, useContext } from 'react';
import {
  Modal,
  InlineNotification,
  Button,
} from '@carbon/react';
import { TrashCan } from '@carbon/icons-react';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

const FirefightersDeleteModal = ({ row, loadFirefighters }) => {
  const { t } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Extract data from row
  const firefighterId = row.cells[0].value;
  const firefighterCode = row.cells[1].value;
  const name = row.cells[2].value;
  const surname = row.cells[3].value;
  const fullName = `${name} ${surname}`;

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${Constants.API_BASE_URL}/api-main/v1/firefighters/${firefighterId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadFirefighters(); // Refresh the table
        setOpen(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete firefighter');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setOpen(false);
  };

  return (
    <>
      <Button
        hasIconOnly
        renderIcon={TrashCan}
        iconDescription="Delete firefighter"
        kind="danger--ghost"
        size="sm"
        onClick={() => setOpen(true)}
      />
      
      <Modal
        open={open}
        onRequestClose={handleClose}
        onRequestSubmit={handleSubmit}
        modalHeading={`Delete firefighter ${fullName}?`}
        modalLabel="Firefighters"
        primaryButtonText={isLoading ? "Deleting..." : "Delete"}
        primaryButtonDisabled={isLoading}
        secondaryButtonText="Cancel"
        danger
      >
        {error && (
          <InlineNotification
            kind="error"
            title="Error"
            subtitle={error}
            hideCloseButton
            lowContrast
            style={{ marginBottom: '1rem' }}
          />
        )}
        
        <p>
          Are you sure you want to delete firefighter <strong>{fullName}</strong> (Code: {firefighterCode})?
        </p>
        <p style={{ marginTop: '1rem', color: '#da1e28' }}>
          This action cannot be undone.
        </p>
      </Modal>
    </>
  );
};

export default FirefightersDeleteModal;
