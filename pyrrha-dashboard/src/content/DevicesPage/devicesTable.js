import React, { useContext, useCallback } from 'react';
import { Grid, Column } from '@carbon/react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableExpandedRow,
  TableToolbar,
  TableToolbarContent,
} from '@carbon/react';
import DevicesAddModal from './devicesAddModal';
import DevicesEditModal from './devicesEditModal';
import DevicesDeleteModal from './devicesDeleteModal';
import DeviceDetailMap from '../../components/DeviceDetailMap';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

// Table and data
const NewDevicesTable = () => {
  const [devices, setDevices] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const { t } = useContext(AppContext);

  React.useEffect(() => {
    loadDevices();
  }, [fetched]);

  const loadDevices = useCallback(async () => {
    try {
      const apiUrl = `${Constants.API_BASE_URL}/devices`;
      console.log('DevicesTable: Fetching from URL:', apiUrl);
      const response = await fetch(apiUrl);
      const data = await response.json();
      setDevices(data.devices || []);
    } catch (error) {
      console.log('DevicesTable error:', error);
    }
  }, []);

  // Form header data
  const headerData = [
    {
      header: t('content.devices.id'),
      key: 'id',
    },
    {
      header: t('content.devices.name'),
      key: 'name',
    },
    {
      header: t('content.devices.model'),
      key: 'model',
    },
    {
      header: t('content.devices.version'),
      key: 'version',
    },
    {
      header: t('content.devices.latitude'),
      key: 'latitude',
    },
    {
      header: t('content.devices.longitude'),
      key: 'longitude',
    },
  ];

  return (
    <Grid className="devices-content main-container">
      <Column sm={4} md={8} lg={16}>
        <h1 className="devices-page__heading">
          {t('content.devices.heading')}
        </h1>
      </Column>

      <Column sm={4} md={8} lg={16}>
        <h2 className="devices-page__subheading">
          {t('content.devices.subheading')}
        </h2>
      </Column>

      <Column sm={4} md={8} lg={16} className="devices-page__r2 fullwidth">
        <DataTable
          isSortable
          headers={headerData}
          rows={devices}
          render={({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getTableProps,
            getToolbarProps,
            onInputChange,
            getTableContainerProps,
          }) => (
            <TableContainer>
              <TableToolbar aria-label="data table toolbar">
                <TableToolbarContent>
                  <DevicesAddModal loadDevices={loadDevices} />
                </TableToolbarContent>
              </TableToolbar>
              <Table size="normal" {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader
                        key={header.key}
                        {...getHeaderProps({ header })}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                    <TableHeader>{t('content.devices.actions')}</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <React.Fragment key={row.id}>
                      <TableRow {...getRowProps({ row })}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                        <TableCell>
                          <DevicesEditModal
                            row={row}
                            loadDevices={loadDevices}
                          />
                          <DevicesDeleteModal
                            row={row}
                            loadDevices={loadDevices}
                          />
                        </TableCell>
                      </TableRow>
                      {row.isExpanded && (
                        <TableExpandedRow
                          colSpan={headers.length + 1}
                          className="device-chart"
                        >
                          <DeviceDetailMap
                            device={{
                              name: row.cells.find(
                                (cell) => cell.info.header === 'name',
                              )?.value,
                              latitude: row.cells.find(
                                (cell) => cell.info.header === 'latitude',
                              )?.value,
                              longitude: row.cells.find(
                                (cell) => cell.info.header === 'longitude',
                              )?.value,
                            }}
                          />
                        </TableExpandedRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        />
      </Column>
    </Grid>
  );
};

export default NewDevicesTable;
