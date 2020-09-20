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
  Button
} from  'carbon-components-react';
import {
  Add20
} from "@carbon/icons-react/lib/add/20";

/**
 * Simple state manager for modals.
 */
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
    onRequestSubmit: (event) => { handleSubmit(event); }
  }),
};

const handleSubmit = event => {
  console.log('handleSubmit');
  event.preventDefault();

  axios.post(`/api/v1/firefighters`, { 
    id: document.getElementById('firefighter-id').value, 
    first: document.getElementById('firefighter-first').value, 
    last: document.getElementById('firefighter-last').value, 
    email: document.getElementById('firefighter-email').value 
    }).then(res => {
      console.log(res);
      console.log(res.data);
    }
  )
}

class FirefightersModal extends React.Component {

    state = {
      firefighter: {},
      open: false,
    }

    toggleModal = (open) => this.setState({ open });

    render() {
      // const { open } = this.state.open;
      // const { firefighter } = this.state.firefighter;
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
                    id="firefighter-id"
                    placeholder="GRAF001"
                    labelText="ID:"
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

    /*
    const modalProps = () => {
      return {
        className: 'some-class',
        disabled: false,
        passiveModal: false,
        danger: false,
        modalLabel: 'Firefighter',
        modalHeading: 'Add firefighter',
        selectorPrimaryFocus: '[data-modal-primary-focus]',
        primaryButtonText: 'Save',
        secondaryButtonText: 'Cancel',
        shouldCloseAfterSubmit: true,
        focusTrap:false,
      };
    };
    
    return (
      <Modal
        hasForm
        id="input-modal"
        handleSubmit={() => {
          alert('onSubmit');
          return true;
        }}
        {...modalProps()}>
        <TextInput
          id="test2"
          placeholder="Hint text here"
          labelText="First name:"
        />
        <br />
        <TextInput
          id="test3"
          placeholder="Hint text here"
          labelText="Last name:"
        />
        <br />
        <TextInput
          id="test4"
          placeholder="Hint text here"
          labelText="Email:"
        />
        <br />
        <br />
      </Modal>
    );
    */
  
}

export default FirefightersModal;
