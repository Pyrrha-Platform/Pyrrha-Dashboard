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
    onRequestSubmit: (event) => { handleSubmit(event); }
  }),
};

// On submit we should be passed the values.
const handleSubmit = (code, type, firefighters, state, loadEvents, setOpen) => {
  console.log('handleSubmit');
  console.log('code ' + code) ;
  console.log('type ' + type);
  console.log('firefighters ' + firefighters);
  console.log('state ' + state);

  axios.post(`/api/v1/events`, { 
      'code': code, 
      'type': type, 
      'firefighters': firefighters, 
      'state': state 
    }).then(res => {
      // TODO: Set success or error message
      console.log(res);
      console.log(res.data);

      // Refresh data
      loadEvents();

      // TODO: Check for error or success
      setOpen(false);
    }
  );

  return true;
}

class EventsAddModal extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        row: props.row,
        loadEvents: props.loadEvents,
        code: '',
        first: '',
        last: '',
        email: '',
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
            <Button onClick={() => setOpen(true)}>Add event</Button>
          )}>
          {({ open, setOpen }) => (
            <ComposedModal
              {...rest}
              open={open}
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
                      placeholder="GRAF001"
                      labelText="Code:"
                      onChange={(e) => this.state.code = e.target.value.trim()}
                    />
                    <br />
                    <TextInput
                      id={this.state.type}
                      value={this.state.type}
                      placeholder=""
                      labelText="Type:"
                      onChange={(e) => this.state.type = e.target.value.trim()}
                    />
                    <br />
                    <TextInput
                      id={this.state.firefighters}
                      value={this.state.firefighters}
                      placeholder=""
                      labelText="Firefighters:"
                      onChange={(e) => this.state.firefighters = e.target.value.trim()}
                    />
                    <br />
                    <TextInput
                      id={this.state.state}
                      value={this.state.state}
                      placeholder=""
                      labelText="State:"
                      onChange={(e) => this.state.state = e.target.value.trim()}
                    />
                  <br />
                  <br />
              </ModalBody>
              <ModalFooter {...addProps.modalFooter()} shouldCloseAfterSubmit={true} onRequestSubmit={() => { handleSubmit(this.state.code, this.state.type, this.state.firefighters, this.state.state, this.state.loadEvents, setOpen); }} />
            </ComposedModal>
          )}
        </ModalStateManager>
      );
    }

  
}

export default EventsAddModal;
