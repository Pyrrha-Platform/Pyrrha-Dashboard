import React, { useContext } from 'react';
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
} from 'carbon-components-react';
import DevicesAddModal from './devicesAddModal';
import DevicesEditModal from './devicesEditModal';
import DevicesDeleteModal from './devicesDeleteModal';
import AppContext from '../../context/app';

// Utility to access the backend API
const client = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

// Table and data
const NewDevicesTable = ({ device_id }) => {
  const [devices, setDevices] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const { t } = useContext(AppContext);

  React.useEffect(() => {
    loadDevices();
  }, [fetched]);

  const loadDevices = React.useCallback(async () => {
    try {
      const data = await client(`/api-main/v1/devices`);
      // console.log(data);
      setDevices(data.devices);
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
      header: t('content.devices.code'),
      key: 'code',
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
    <div className="cds--grid cds--grid--full-width devices-content">
      <div className="cds--row">
        <div className="cds--col-md-16">
          <h1 className="devices-page__heading">
            {t('content.devices.heading')}
          </h1>
        </div>
      </div>

      <div className="cds--row">
        <div className="cds--col-md-16">
          <h2 className="devices-page__subheading">
            {t('content.devices.subheading')}
          </h2>
        </div>
      </div>

      <div className="cds--row devices-page__r2">
        <div className="cds--col-lg-16 fullwidth">
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
                    <DevicesAddModal rows={rows} loadDevices={loadDevices} />
                  </TableToolbarContent>
                </TableToolbar>
                <Table size="normal" {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                      <TableHeader>{t('content.devices.actions')}</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
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
        </div>
      </div>
    </div>
  );
};

export default NewDevicesTable;
