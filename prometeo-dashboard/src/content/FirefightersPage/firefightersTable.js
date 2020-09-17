import React from 'react';
import {
  Button,
  DataTable,
  OverflowMenu,
  OverflowMenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  Modal,
  TextInput,
  ComposedModal,
} from  'carbon-components-react';
import {
  Edit20,
  Delete20,
  Add20
} from "@carbon/icons-react/lib/add/20";
import FirefightersModal from './firefightersModal';

function FirefightersTable() {

  const headerData = [
    {
      header: 'Firefighter ID',
      key: 'id',
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
  
  const rowData = [
    {
      id: 'GRAF001',
      first: 'Joan',
      last: 'Herrera',
      email: 'graf001@graf.cat',
    },
    {
      id: 'GRAF002',
      first: 'Marco',
      last: 'Rodriguez',
      email: 'graf002@graf.cat',
    },
    {
      id: 'GRAF003',
      first: 'Marisol',
      last: 'Santillan',
      email: 'graf003@graf.cat',
    },
    {
      id: 'GRAF004',
      first: 'Upkarno',
      last: 'Lidderez',
      email: 'graf004@graf.cat',
    },
    
  ];

  const editProps = {
    editItem: (row) => ({
      onClick: () => alert("onClick edit: " + row.id),
    }),
  };

  const deleteProps = {
    deleteItem: (row) => ({
      onClick: () => alert("onClick delete: " + row.id),
    }),
  };
  return (
    <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
      <div className="bx--row sensors-page__r2">
        <div className="bx--col-lg-16 fullwidth">
         
          <DataTable isSortable
          rows={rowData}
          headers={headerData}
          editProps={editProps}
          deleteProps={deleteProps}
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
                  {/*
                  <TableToolbarSearch onChange={onInputChange} />
                  <TableToolbarMenu>
                    <TableToolbarAction
                      onClick={() => alert('Alert 1')}
                      primaryFocus>
                      Action 1
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => alert('Alert 2')}>
                      Action 2
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => alert('Alert 3')}>
                      Action 3
                    </TableToolbarAction>
                  </TableToolbarMenu>
                  <Button {...addProps.addItem()} renderIcon={Add20}>Add firefighter</Button>
                  */}
                  <FirefightersModal />
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
                        <OverflowMenu>
                          <OverflowMenuItem renderIcon={Add20} {...editProps.editItem(row)} itemText="Edit" primaryFocus />
                          <OverflowMenuItem renderIcon={Add20} {...deleteProps.deleteItem(row)} itemText="Delete" isDelete />
                        </OverflowMenu>
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

export default FirefightersTable;
