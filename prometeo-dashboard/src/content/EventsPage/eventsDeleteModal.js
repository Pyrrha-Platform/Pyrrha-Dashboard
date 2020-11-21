import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
// import { settings } from 'carbon-components';
import {
  TextInput,
  ComposedModal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Icon,
} from "carbon-components-react";
import { iconDelete, iconDeleteSolid, iconDeleteOutline } from "carbon-icons";

// This defines a modal controlled by a launcher button. We have one per DataTable row.
const ModalStateManager = ({
  renderLauncher: LauncherContent,
  children: ModalContent,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!ModalContent || typeof document === "undefined"
        ? null
        : ReactDOM.createPortal(
            <ModalContent open={open} setOpen={setOpen} />,
            document.body
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
    selectorPrimaryFocus: "[data-modal-primary-focus]",
  }),
  modalHeader: ({ titleOnly, name } = {}) => ({
    label: "Events",
    title: "Delete event " + name + "?",
    iconDescription: "Close",
  }),
  modalBody: () => ({
    hasScrollingContent: false,
    "aria-label": "Delete event?",
  }),
  modalFooter: () => ({
    primaryButtonText: "Delete",
    primaryButtonDisabled: false,
    secondaryButtonText: "Cancel",
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
      margin: "5px",
    },
    icon: iconDelete,
    name: iconDelete,
    role: "img",
    fill: "grey",
    fillRule: "",
    width: "",
    height: "",
    description:
      "This is a description of the icon and what it does in context",
    iconTitle: "",
    className: "extra-class",
  }),
};

// On submit we should be passed the values, not have to look them up
const handleSubmit = (
  id,
  code,
  type,
  firefighters,
  state,
  loadEvents,
  setOpen
) => {
  console.log("handleSubmit");
  console.log("id " + id);
  console.log("code " + code);
  console.log("type " + type);
  console.log("firefighters " + firefighters);
  console.log("state " + state);

  axios
    .delete(`/api/v1/events/` + id, {
      id: id,
    })
    .then((res) => {
      // TODO: Set success or error message
      console.log(res);
      console.log(res.data);

      // Refresh data
      loadEvents();

      // TODO: Check for error or success
      setOpen(false);
    });

  return true;
};

// The implementation of the Modal
class EventsDeleteModal extends React.Component {
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
    };
    console.log(this.state.row);
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
        {({ open, setOpen }) => (
          <ComposedModal
            {...rest}
            open={open}
            row={this.props.row}
            loadEvents={this.props.loadEvents}
            size={size || undefined}
            onClose={() => setOpen(false)}
          >
            <ModalHeader
              {...deleteProps.modalHeader({
                titleOnly: true,
                name: this.state.code + " " + this.state.type,
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
                  this.state.type,
                  this.state.firefighters,
                  this.state.state,
                  this.state.loadEvents,
                  setOpen
                );
              }}
            />
          </ComposedModal>
        )}
      </ModalStateManager>
    );
  }
}

export default EventsDeleteModal;
