import React, { useState, useContext } from "react";
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
import { iconEdit, iconEditSolid, iconEditOutline } from "carbon-icons";
import Context from "../../context/app";

// This defines a modal controlled by a launcher button. We have one per DataTable row.
const ModalStateManager = ({
  renderLauncher: LauncherContent,
  children: ModalContent,
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useContext(Context);
  return (
    <>
      {!ModalContent || typeof document === "undefined"
        ? null
        : ReactDOM.createPortal(
            <ModalContent open={open} setOpen={setOpen} t={t} />,
            document.body
          )}
      {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
    </>
  );
};

// Modal properties
const editProps = {
  composedModal: ({ titleOnly } = {}) => ({
    open: true,
    danger: false,
    selectorPrimaryFocus: "[data-modal-primary-focus]",
  }),
  modalHeader: ({ titleOnly } = {}) => ({
    label: "Firefighters",
    title: "Edit firefighter",
    iconDescription: "Close",
  }),
  modalBody: () => ({
    hasScrollingContent: false,
    "aria-label": "Edit firefighter",
  }),
  modalFooter: () => ({
    primaryButtonText: "Save",
    primaryButtonDisabled: false,
    secondaryButtonText: "Cancel",
    shouldCloseAfterSubmit: true,
  }),
  menuItem: () => ({
    closeMenu: (event) => {
      handleSubmit(event);
    },
  }),
  editIcon: () => ({
    style: {
      margin: "5px",
    },
    icon: iconEdit,
    name: iconEdit,
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

// On submit we should be passed the values.
const handleSubmit = (
  id,
  code,
  first,
  last,
  email,
  loadFirefighters,
  setOpen
) => {
  console.log("handleSubmit");
  console.log("id " + id);
  console.log("code " + code);
  console.log("first " + first);
  console.log("last " + last);
  console.log("email " + email);

  axios
    .put(`/api/v1/firefighters/` + id, {
      id: id,
      code: code,
      first: first,
      last: last,
      email: email,
    })
    .then((res) => {
      // TODO: Set success or error message
      console.log(res);
      console.log(res.data);

      // Refresh data
      loadFirefighters();

      // TODO: Check for error or success
      setOpen(false);
    });

  return true;
};

// The implementation of the Modal
class FirefightersEditModal extends React.Component {
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
    console.log(this.state.row);
  }

  render() {
    // const { open } = this.state.open;
    const { size, ...rest } = editProps.composedModal();
    const { hasScrollingContent, ...bodyProps } = editProps.modalBody();

    return (
      <ModalStateManager
        renderLauncher={({ setOpen }) => (
          <Icon
            {...editProps.editIcon()}
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
            <ModalHeader {...editProps.modalHeader()} />
            <ModalBody
              {...bodyProps}
              aria-label={hasScrollingContent ? "Modal content" : undefined}
            >
              <br />
              <TextInput
                id={this.state.code}
                value={this.state.code}
                labelText={t("content.firefighters.code") + ":"}
                onChange={(e) => (this.state.code = e.target.value.trim())}
              />
              <br />
              <TextInput
                id={this.state.first}
                value={this.state.first}
                labelText={t("content.firefighters.first") + ":"}
                onChange={(e) => (this.state.first = e.target.value.trim())}
              />
              <br />
              <TextInput
                id={this.state.last}
                value={this.state.last}
                labelText={t("content.firefighters.last") + ":"}
                onChange={(e) => (this.state.last = e.target.value.trim())}
              />
              <br />
              <TextInput
                id={this.state.email}
                value={this.state.email}
                labelText={t("content.firefighters.email") + ":"}
                onChange={(e) => (this.state.email = e.target.value.trim())}
              />
              <br />
              <br />
            </ModalBody>
            <ModalFooter
              {...editProps.modalFooter()}
              shouldCloseAfterSubmit={true}
              onRequestSubmit={() => {
                handleSubmit(
                  this.state.id,
                  this.state.code,
                  this.state.first,
                  this.state.last,
                  this.state.email,
                  this.state.loadFirefighters,
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

export default FirefightersEditModal;
