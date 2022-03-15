import { Close24, ConnectionSignal32, Restart32 } from '@carbon/icons-react';
import Tag from 'carbon-components-react/lib/components/Tag/Tag';
import {
  Loading,
  Modal,
  InlineNotification,
  ToastNotification,
} from 'carbon-components-react';

import React, { useContext, useState } from 'react';
import AppContext from '../../context/app';

const DeviceInformationSidePanel = ({ device, onRequestClose }) => {
  const { t } = useContext(AppContext);

  const [testModalOpen, setTestModalOpen] = useState(false);

  return (
    <div className="device-side-panel">
      <Modal
        open={testModalOpen}
        modalHeading={t('content.devices.sidePanel.modalTestTitle')}
        size="xs"
        secondaryButtonText={t('content.modal_basic.cancel')}
        primaryButtonText={t('content.modal_basic.confirm')}
        onRequestClose={() => setTestModalOpen(false)}
      >
        {t('content.devices.sidePanel.modalTestText')}
      </Modal>
      <div className="device-side-panel__header">
        <h4
          className={`device-side-panel__title with-circle status-${device.statusColor}`}
          data-after="true"
        >
          Device {device.id}
        </h4>
        {device.isUserOwner && (
          <Tag className="tag-owner" tabIndex={0} aria-label="My device">
            My device
          </Tag>
        )}
        <button className="device-side-panel__close" onClick={onRequestClose}>
          <Close24 />
        </button>
      </div>
      <div className="device-side-panel__content">
        {/* Checks if current firmware version is greater than or equal to latest release in repo
        {currentFirmwareInfo.verNum &&
        semver.gt(currentFirmwareInfo.verNum, device.firmwareVer) &&
        !updating ? (
          <ToastNotification
            kind="info"
            caption=""
            subtitle={
              <button
                className={'device-side-panel__updateLink'}
                onClick={updateFirmware}>
                {t('content.devices.sidePanel.updateNow')}
              </button>
            }
            timeout={0}
            hideCloseButton={true}
            title={
              t('content.devices.sidePanel.newFirmwareAvailable') +
              ` (v${currentFirmwareInfo.verNum})`
            }
          />
        ) : null}
         */}
      </div>
    </div>
  );
};

export default DeviceInformationSidePanel;
