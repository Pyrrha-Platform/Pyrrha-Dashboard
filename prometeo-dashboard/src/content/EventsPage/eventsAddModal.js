import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import { settings } from 'carbon-components';
import {
  TextInput,
  ComposedModal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
} from 'carbon-components-react';
import { iconAdd, iconAddSolid, iconAddOutline } from 'carbon-icons';
import { Add16 } from '@carbon/icons-react';
import Context from '../../context/app';

// This defines a modal controlled by a launcher button.
const ModalStateManager = ({
  renderLauncher: LauncherContent,
  children: ModalContent,
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useContext(Context);
  return (
    <>
      {!ModalContent || typeof document === 'undefined'
        ? null
        : ReactDOM.createPortal(
            <ModalContent open={open} setOpen={setOpen} t={t} />,
            document.body
          )}
      {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
    </>
  );
};

// const { prefix } = settings;

const addProps = {
  composedModal: ({ titleOnly } = {}) => ({
    open: true,
    danger: false,
    selectorPrimaryFocus: '[data-modal-primary-focus]',
  }),
  modalHeader: ({ titleOnly } = {}) => ({
    label: 'Events',
    title: 'Add event',
    iconDescription: 'Close',
  }),
  modalBody: () => ({
    hasScrollingContent: false,
    'aria-label': 'Add event',
  }),
  modalFooter: () => ({
    primaryButtonText: 'Save',
    primaryButtonDisabled: false,
    secondaryButtonText: 'Cancel',
    shouldCloseAfterSubmit: true,
    onRequestSubmit: (event) => {
      handleSubmit(event);
    },
  }),
};

// On submit we should be passed the values.
const handleSubmit = (
  code,
  type,
  date,
  firefighters,
  state,
  loadEvents,
  setOpen
) => {
  console.log('handleSubmit');
  console.log('code ' + code);
  console.log('type ' + type);
  console.log('date ' + date);
  console.log('firefighters ' + firefighters);
  console.log('state ' + state);

  axios
    .post(`/api/v1/events`, {
      code: code,
      type: type,
      date: date,
      firefighters: firefighters,
      state: state,
    })
    .then((res) => {
      // TODO: Set success or error message
      console.log(res);
      console.log(res.data);

      // Refresh data
      loadEvents();

      // TODO: Check for error or success
      setOpen(false);
    });

  return true;
};

class EventsAddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: props.row,
      loadEvents: props.loadEvents,
      code: '',
      type: '',
      date: '',
      firefighters: '',
      state: '',
      open: false,
    };
    console.log(this.state.row);
  }

  render() {
    // const { open } = this.state.open;
    const { size, ...rest } = addProps.composedModal();
    const { hasScrollingContent, ...bodyProps } = addProps.modalBody();

    return (
      <ModalStateManager
        renderLauncher={({ setOpen }) => (
          <Button
            onClick={() => setOpen(true)}
            renderIcon={Add16}
            iconDescription="Add event">
            Add event
          </Button>
        )}>
        {({ open, setOpen, t }) => (
          <ComposedModal
            {...rest}
            open={open}
            t={t}
            loadEvents={this.props.loadEvents}
            size={size || undefined}
            onClose={() => setOpen(false)}>
            <ModalHeader {...addProps.modalHeader()} />
            <ModalBody
              {...bodyProps}
              aria-label={hasScrollingContent ? 'Modal content' : undefined}>
              <br />
              <TextInput
                id={this.state.code}
                value={this.state.code}
                placeholder="REMS-10-01-200"
                labelText={t('content.events.code') + ':'}
                onChange={(e) => (this.state.code = e.target.value.trim())}
              />
              <br />
              <TextInput
                id={this.state.code + '-' + this.state.type}
                value={this.state.type}
                placeholder="Controlled burn"
                labelText={t('content.events.type') + ':'}
                onChange={(e) => (this.state.type = e.target.value.trim())}
              />
              <br />
              <TextInput
                id={this.state.code + '-' + this.state.date}
                value={this.state.date}
                placeholder="2020/12/15"
                labelText={t('content.events.date') + ':'}
                onChange={(e) => (this.state.date = e.target.value.trim())}
              />
              <br />
              <TextInput
                id={this.state.code + '-' + this.state.firefighters}
                value={this.state.firefighters}
                placeholder="10"
                labelText={t('content.events.firefighters') + ':'}
                onChange={(e) =>
                  (this.state.firefighters = e.target.value.trim())
                }
              />
              <br />
              <TextInput
                id={this.state.code + '-' + this.state.state}
                value={this.state.state}
                placeholder="In progress"
                labelText={t('content.events.state') + ':'}
                onChange={(e) => (this.state.state = e.target.value.trim())}
              />
              <br />
              <br />
            </ModalBody>
            <ModalFooter
              {...addProps.modalFooter()}
              shouldCloseAfterSubmit={true}
              onRequestSubmit={() => {
                handleSubmit(
                  this.state.code,
                  this.state.type,
                  this.state.date,
                  this.state.firefighters,
                  this.state.state,
                  this.state.loadEvents,
                  setOpen
                );
              }}
            />
          </ComposedModal>
        )}
      </ModalStateManager>
    );
  }
}

export default EventsAddModal;
