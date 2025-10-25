import React, { useState, useContext } from 'react';
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
  Icon,
} from 'carbon-components-react';
import { iconDelete, iconDeleteSolid, iconDeleteOutline } from 'carbon-icons';
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
            document.body,
          )}
      {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
    </>
  );
};

// Modal properties
const deleteProps = {
  composedModal: ({ titleOnly } = {}) => ({
    open: true,
    danger: true,
    selectorPrimaryFocus: '[data-modal-primary-focus]',
  }),
  modalHeader: ({ titleOnly, name } = {}) => ({
    label: 'Firefighters',
    title: 'Delete firefighter ' + name + '?',
    iconDescription: 'Close',
  }),
  modalBody: () => ({
    hasScrollingContent: false,
    'aria-label': 'Delete firefighter?',
  }),
  modalFooter: () => ({
    primaryButtonText: 'Delete',
    primaryButtonDisabled: false,
    secondaryButtonText: 'Cancel',
    shouldCloseAfterSubmit: true,
    danger: true,
  }),
  menuItem: () => ({
    closeMenu: (event) => {
      handleSubmit(event);
    },
  }),
  deleteIcon: () => ({
    style: {
      margin: '5px',
    },
    icon: iconDelete,
    name: iconDelete,
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

// On submit we should be passed the values, not have to look them up
const handleSubmit = (
  id,
  code,
  first,
  last,
  email,
  loadFirefighters,
  setOpen,
) => {
  // console.log('handleSubmit');
  // console.log('id ' + id);
  // console.log('code ' + code);
  // console.log('first ' + first);
  // console.log('last ' + last);
  // console.log('email ' + email);

  axios
    .delete(`/api-main/v1/firefighters/` + id, {
      id: id,
    })
    .then((res) => {
      // TODO: Set success or error message
      // console.log(res);
      // console.log(res.data);

      // Refresh data
      loadFirefighters();

      // TODO: Check for error or success
      setOpen(false);
    });

  return true;
};

// The implementation of the Modal
class FirefightersDeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: props.row,
      loadFirefighters: props.loadFirefighters,
      id: this.props.row.cells[0].value,
      code: this.props.row.cells[1].value,
      first: this.props.row.cells[2].value,
      last: this.props.row.cells[3].value,
      email: this.props.row.cells[4].value,
      open: false,
    };
    // console.log(this.state.row);
  }

  render() {
    // const { open } = this.state.open;
    const { size, ...rest } = deleteProps.composedModal();
    const { hasScrollingContent, ...bodyProps } = deleteProps.modalBody();

    return (
      <ModalStateManager
        renderLauncher={({ setOpen }) => (
          <Icon
            {...deleteProps.deleteIcon()}
            onClick={() => setOpen(true)}
            title={this.state.id}
          />
        )}
      >
        {({ open, setOpen, t }) => (
          <ComposedModal
            {...rest}
            open={open}
            t={t}
            row={this.props.row}
            loadFirefighters={this.props.loadFirefighters}
            size={size || undefined}
            onClose={() => setOpen(false)}
          >
            <ModalHeader
              {...deleteProps.modalHeader({
                titleOnly: true,
                name: this.state.first + ' ' + this.state.last,
              })}
            />
            <ModalBody />
            <ModalFooter
              {...deleteProps.modalFooter()}
              shouldCloseAfterSubmit={true}
              onRequestSubmit={() => {
                handleSubmit(
                  this.state.id,
                  this.state.code,
                  this.state.first,
                  this.state.last,
                  this.state.email,
                  this.state.loadFirefighters,
                  setOpen,
                );
              }}
            />
          </ComposedModal>
        )}
      </ModalStateManager>
    );
  }
}

export default FirefightersDeleteModal;
