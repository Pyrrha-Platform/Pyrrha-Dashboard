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

const DeviceInformationSidePanel = ({ sensor, onRequestClose }) => {
  const { t } = useContext(AppContext);

  const [testModalOpen, setTestModalOpen] = useState(false);

  return (
    <div className="device-side-panel">
      <Modal
        open={testModalOpen}
        modalHeading={t('content.device.sidePanel.modalTestTitle')}
        size="xs"
        secondaryButtonText={t('content.modal_basic.cancel')}
        primaryButtonText={t('content.modal_basic.confirm')}
        onRequestClose={() => setTestModalOpen(false)}
      >
        {t('content.device.sidePanel.modalTestText')}
      </Modal>
      <div className="device-side-panel__header">
        <h4
          className={`device-side-panel__title with-circle status-${sensor.statusColor}`}
          data-after="true"
        >
          Sensor {sensor.id}
        </h4>
        {sensor.isUserOwner && (
          <Tag className="tag-owner" tabIndex={0} aria-label="My sensor">
            My sensor
          </Tag>
        )}
        <button className="device-side-panel__close" onClick={onRequestClose}>
          <Close24 />
        </button>
      </div>
      <div className="device-side-panel__content">
        {/* Checks if current firmware version is greater than or equal to latest release in repo
        {currentFirmwareInfo.verNum &&
        semver.gt(currentFirmwareInfo.verNum, sensor.firmwareVer) &&
        !updating ? (
          <ToastNotification
            kind="info"
            caption=""
            subtitle={
              <button
                className={'device-side-panel__updateLink'}
                onClick={updateFirmware}>
                {t('content.device.sidePanel.updateNow')}
              </button>
            }
            timeout={0}
            hideCloseButton={true}
            title={
              t('content.device.sidePanel.newFirmwareAvailable') +
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
