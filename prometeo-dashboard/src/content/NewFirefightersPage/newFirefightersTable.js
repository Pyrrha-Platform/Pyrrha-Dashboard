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
import NewFirefightersAddModal from './newFirefightersAddModal';
import NewFirefightersEditModal from './newFirefightersEditModal';
import NewFirefightersDeleteModal from './newFirefightersDeleteModal';

// Utility to access the backend API
const client = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

// Form header data
const headerData = [
  {
    header: 'Firefighter ID',
    key: 'id',
  },
  {
    header: 'Code',
    key: 'code',
  },
  {
    header: 'First name',
    key: 'first',
  },
  {
    header: 'Last name',
    key: 'last',
  },
  {
    header: 'Email',
    key: 'email',
  },
];

// Table and data
const NewFirefightersTable = ( { firefighterId } ) => {

  const [firefighters, setFirefighters] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);

  React.useEffect(() => {
    loadFirefighters();
  }, [fetched]);

  const loadFirefighters = React.useCallback(async () => {
    try {
      const data = await client(`/api/v1/firefighters`);
      console.log(data);
      setFirefighters(data.firefighters);
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
              rows={firefighters}
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
            <TableContainer title="Firefighters">
              <TableToolbar aria-label="data table toolbar">
                <TableToolbarContent>
                  <NewFirefightersAddModal rows={rows} />
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
                        <NewFirefightersEditModal row={row} rows={rows} loadFirefighters={loadFirefighters} />
                        <NewFirefightersDeleteModal row={row} rows={rows} loadFirefighters={loadFirefighters} />
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

export default NewFirefightersTable;
