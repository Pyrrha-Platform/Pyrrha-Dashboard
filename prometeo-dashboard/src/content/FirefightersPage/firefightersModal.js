import React from 'react';
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
    label: text('Optional Label (label in <ModalHeader>)', 'Optional Label'),
    title: text(
      'Optional title (title in <ModalHeader>)',
      titleOnly
        ? `
      Passive modal title as the message. Should be direct and 3 lines or less.
    `.trim()
        : 'Example'
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
      true
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
      ''
    ),
    onRequestClose: action('onRequestClose'),
    onRequestSubmit: action('onRequestSubmit'),
  }),
};


class FirefightersModal extends React.Component {

    state = { open: false };
    toggleModal = (open) => this.setState({ open });
    render() {
      const { open } = this.state;
      return (
        <>
          <Button renderIcon={Add20} onClick={() => this.toggleModal(true)}>Add firefighter</Button>
          <ComposedModal>
            <ModalHeader {...props.modalHeader({ titleOnly: true })} />
            <ModalBody />
            <ModalFooter {...props.modalFooter()} />
         </ComposedModal>
        </>
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
