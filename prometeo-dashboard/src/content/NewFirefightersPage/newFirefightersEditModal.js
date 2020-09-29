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
  OverflowMenu,
  OverflowMenuItem,
  Button
} from  'carbon-components-react';
import {
  Edit20,
  Delete20
} from "@carbon/icons-react/lib/edit/20";

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

const editProps = {
  composedModal: ({ titleOnly } = {}) => ({
    open: true,
    danger: false,
    selectorPrimaryFocus: '[data-modal-primary-focus]',
  }),
  modalHeader: ({ titleOnly } = {}) => ({
    label: 'Firefighters',
    title: 'Edit firefighter',
    iconDescription: 'Close',
  }),
  modalBody: () => ({
    hasScrollingContent: false,
    'aria-label': 'Edit firefighter',
  }),
  modalFooter: () => ({
    primaryButtonText: 'Save',
    primaryButtonDisabled: false,
    secondaryButtonText: 'Cancel',
    shouldCloseAfterSubmit: true,
    onRequestSubmit: (event) => { handleSubmit(event); }
  }),
  menuItem: () => ({
    closeMenu: (event) => { handleSubmit(event); }
  }),
};



const handleSubmit = event => {
  console.log('handleSubmit');

  axios.put(`/api/v1/firefighters/` + document.getElementById('firefighter-id').value, { 
      id: document.getElementById('edit-firefighter-id').value, 
      first: document.getElementById('edit-firefighter-first').value, 
      last: document.getElementById('edit-firefighter-last').value, 
      email: document.getElementById('edit-firefighter-email').value 
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

class NewFirefightersEditModal extends React.Component {

  state = {
    open: false,
  }

  toggleModal = (open) => this.setState({ open });

  render() {
    // const { open } = this.state.open;
    const { size, ...rest } = editProps.composedModal();
    const { hasScrollingContent, ...bodyProps } = editProps.modalBody();

    return (
      <ModalStateManager
        renderLauncher={({ setOpen }) => (
          <button onClick={() => setOpen(true)}>Edit</button>
        )}>
        {({ open, setOpen }) => (
          <ComposedModal
            {...rest}
            open={open}
            size={size || undefined}
            onClose={() => setOpen(false)}>
            <ModalHeader {...editProps.modalHeader()} />
            <ModalBody
              {...bodyProps}
              aria-label={hasScrollingContent ? 'Modal content' : undefined}>
                <br />
                <TextInput
                  id="edit-firefighter-id"
                  placeholder="GRAF001"
                  labelText="ID:"
                />
                <br />
                <TextInput
                  id="edit-firefighter-first"
                  placeholder="Joan"
                  labelText="First name:"
                />
                <br />
                <TextInput
                  id="edit-firefighter-last"
                  placeholder="Herrera"
                  labelText="Last name:"
                />
                <br />
                <TextInput
                  id="edit-firefighter-email"
                  placeholder="graf001@graf.cat"
                  labelText="Email:"
                />
                <br />
                <br />
            </ModalBody>
            <ModalFooter {...editProps.modalFooter()} />
          </ComposedModal>
        )}
      </ModalStateManager>
    );
  }

  
}

export default NewFirefightersEditModal;
