import React, { useContext } from 'react';
import { TableCell, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import AppContext from '../../context/app';

const DeviceOverflowMenu = ({ id, device, onModify, onRemove }) => {
  const { t } = useContext(AppContext);

  return (
    <TableCell key={id + '-overflow'} className="sticky-column right">
      <OverflowMenu style={{ float: 'right' }} flipped>
        <OverflowMenuItem
          itemText={t('content.devices.rowOverflow.interact')}
          onClick={() => onModify(device)}
        />
        <OverflowMenuItem
          itemText={t('content.devices.rowOverflow.remove')}
          onClick={() => onRemove(device)}
        />
      </OverflowMenu>
    </TableCell>
  );
};

export default DeviceOverflowMenu;
