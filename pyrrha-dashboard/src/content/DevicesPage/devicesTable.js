import React, { useContext } from 'react';
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
  TableToolbar,
  TableToolbarContent,
} from '@carbon/react';
import DevicesAddModal from './devicesAddModal';
import DevicesEditModal from './devicesEditModal';
import DevicesDeleteModal from './devicesDeleteModal';
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

  const loadDevices = React.useCallback(async () => {
    try {
      const response = await fetch(`${Constants.API_BASE_URL}/devices`);
      const data = await response.json();
      setDevices(data.devices || []);
    } catch (e) {
      console.log(e);
    }
  });

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
                      <TableHeader key={header.key} {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                    <TableHeader>{t('content.devices.actions')}</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} {...getRowProps({ row })}>
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
