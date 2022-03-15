import headers from './headers';
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
import Tag from 'carbon-components-react/lib/components/Tag/Tag';

import Utils from '../../utils/Utils';
import DeviceInformationSidePanel from '../DeviceInformationSidePanel';
import AppContext from '../../context/app';

const formatRows = (rows) =>
  rows.map((row) => {
    let rowCopy = { ...row };
    rowCopy['id'] = '' + rowCopy['id'];
    rowCopy['device_version'] = 'V' + rowCopy['device_version'];
    rowCopy['connection_type'] = 'Wi-Fi';
    rowCopy['pos'] = rowCopy['latitude']
      ? `${rowCopy['latitude']} ${rowCopy['longitude']}`
      : 'Unavailable';
    rowCopy['lastCheckin'] = timeAgo.format(new Date(rowCopy['lastCheckin']));
    rowCopy['lastCheckinRaw'] = new Date(rowCopy['lastCheckin']);
    rowCopy['isUserOwner'] = new Date(rowCopy['isUserOwner']);

    // rowCopy['peak_acc'] += ' gals'
    return rowCopy;
  });

let formatCoordinates = Utils.formatCoordinates;
let timeAgo = Utils.timeAgo;

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

const getRowClasses = (cell, indexCells) => {
  if (indexCells === 1) {
    return getDeviceStatus(cell.value);
  }
};

const DeviceTable = ({
  loading,
  devices,
  page,
  pageSize,
  onPaginationChange,
  currentlyVisibleDevice,
  shouldShowSideMenu,
  shouldShowRemoveMenu,
  removeDeviceLoading,
  displayedDevice,
  setShouldShowSideMenu,
  setShouldShowRemoveMenu,
  removeDevice,
  onModify,
  onRemove,
  onDeviceHover,
  currentHoveredDevice,
}) => {
  const { t } = useContext(AppContext);

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
        rows={formatRows(currentlyVisibleDevice)}
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
                  placeHolderText="Search by Device ID"
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
                      (page - 1) * pageSize + rowIndex < devices.length
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
                                    {indexCells === 0 ? (
                                      <code>{cell.value}</code>
                                    ) : Array.isArray(cell.value) ? (
                                      formatCoordinates(cell.value)
                                    ) : (
                                      cell.value
                                    )}
                                  </span>
                                  {indexCells === 0 &&
                                    devices[deviceIndex].isUserOwner && (
                                      <Tag
                                        className="tag-owner"
                                        tabIndex={0}
                                        aria-label="My device"
                                      >
                                        My device
                                      </Tag>
                                    )}
                                </TableCell>
                              ))}
                          {devices[deviceIndex].isUserOwner ? (
                            <DeviceOverflowMenu
                              id={row.id}
                              device={
                                formatRows(currentlyVisibleDevice)[rowIndex]
                              }
                              onModify={onModify}
                              onRemove={onRemove}
                            />
                          ) : (
                            <TableCell className="sticky-column right" />
                          )}
                        </TableExpandRow>
                        <TableExpandedRow
                          colSpan={headers.length + 2}
                          className="device-expandable-row"
                        >
                          <div className="device-chart" tabIndex={0}>
                            <p className="title dance" tabIndex={0} />
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
