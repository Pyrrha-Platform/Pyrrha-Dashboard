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
    label: 'Devices',
    title: 'Edit device',
    iconDescription: 'Close',
  }),
  modalBody: () => ({
    hasScrollingContent: false,
    'aria-label': 'Edit device',
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
const handleSubmit = (id, code, model, version, loadDevices, setOpen) => {
  console.log('handleSubmit');
  console.log('id ' + id);
  console.log('code ' + code);
  console.log('model ' + model);
  console.log('version ' + version);

  axios
    .put(`/api-main/v1/devices/` + id, {
      id: id,
      code: code,
      model: model,
      version: version,
    })
    .then((res) => {
      // TODO: Set success or error message
      console.log(res);
      console.log(res.data);

      // Refresh data
      loadDevices();

      // TODO: Check for error or success
      setOpen(false);
    });

  return true;
};

// The implementation of the Modal
class DevicesEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: props.row,
      loadDevices: props.loadDevices,
      id: this.props.row.cells[0].value,
      code: this.props.row.cells[1].value,
      model: this.props.row.cells[2].value,
      version: this.props.row.cells[3].value,
      open: false,
    };
    console.log(this.state.row);
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
        )}>
        {({ open, setOpen, t }) => (
          <ComposedModal
            {...rest}
            open={open}
            t={t}
            row={this.props.row}
            loadDevices={this.props.loadDevices}
            size={size || undefined}
            onClose={() => setOpen(false)}>
            <ModalHeader {...editProps.modalHeader()} />
            <ModalBody
              {...bodyProps}
              aria-label={hasScrollingContent ? 'Modal content' : undefined}>
              <br />
              <TextInput
                id={this.state.code}
                value={this.state.code}
                labelText={t('content.devices.code') + ':'}
                onChange={(e) => (this.state.code = e.target.value.trim())}
              />
              <br />
              <TextInput
                id={this.state.model}
                value={this.state.model}
                labelText={t('content.devices.model') + ':'}
                onChange={(e) => (this.state.model = e.target.value.trim())}
              />
              <br />
              <TextInput
                id={this.state.version}
                value={this.state.version}
                labelText={t('content.devices.version') + ':'}
                onChange={(e) => (this.state.version = e.target.value.trim())}
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
                  this.state.model,
                  this.state.version,
                  this.state.loadDevices,
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

export default DevicesEditModal;
