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
  Icon
} from  'carbon-components-react';
import { 
  iconEdit, iconEditSolid, iconEditOutline, 
} from 'carbon-icons';

// This defines a modal controlled by a launcher button. We have one per DataTable row.
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

// Modal properties
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
  }),
  menuItem: () => ({
    closeMenu: (event) => { handleSubmit(event); }
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
    description: 'This is a description of the icon and what it does in context',
    iconTitle: '',
    className: 'extra-class',
  }),
};

// On submit we should be passed the values, not have to look them up
const handleSubmit = (id, first, last, email, setOpen) => {
  console.log('handleSubmit');
  console.log('id ' + id) ;
  console.log('first ' + first);
  console.log('last ' + last);
  console.log('email ' + email);

  axios.put(`/api/v1/firefighters/` + id, { 
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
      setOpen(false);
    }
  );

  return true;
}

// The implementation of the Modal
class NewFirefightersEditModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      row: props.row,
      id: this.props.row.cells[0].value,
      first: this.props.row.cells[1].value,
      last: this.props.row.cells[2].value,
      email: this.props.row.cells[3].value,
      open: false,
    }
    console.log(this.state.row);
  }

  render() {
    // const { open } = this.state.open;
    const { size, ...rest } = editProps.composedModal();
    const { hasScrollingContent, ...bodyProps } = editProps.modalBody();

    return (
      <ModalStateManager
        renderLauncher={({ setOpen }) => (
          <Icon {...editProps.editIcon()} onClick={() => setOpen(true)} title={this.state.id} />
        )}>
        {({ open, setOpen }) => (
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
                  id={this.state.id}
                  value={this.state.id}
                  placeholder={this.state.id}
                  labelText="ID:"
                  onChange={(e) => this.state.id = e.target.value.trim()}
                />
                <br />
                <TextInput
                  id={this.state.first}
                  value={this.state.first}
                  placeholder={this.state.first}
                  labelText="First name:"
                  onChange={(e) => this.state.first = e.target.value.trim()}
                />
                <br />
                <TextInput
                  id={this.state.last}
                  value={this.state.last}
                  placeholder={this.state.last}
                  labelText="Last name:"
                  onChange={(e) => this.state.last = e.target.value.trim()}
                />
                <br />
                <TextInput
                  id={this.state.email}
                  value={this.state.email}
                  placeholder={this.state.email}
                  labelText="Email:"
                  onChange={(e) => this.state.email = e.target.value.trim()}
                />
                <br />
                <br />
            </ModalBody>
            <ModalFooter {...editProps.modalFooter()} shouldCloseAfterSubmit={true} onRequestSubmit={() => { handleSubmit(this.state.id, this.state.first, this.state.last, this.state.email, setOpen); }} />
          </ComposedModal>
        )}
      </ModalStateManager>
    );
  }

  
}

export default NewFirefightersEditModal;
