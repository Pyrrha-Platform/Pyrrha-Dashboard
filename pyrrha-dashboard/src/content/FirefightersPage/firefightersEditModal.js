import React, { useState, useContext } from 'react';
import { TextInput, Modal, InlineNotification, Button } from '@carbon/react';
import { Edit } from '@carbon/icons-react';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

const FirefightersEditModal = ({ row, loadFirefighters }) => {
  const { t } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize form data from row
  const [formData, setFormData] = useState({
    firefighter_id: row.cells[0].value,
    firefighter_code: row.cells[1].value,
    name: row.cells[2].value,
    surname: row.cells[3].value,
    email: row.cells[4].value,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError(''); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (!formData.firefighter_code.trim()) {
      setError('Firefighter code is required');
      return false;
    }
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.surname.trim()) {
      setError('Surname is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${Constants.API_BASE_URL}/api-main/v1/firefighters/${formData.firefighter_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        loadFirefighters(); // Refresh the table
        setOpen(false);
        // Reset form for next time
        setFormData({
          firefighter_id: '',
          firefighter_code: '',
          name: '',
          surname: '',
          email: '',
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update firefighter');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form to original values when closing
    setFormData({
      firefighter_id: row.cells[0].value,
      firefighter_code: row.cells[1].value,
      name: row.cells[2].value,
      surname: row.cells[3].value,
      email: row.cells[4].value,
    });
    setError('');
    setOpen(false);
  };

  return (
    <>
      <Button
        hasIconOnly
        renderIcon={Edit}
        iconDescription="Edit firefighter"
        kind="ghost"
        size="sm"
        onClick={() => setOpen(true)}
      />

      <Modal
        open={open}
        onRequestClose={handleClose}
        onRequestSubmit={handleSubmit}
        modalHeading="Edit Firefighter"
        modalLabel="Firefighters"
        primaryButtonText={isLoading ? 'Saving...' : 'Save'}
        primaryButtonDisabled={isLoading}
        secondaryButtonText="Cancel"
        shouldSubmitOnEnter
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

        <TextInput
          id="edit-firefighter-code"
          labelText="Firefighter Code"
          placeholder="Enter firefighter code"
          value={formData.firefighter_code}
          onChange={(e) =>
            handleInputChange('firefighter_code', e.target.value)
          }
          disabled={isLoading}
          style={{ marginBottom: '1rem' }}
        />

        <TextInput
          id="edit-name"
          labelText="Name"
          placeholder="Enter first name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          disabled={isLoading}
          style={{ marginBottom: '1rem' }}
        />

        <TextInput
          id="edit-surname"
          labelText="Surname"
          placeholder="Enter last name"
          value={formData.surname}
          onChange={(e) => handleInputChange('surname', e.target.value)}
          disabled={isLoading}
          style={{ marginBottom: '1rem' }}
        />

        <TextInput
          id="edit-email"
          labelText="Email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          disabled={isLoading}
        />
      </Modal>
    </>
  );
};

export default FirefightersEditModal;
