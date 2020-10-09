import React from 'react';
import axios from 'axios';
import {
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
} from  'carbon-components-react';
import {
  Add20
} from "@carbon/icons-react/lib/add/20";
import FirefightersModal from './firefightersModal';

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

class FirefightersTable extends React.Component {

  state = {
    firefighters: []
  }

  componentDidMount() {
    axios.get(`/api/v1/firefighters`)
      .then(res => {
        const data = res.data;
        console.log(data);
        console.log(data.firefighters);
        this.setState({ firefighters: data.firefighters });
      }
    )
  }

  render() {
    return (
      <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
        <div className="bx--row sensors-page__r2">
          <div className="bx--col-lg-16 fullwidth">
          
            <DataTable isSortable
                headers={headerData}
                rows={this.state.firefighters}
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
                    <FirefightersModal rows={rows} />
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
}

export default FirefightersTable;
