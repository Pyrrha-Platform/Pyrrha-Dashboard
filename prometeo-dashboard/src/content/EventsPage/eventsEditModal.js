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

// On submit we should be passed the values.
const handleSubmit = (id, code, type, state, firefighters, loadEvents, setOpen) => {
  console.log('handleSubmit');
  console.log('id ' + id) ;
  console.log('code ' + code) ;
  console.log('type ' + type);
  console.log('firefighters ' + firefighters);
  console.log('state ' + state);

  axios.put(`/api/v1/events/` + id, { 
      'id': id, 
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
      firefighters: this.props.row.cells[3].value,
      state: this.props.row.cells[4].value,
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
            loadEvents={this.props.loadEvents}
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
                  placeholder={this.state.code}
                  labelText="Code:"
                  onChange={(e) => this.state.code = e.target.value.trim()}
                />
                <br />
                <TextInput
                  id={this.state.type}
                  value={this.state.type}
                  placeholder={this.state.type}
                  labelText="Type:"
                  onChange={(e) => this.state.type = e.target.value.trim()}
                />
                <br />
                <TextInput
                  id={this.state.firefighters}
                  value={this.state.firefighters}
                  placeholder={this.state.firefighters}
                  labelText="Firefighters:"
                  onChange={(e) => this.state.firefighters = e.target.value.trim()}
                />
                <br />
                <TextInput
                  id={this.state.state}
                  value={this.state.state}
                  placeholder={this.state.state}
                  labelText="State:"
                  onChange={(e) => this.state.state = e.target.value.trim()}
                />
                <br />
                <br />
            </ModalBody>
            <ModalFooter {...editProps.modalFooter()} shouldCloseAfterSubmit={true} onRequestSubmit={() => { handleSubmit(this.state.id, this.state.code, this.state.type, this.state.firefighters, this.state.state, this.state.loadEvents, setOpen); }} />
          </ComposedModal>
        )}
      </ModalStateManager>
    );
  }

  
}

export default EventsEditModal;
