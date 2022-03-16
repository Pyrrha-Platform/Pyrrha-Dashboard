import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  TextInput,
  ComposedModal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Icon,
} from 'carbon-components-react';
import { iconEdit } from 'carbon-icons';
import AppContext from '../../context/app';

// This defines a modal controlled by a launcher button. We have one per DataTable row.
const ModalStateManager = ({
  renderLauncher: LauncherContent,
  children: ModalContent,
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useContext(AppContext);
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

// Modal properties
const editProps = {
  composedModal: ({ titleOnly } = {}) => ({
    open: true,
    danger: false,
    selectorPrimaryFocus: '[data-modal-primary-focus]',
  }),
  modalHeader: ({ titleOnly } = {}) => ({
    label: 'Events',
    title: 'Edit event',
    iconDescription: 'Close',
  }),
  modalBody: () => ({
    hasScrollingContent: false,
    'aria-label': 'Edit event',
  }),
  modalFooter: () => ({
    primaryButtonText: 'Save',
    primaryButtonDisabled: false,
    secondaryButtonText: 'Cancel',
    shouldCloseAfterSubmit: true,
  }),
  menuItem: () => ({
    closeMenu: (event) => {
      handleSubmit(event);
    },
  }),
  editIcon: () => ({
    style: {
      margin: '5px',
    },
    icon: iconEdit,
    name: iconEdit,
    role: 'img',
    fill: 'grey',
    fillRule: '',
    width: '',
    height: '',
    description:
      'This is a description of the icon and what it does in context',
    iconTitle: '',
    className: 'extra-class',
  }),
};

// On submit we should be passed the values.
const handleSubmit = (
  id,
  code,
  type,
  date,
  state,
  firefighters,
  loadEvents,
  setOpen
) => {
  // console.log('handleSubmit');
  // console.log('id ' + id);
  // console.log('code ' + code);
  // console.log('type ' + type);
  // console.log('date ' + date);
  // console.log('firefighters ' + firefighters);
  // console.log('state ' + state);

  axios
    .put(`/api-main/v1/events/` + id, {
      id: id,
      code: code,
      type: type,
      date: date,
      firefighters: firefighters,
      state: state,
    })
    .then((res) => {
      // TODO: Set success or error message
      // console.log(res);
      // console.log(res.data);

      // Refresh data
      loadEvents();

      // TODO: Check for error or success
      setOpen(false);
    });

  return true;
};

// The implementation of the Modal
class EventsEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: props.row,
      loadEvents: props.loadEvents,
      id: this.props.row.cells[0].value,
      code: this.props.row.cells[1].value,
      type: this.props.row.cells[2].value,
      date: this.props.row.cells[3].value,
      firefighters: 10,
      state: this.props.row.cells[4].value,
      open: false,
    };
    // console.log(this.state.row);
  }

  render() {
    // const { open } = this.state.open;
    const { size, ...rest } = editProps.composedModal();
    const { hasScrollingContent, ...bodyProps } = editProps.modalBody();

    return (
      <ModalStateManager
        renderLauncher={({ setOpen }) => (
          <Icon
            {...editProps.editIcon()}
            onClick={() => setOpen(true)}
            title={this.state.id}
          />
        )}
      >
        {({ open, setOpen, t }) => (
          <ComposedModal
            {...rest}
            open={open}
            t={t}
            row={this.props.row}
            loadEvents={this.props.loadEvents}
            size={size || undefined}
            onClose={() => setOpen(false)}
          >
            <ModalHeader {...editProps.modalHeader()} />
            <ModalBody
              {...bodyProps}
              aria-label={hasScrollingContent ? 'Modal content' : undefined}
            >
              <br />
              <TextInput
                id={this.state.code}
                value={this.state.code}
                labelText={t('content.events.code') + ':'}
                onChange={(e) => (this.state.code = e.target.value.trim())}
              />
              <br />
              <TextInput
                id={this.state.code + '-' + this.state.type}
                value={this.state.type}
                labelText={t('content.events.type') + ':'}
                onChange={(e) => (this.state.type = e.target.value.trim())}
              />
              <br />
              <TextInput
                id={this.state.code + '-' + this.state.date}
                value={this.state.date}
                labelText={t('content.events.date') + ':'}
                onChange={(e) => (this.state.date = e.target.value.trim())}
              />
              <br />
              <TextInput
                id={this.state.code + '-' + this.state.firefighters}
                value={this.state.firefighters}
                labelText={t('content.events.firefighters') + ':'}
                onChange={(e) =>
                  (this.state.firefighters = e.target.value.trim())
                }
              />
              <br />
              <TextInput
                id={this.state.code + '-' + this.state.state}
                value={this.state.state}
                labelText={t('content.events.state') + ':'}
                onChange={(e) => (this.state.state = e.target.value.trim())}
              />
              <br />
              <br />
            </ModalBody>
            <ModalFooter
              {...editProps.modalFooter()}
              shouldCloseAfterSubmit={true}
              onRequestSubmit={() => {
                handleSubmit(
                  this.state.id,
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

export default EventsEditModal;
