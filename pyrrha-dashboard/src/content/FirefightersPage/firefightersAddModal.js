import React, { useState, useContext } from 'react';
import { Modal, TextInput, Button, InlineNotification } from '@carbon/react';
import { Add } from '@carbon/icons-react';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

const FirefightersAddModal = ({ loadFirefighters }) => {
  const { t } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firefighter_code: '',
    name: '',
    surname: '',
    email: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value.trim(),
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const validateForm = () => {
    const { firefighter_code, name, surname, email } = formData;

    if (!firefighter_code || !name || !surname || !email) {
      setError('All fields are required');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${Constants.API_BASE_URL}/api-main/v1/firefighters`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add firefighter');
      }

      const result = await response.json();

      // Reset form and close modal
      setFormData({ firefighter_code: '', name: '', surname: '', email: '' });
      setIsOpen(false);

      // Notify parent component to refresh data
      if (loadFirefighters) {
        loadFirefighters();
      }
    } catch (err) {
      console.error('Error adding firefighter:', err);
      setError(err.message || 'Failed to add firefighter');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setError(null);
    setFormData({ firefighter_code: '', name: '', surname: '', email: '' });
  };

  return (
    <>
      <Button renderIcon={Add} onClick={() => setIsOpen(true)} size="md">
        {t('content.firefighters.add')}
      </Button>

      <Modal
        open={isOpen}
        onRequestClose={handleClose}
        onRequestSubmit={handleSubmit}
        modalHeading={t('content.firefighters.addTitle')}
        modalLabel={t('content.firefighters.heading')}
        primaryButtonText={t('content.firefighters.save')}
        secondaryButtonText={t('content.firefighters.cancel')}
        primaryButtonDisabled={loading}
        size="sm"
      >
        {error && (
          <InlineNotification
            kind="error"
            title="Error"
            subtitle={error}
            lowContrast
            hideCloseButton
            style={{ marginBottom: '1rem' }}
          />
        )}

        <div style={{ marginBottom: '1rem' }}>
          <TextInput
            id="firefighter-code"
            labelText={t('content.firefighters.code')}
            placeholder="GRAF001"
            value={formData.firefighter_code}
            onChange={(e) =>
              handleInputChange('firefighter_code', e.target.value)
            }
            invalid={error && !formData.firefighter_code}
            invalidText={!formData.firefighter_code ? 'Code is required' : ''}
            disabled={loading}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <TextInput
            id="firefighter-first"
            labelText={t('content.firefighters.first')}
            placeholder="Joan"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            invalid={error && !formData.name}
            invalidText={!formData.name ? 'First name is required' : ''}
            disabled={loading}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <TextInput
            id="firefighter-last"
            labelText={t('content.firefighters.last')}
            placeholder="Pep"
            value={formData.surname}
            onChange={(e) => handleInputChange('surname', e.target.value)}
            invalid={error && !formData.surname}
            invalidText={!formData.surname ? 'Last name is required' : ''}
            disabled={loading}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <TextInput
            id="firefighter-email"
            labelText={t('content.firefighters.email')}
            placeholder="graf004@graf.cat"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            invalid={
              error &&
              (!formData.email ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            }
            invalidText={
              !formData.email
                ? 'Email is required'
                : 'Please enter a valid email address'
            }
            disabled={loading}
          />
        </div>
      </Modal>
    </>
  );
};

export default FirefightersAddModal;
