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
  Add20
} from "@carbon/icons-react/lib/add/20";

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
            <ModalContent open={open} setOpen={setOpen} />,
            document.body
          )}
      {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
    </>
  );
};

// const { prefix } = settings;

const props = {
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

const handleSubmit = event => {
  console.log('handleSubmit');

  axios.post(`/api/v1/firefighters`, { 
      code: document.getElementById('firefighter-code').code, 
      first: document.getElementById('firefighter-first').value, 
      last: document.getElementById('firefighter-last').value, 
      email: document.getElementById('firefighter-email').value 
    }).then(res => {
      // TODO: Set success message
      // TODO: Add data to table
      // TODO: Close modal
      console.log(res);
      console.log(res.data);
    }
  );

  return true;
}

class FirefightersModal extends React.Component {

    state = {
      open: false,
    }

    toggleModal = (open) => this.setState({ open });

    render() {
      // const { open } = this.state.open;
      const { size, ...rest } = props.composedModal();
      const { hasScrollingContent, ...bodyProps } = props.modalBody();

      return (
        <ModalStateManager
          renderLauncher={({ setOpen }) => (
            <Button renderIcon={Add20} onClick={() => setOpen(true)}>Add firefighter</Button>
          )}>
          {({ open, setOpen }) => (
            <ComposedModal
              {...rest}
              open={open}
              size={size || undefined}
              onClose={() => setOpen(false)}>
              <ModalHeader {...props.modalHeader()} />
              <ModalBody
                {...bodyProps}
                aria-label={hasScrollingContent ? 'Modal content' : undefined}>
                  <br />
                  <TextInput
                    id="firefighter-code"
                    placeholder="GRAF001"
                    labelText="Code:"
                  />
                  <br />
                  <TextInput
                    id="firefighter-first"
                    placeholder="Joan"
                    labelText="First name:"
                  />
                  <br />
                  <TextInput
                    id="firefighter-last"
                    placeholder="Herrera"
                    labelText="Last name:"
                  />
                  <br />
                  <TextInput
                    id="firefighter-email"
                    placeholder="graf001@graf.cat"
                    labelText="Email:"
                  />
                  <br />
                  <br />
              </ModalBody>
              <ModalFooter {...props.modalFooter()} />
            </ComposedModal>
          )}
        </ModalStateManager>
      );
    }

  
}

export default FirefightersModal;
