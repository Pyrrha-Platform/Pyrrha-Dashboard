import headers from './headers';
import Constants from '../../utils/Constants';
import Utils from '../../utils/Utils';
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandedRow,
  TableExpandHeader,
  TableExpandRow,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Pagination,
  Modal,
  Loading,
} from 'carbon-components-react';

import DeviceOverflowMenu from './DeviceOverflowMenu';
import React, { Fragment, useContext, useEffect } from 'react';
import DeviceInformationSidePanel from '../DeviceInformationSidePanel';
import DeviceDetailMap from '../DeviceDetailMap';
import AppContext from '../../context/app';

const timeAgo = Utils.timeAgo;

const formatRows = (rows) =>
  rows.map((row) => {
    // console.log('formatRows row', row);
    const rowCopy = { ...row };
    rowCopy['id'] = '' + rowCopy['id'];
    rowCopy['device_version'] = 'V' + rowCopy['device_version'];
    rowCopy['connection_type'] = 'Wi-Fi';
    rowCopy['pos'] = rowCopy['latitude']
      ? [rowCopy['latitude'], rowCopy['longitude']]
      : 'Unavailable';
    rowCopy['lastCheckin'] = timeAgo.format(
      new Date(rowCopy['timestamp_mins']),
    );
    rowCopy['lastCheckinRaw'] = new Date(rowCopy['timestamp_mins']);

    // rowCopy['peak_acc'] += ' gals'
    // console.log('formatRows rowCopy', rowCopy);
    return rowCopy;
  });

const getDeviceStatus = (timeAgo) => {
  if (!timeAgo) {
    return 'with-circle status-yellow';
  }

  const timeSegment = timeAgo.split(' ')[1].replace('s', '');

  if (['week', 'month', 'year'].includes(timeSegment)) {
    return 'with-circle status-yellow';
  }

  return 'with-circle status-green';
};

const getStatus = (type, value, increment) => {
  const color = Utils.getStatusColor(type, value, increment, 0);
  if (color == Constants.RED) {
    return 'with-circle status-red';
  } else if (color == Constants.YELLOW) {
    return 'with-circle status-yellow';
  } else {
    return 'with-circle status-green';
  }
};

// Index depends on what header position it's in
const getRowClasses = (cell, indexCells) => {
  if (indexCells === 1) {
    return getDeviceStatus(cell.value);
  } else if (indexCells === 3) {
    return getStatus('CO', cell.value, 'now');
  } else if (indexCells === 4) {
    return getStatus('NO2', cell.value, 'now');
  } else if (indexCells === 5) {
    return getStatus('Tmp', cell.value, 'now');
  } else if (indexCells === 6) {
    return getStatus('Hum', cell.value, 'now');
  }
};

const DeviceTable = ({
  loading,
  navigate,
  devices,
  setDevices,
  page,
  pageSize,
  onPaginationChange,
  currentlyVisibleDevices,
  shouldShowSideMenu,
  setShouldShowSideMenu,
  shouldShowRemoveMenu,
  setShouldShowRemoveMenu,
  removeDeviceLoading,
  displayedDevice,
  removeDevice,
  onModify,
  onRemove,
  onDeviceHover,
  currentHoveredDevice,
}) => {
  const { t } = useContext(AppContext);

  // console.log('DeviceTable devices', devices);
  // console.log('DeviceTable currentlyVisibleDevices', currentlyVisibleDevices);
  // console.log('DeviceTable loading', loading);

  useEffect(() => {
    document.body.className = shouldShowSideMenu ? 'body-no-scroll' : '';
  }, [shouldShowSideMenu]);

  const onSideMenuClose = () => setShouldShowSideMenu(false);

  return (
    <>
      {shouldShowSideMenu && (
        <DeviceInformationSidePanel
          device={displayedDevice}
          onRequestClose={onSideMenuClose}
        />
      )}
      <Modal
        open={shouldShowRemoveMenu}
        modalHeading={t('content.devices.deviceRemoveModal.removeDevice')}
        size="xs"
        secondaryButtonText={t('content.common.cancel')}
        primaryButtonText={t('content.common.confirm')}
        onRequestClose={() => setShouldShowRemoveMenu(false)}
        onRequestSubmit={removeDevice}
      >
        {removeDeviceLoading ? <Loading /> : null}
        <p>{t('content.devices.deviceRemoveModal.removeDeviceText')}</p>
        <p className="mart-1">
          {t('content.devices.deviceRemoveModal.removeDeviceAdditional')}
        </p>
      </Modal>
      <DataTable
        rows={formatRows(currentlyVisibleDevices)}
        headers={headers}
        className="device-table"
      >
        {({
          rows,
          headers,
          getRowProps,
          getHeaderProps,
          getTableProps,
          getTableContainerProps,
          getToolbarProps,
          onInputChange,
        }) => (
          <TableContainer {...getTableContainerProps()}>
            <TableToolbar
              {...getToolbarProps()}
              aria-label="data table toolbar"
              size="small"
            >
              <TableToolbarContent>
                <TableToolbarSearch
                  expanded={true}
                  onChange={onInputChange}
                  placeholder="Search by Device ID"
                />
              </TableToolbarContent>
            </TableToolbar>
            <Table
              {...getTableProps()}
              overflowMenuOnHover={false}
              tabIndex={0}
              aria-label={'table'}
            >
              <TableHead>
                <TableRow>
                  <TableExpandHeader />
                  {headers.map((header, headerIndex) => (
                    <TableHeader
                      {...getHeaderProps({ header })}
                      tabIndex={0}
                      aria-label={`Header ${header.header}`}
                      key={`header-${header.header}`}
                      className={
                        headerIndex === 0 ? 'sticky-column left' : undefined
                      }
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                  <TableHeader />
                </TableRow>
              </TableHead>

              <TableBody>
                {rows
                  // Make sure we don't try to display more than possible
                  .filter(
                    (_, rowIndex) =>
                      (page - 1) * pageSize + rowIndex < devices.length,
                  )
                  .map((row, rowIndex) => {
                    const deviceIndex = (page - 1) * pageSize + rowIndex;

                    return (
                      <Fragment key={row.id}>
                        <TableExpandRow
                          {...getRowProps({ row })}
                          data-hovered={currentHoveredDevice === deviceIndex}
                          onMouseEnter={() => onDeviceHover(deviceIndex)}
                          onMouseLeave={() => onDeviceHover(undefined)}
                        >
                          {loading
                            ? null
                            : row.cells.map((cell, indexCells) => (
                                <TableCell
                                  key={cell.id}
                                  className={
                                    indexCells === 0
                                      ? 'sticky-column left'
                                      : undefined
                                  }
                                >
                                  <span
                                    tabIndex={0}
                                    className={getRowClasses(cell, indexCells)}
                                    aria-label={`${headers[indexCells].header} is ${cell.value}`}
                                  >
                                    {indexCells === 0
                                      ? cell.value
                                      : Array.isArray(cell.value)
                                        ? Utils.formatCoordinates(cell.value)
                                        : cell.value}
                                  </span>
                                  {/*indexCells === 0 &&
                                    devices[deviceIndex].isUserOwner && (
                                      <Tag
                                        className="tag-owner"
                                        tabIndex={0}
                                        aria-label="My device"
                                      >
                                        My device
                                      </Tag>
                                    )*/}
                                </TableCell>
                              ))}
                          {/*devices[deviceIndex].isUserOwner ? (
                            <DeviceOverflowMenu
                              id={row.id}
                              device={
                                formatRows(currentlyVisibleDevices)[rowIndex]
                              }
                              onModify={onModify}
                              onRemove={onRemove}
                            />
                          ) : (
                            <TableCell className="sticky-column right" />
                          )*/}
                          <TableCell className="sticky-column right" />
                        </TableExpandRow>
                        <TableExpandedRow
                          colSpan={headers.length + 2}
                          className="device-expandable-row"
                        >
                          <div className="device-chart" tabIndex={0}>
                            <DeviceDetailMap device={devices[deviceIndex]} />
                          </div>
                        </TableExpandedRow>
                      </Fragment>
                    );
                  })}
              </TableBody>
            </Table>
            <Pagination
              backwardText="Previous page"
              forwardText="Next page"
              itemsPerPageText="Items per page:"
              page={1}
              pageNumberText="Page Number"
              pageSize={5}
              onChange={onPaginationChange}
              pageSizes={[5, 10, 15]}
              totalItems={devices.length}
            />
          </TableContainer>
        )}
      </DataTable>
    </>
  );
};

export default DeviceTable;
