import React, { useState } from 'react';
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
} from  'carbon-components-react';
import { 
  iconAdd, iconAddSolid, iconAddOutline, 
} from 'carbon-icons';
import { Add16 } from '@carbon/icons-react';

// This defines a modal controlled by a launcher button.
const ModalStateManager = ({
  renderLauncher: LauncherContent,
  children: ModalContent,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!ModalContent || typeof document === 'undefined'
        ? null
        : ReactDOM.createPortal(
            <ModalContent  
              open={open} 
              setOpen={setOpen} 
            />,
            document.body
          )
      }
      {LauncherContent && 
      <LauncherContent 
        open={open} 
        setOpen={setOpen} 
      />
      }
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
    label: 'Devices',
    title: 'Add device',
    iconDescription: 'Close',
  }),
  modalBody: () => ({
    hasScrollingContent: false,
    'aria-label': 'Add device',
  }),
  modalFooter: () => ({
    primaryButtonText: 'Save',
    primaryButtonDisabled: false,
    secondaryButtonText: 'Cancel',
    shouldCloseAfterSubmit: true,
    onRequestSubmit: (event) => { handleSubmit(event); }
  }),
};

// On submit we should be passed the values.
const handleSubmit = (code, model, version, loadDevices, setOpen) => {
  console.log('handleSubmit');
  console.log('code ' + code) ;
  console.log('model ' + model);
  console.log('version ' + version);

  axios.post(`/api/v1/devices`, { 
      'code': code, 
      'model': model, 
      'version': version
    }).then(res => {
      // TODO: Set success or error message
      console.log(res);
      console.log(res.data);

      // Refresh data
      loadDevices();

      // TODO: Check for error or success
      setOpen(false);
    }
  );

  return true;
}

class DevicesAddModal extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        row: props.row,
        loadDevices: props.loadDevices,
        code: '',
        model: '',
        version: '',
        open: false,
      }
      console.log(this.state.row);
    }

    render() {
      // const { open } = this.state.open;
      const { size, ...rest } = addProps.composedModal();
      const { hasScrollingContent, ...bodyProps } = addProps.modalBody();

      return (
        <ModalStateManager
          renderLauncher={({ setOpen }) => (
            <Button onClick={() => setOpen(true)} renderIcon={Add16}  iconDescription="Add device">Add device</Button>
          )}>
          {({ open, setOpen }) => (
            <ComposedModal
              {...rest}
              open={open}
              loadDevices={this.props.loadDevices}
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
                      placeholder="0001"
                      labelText="Code:"
                      onChange={(e) => this.state.code = e.target.value.trim()}
                    />
                    <br />
                    <TextInput
                      id={this.state.model}
                      value={this.state.model}
                      placeholder="model 1"
                      labelText="Model:"
                      onChange={(e) => this.state.model = e.target.value.trim()}
                    />
                    <br />
                    <TextInput
                      id={this.state.version}
                      value={this.state.version}
                      placeholder="1.0"
                      labelText="Version:"
                      onChange={(e) => this.state.version = e.target.value.trim()}
                    />
                  <br />
                  <br />
              </ModalBody>
              <ModalFooter {...addProps.modalFooter()} shouldCloseAfterSubmit={true} onRequestSubmit={() => { handleSubmit(this.state.code, this.state.first, this.state.last, this.state.email, this.state.loadDevices, setOpen); }} />
            </ComposedModal>
          )}
        </ModalStateManager>
      );
    }

  
}

export default DevicesAddModal;
