import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { settings } from 'carbon-components';
import {
  Modal,
  TextInput,
  ComposedModal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button
} from  'carbon-components-react';
import {
  Edit20,
  Delete20,
  Add20
} from "@carbon/icons-react/lib/add/20";
import { Query } from 'react-apollo';
import API from '../../api-client/api';

const addFirefighter = (id) => {

}


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

const { prefix } = settings;

const sizes = {
  Default: '',
  'Extra small (xs)': 'xs',
  'Small (sm)': 'sm',
  'Large (lg)': 'lg',
};

const props = {
  composedModal: ({ titleOnly } = {}) => ({
    open: boolean('Open (open in <ComposedModal>)', true),
    onKeyDown: action('onKeyDown'),
    danger: boolean('Danger mode (danger)', false),
    selectorPrimaryFocus: text(
      'Primary focus element selector (selectorPrimaryFocus)',
      '[data-modal-primary-focus]'
    ),
    size: select('Size (size)', sizes, titleOnly ? 'sm' : ''),
  }),
  modalHeader: ({ titleOnly } = {}) => ({
    label: text('Optional Label (label in <ModalHeader>)', 'Firefighters'),
    title: text(
      'Optional title (title in <ModalHeader>)',
      titleOnly
        ? `
      Passive modal title as the message. Should be direct and 3 lines or less.
    `.trim()
        : 'Add firefighter'
    ),
    iconDescription: text(
      'Close icon description (iconDescription in <ModalHeader>)',
      'Close'
    ),
    buttonOnClick: action('buttonOnClick'),
  }),
  modalBody: () => ({
    hasScrollingContent: boolean(
      'Modal contains scrollable content (hasScrollingContent)',
      false
    ),
    'aria-label': text('ARIA label for content', 'Example modal content'),
  }),
  modalFooter: () => ({
    primaryButtonText: text(
      'Primary button text (primaryButtonText in <ModalFooter>)',
      'Save'
    ),
    primaryButtonDisabled: boolean(
      'Primary button disabled (primaryButtonDisabled in <ModalFooter>)',
      false
    ),
    secondaryButtonText: text(
      'Secondary button text (secondaryButtonText in <ModalFooter>)',
      'Cancel'
    ),
    onRequestClose: action('onRequestClose'),
    onRequestSubmit: addFirefighter,
  }),
};


class FirefightersModal extends React.Component {

    state = { open: false };
    toggleModal = (open) => this.setState({ open });
    render() {
      const { open } = this.state;
      const { size, ...rest } = props.composedModal();
      const { hasScrollingContent, ...bodyProps } = props.modalBody();
      console.log('In render() ' + open);
      return (
        <ModalStateManager
          renderLauncher={({ setOpen }) => (
            <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
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
                  <TextInput
                    id="test2"
                    placeholder="Joan"
                    labelText="First name:"
                  />
                  <br />
                  <TextInput
                    id="test3"
                    placeholder="Herrera"
                    labelText="Last name:"
                  />
                  <br />
                  <TextInput
                    id="test4"
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
