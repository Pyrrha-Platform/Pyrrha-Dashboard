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
    label: 'Firefighters',
    title: 'Add firefighter',
    iconDescription: 'Close',
  }),
  modalBody: () => ({
    hasScrollingContent: false,
    'aria-label': 'Add firefighter',
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
const handleSubmit = (id, first, last, email, setOpen) => {
  console.log('handleSubmit');
  console.log('id ' + id) ;
  console.log('first ' + first);
  console.log('last ' + last);
  console.log('email ' + email);

  axios.post(`/api/v1/firefighters`, { 
      'id': id, 
      'first': first, 
      'last': last, 
      'email': email 
    }).then(res => {
      // TODO: Set success or error message
      // TODO: Add data to table (or let it redraw)
      console.log(res);
      console.log(res.data);
      // TODO: Check for error or success
      // TODO: Clear form back to default values
      setOpen(false);
    }
  );

  return true;
}

class NewFirefightersAddModal extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        row: props.row,
        id: '',
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
            <Button onClick={() => setOpen(true)}>Add firefighter</Button>
          )}>
          {({ open, setOpen }) => (
            <ComposedModal
              {...rest}
              open={open}
              size={size || undefined}
              onClose={() => setOpen(false)}>
              <ModalHeader {...addProps.modalHeader()} />
              <ModalBody
                {...bodyProps}
                aria-label={hasScrollingContent ? 'Modal content' : undefined}>
                  <br />
                    <TextInput
                      id={this.state.id}
                      value={this.state.id}
                      placeholder="GRAF001"
                      labelText="ID:"
                      onChange={(e) => this.state.id = e.target.value.trim()}
                    />
                    <br />
                    <TextInput
                      id={this.state.first}
                      value={this.state.first}
                      placeholder="Joan"
                      labelText="First name:"
                      onChange={(e) => this.state.first = e.target.value.trim()}
                    />
                    <br />
                    <TextInput
                      id={this.state.last}
                      value={this.state.last}
                      placeholder="Herrera"
                      labelText="Last name:"
                      onChange={(e) => this.state.last = e.target.value.trim()}
                    />
                    <br />
                    <TextInput
                      id={this.state.email}
                      value={this.state.email}
                      placeholder="graf004@graf.cat"
                      labelText="Email:"
                      onChange={(e) => this.state.email = e.target.value.trim()}
                    />
                  <br />
                  <br />
              </ModalBody>
              <ModalFooter {...addProps.modalFooter()} shouldCloseAfterSubmit={true} onRequestSubmit={() => { handleSubmit(this.state.id, this.state.first, this.state.last, this.state.email, setOpen); }} />
            </ComposedModal>
          )}
        </ModalStateManager>
      );
    }

  
}

export default NewFirefightersAddModal;
