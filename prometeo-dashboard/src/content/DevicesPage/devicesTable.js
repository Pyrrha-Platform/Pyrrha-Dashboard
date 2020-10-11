import React from 'react';
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
} from  'carbon-components-react';
import DevicesAddModal from './devicesAddModal';
import DevicesEditModal from './devicesEditModal';
import DevicesDeleteModal from './devicesDeleteModal';

// Utility to access the backend API
const client = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

// Form header data
const headerData = [
  {
    header: 'Device ID',
    key: 'id',
  },
  {
    header: 'Code',
    key: 'code',
  },
  {
    header: 'Model',
    key: 'model',
  },
  {
    header: 'Version',
    key: 'version',
  },
];

// Table and data
const NewDevicesTable = ( { deviceId } ) => {

  const [devices, setDevices] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);

  React.useEffect(() => {
    loadDevices();
  }, [fetched]);

  const loadDevices = React.useCallback(async () => {
    try {
      const data = await client(`/api/v1/devices`);
      console.log(data);
      setDevices(data.devices);
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
      <div className="bx--row sensors-page__r2">
        <div className="bx--col-lg-16 fullwidth">
        
          <DataTable isSortable
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
                getTableContainerProps
          }) => (
            <TableContainer title="Devices">
              <TableToolbar aria-label="data table toolbar">
                <TableToolbarContent>
                  <DevicesAddModal rows={rows} loadDevices={loadDevices} />
                </TableToolbarContent>
              </TableToolbar>
              <Table size='normal' {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map(header => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                    <TableHeader>
                        Actions
                    </TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.id}>
                      {row.cells.map(cell => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                      <TableCell>
                        <DevicesEditModal row={row} loadDevices={loadDevices} />
                        <DevicesDeleteModal row={row} loadDevices={loadDevices} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>)}
          />

        </div>
      </div>
      </div>
    );
  }

export default NewDevicesTable;
