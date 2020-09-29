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
  Edit20,
  Delete20
} from "@carbon/icons-react/lib/edit/20";

const ModalStateManager = ({
  renderLauncher: LauncherContent,
  children: ModalContent,
}) => {
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState(false);
  const [id, setId] = useState(false);
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);
  const [email, setEmail] = useState(false);
  return (
    <>
      {!ModalContent || typeof document === 'undefined'
        ? null
        : ReactDOM.createPortal(
            <ModalContent open={open} setOpen={setOpen} />,
            document.body
          )}
      {LauncherContent && <LauncherContent 
        open={open} 
        setOpen={setOpen} 
        row={row} 
        setRow={setRow} 
        id={id} 
        setId={setId} 
        first={first} 
        setFirst={setFirst} 
        last={last} 
        setLast={setLast} 
        email={email} 
        setEmail={setEmail} 
        />
      }
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

  constructor(props) {
    super(props);
    this.state = {
      row: props.row,
      open: false,
    }
    console.log(this.state.row);
  }

  toggleModal = (open) => this.setState({ open });

  render() {
    // const { open } = this.state.open;
    const { size, ...rest } = editProps.composedModal();
    const { hasScrollingContent, ...bodyProps } = editProps.modalBody();

    return (
      <ModalStateManager
        renderLauncher={({ open, setOpen, row, setRow, id, setId, first, setFirst, last, setLast, email, setEmail}) => (
          <button onClick={() => setOpen(true)}>Edit {this.props.row.id}</button>
        )}>
        {({ open, setOpen, row, setRow, id, setId, first, setFirst, last, setLast, email, setEmail }) => (
          <ComposedModal
            {...rest}
            open={open}
            row={this.props.row}
            size={size || undefined}
            onClose={() => setOpen(false)}>
            <ModalHeader {...editProps.modalHeader()} />
            <ModalBody
              {...bodyProps}
              aria-label={hasScrollingContent ? 'Modal content' : undefined}>
                <br />
                <TextInput
                  id={"edit-firefighter-id-" + this.props.row.cells[0].value}
                  placeholder={this.props.row.cells[0].value}
                  labelText="ID:"
                />
                <br />
                <TextInput
                  id={"edit-firefighter-first-" + this.props.row.cells[1].value}
                  placeholder={this.props.row.cells[1].value}
                  labelText="First name:"
                />
                <br />
                <TextInput
                  id={"edit-firefighter-last-" + this.props.row.cells[2].value}
                  placeholder={this.props.row.cells[2].value}
                  labelText="Last name:"
                />
                <br />
                <TextInput
                  id={"edit-firefighter-email-" + this.props.row.cells[3].value}
                  placeholder={this.props.row.cells[3].value}
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
