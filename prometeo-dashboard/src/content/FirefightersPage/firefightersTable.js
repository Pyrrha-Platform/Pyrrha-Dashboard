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
import FirefightersAddModal from './firefightersAddModal';
import FirefightersEditModal from './firefightersEditModal';
import FirefightersDeleteModal from './firefightersDeleteModal';
import Context from '../../context/app';

// Utility to access the backend API
const client = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

// Table and data
const NewFirefightersTable = ({ firefighterId }) => {
  const [firefighters, setFirefighters] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const { t } = useContext(Context);

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

  // Form header data
  const headerData = [
    {
      header: t('content.firefighters.id'),
      key: 'id',
    },
    {
      header: t('content.firefighters.code'),
      key: 'code',
    },
    {
      header: t('content.firefighters.first'),
      key: 'first',
    },
    {
      header: t('content.firefighters.last'),
      key: 'last',
    },
    {
      header: t('content.firefighters.email'),
      key: 'email',
    },
  ];

  return (
    <div className="bx--grid bx--grid--full-width firefighters-content">
      <div className="bx--row">
        <div className="bx--col-md-16">
          <h1 className="firefighters-page__heading">
            {t('content.firefighters.heading')}
          </h1>
        </div>
      </div>

      <div className="bx--row">
        <div className="bx--col-md-16">
          <h2 className="firefighters-page__subheading">
            {t('content.firefighters.subheading')}
          </h2>
        </div>
      </div>

      <div className="bx--row firefighters-page__r2">
        <div className="bx--col-lg-16 fullwidth">
          <DataTable
            isSortable
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
              getTableContainerProps,
            }) => (
              <TableContainer>
                <TableToolbar aria-label="data table toolbar">
                  <TableToolbarContent>
                    <FirefightersAddModal
                      rows={rows}
                      loadFirefighters={loadFirefighters}
                    />
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
                      <TableHeader>
                        {t('content.firefighters.actions')}
                      </TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                        <TableCell>
                          <FirefightersEditModal
                            row={row}
                            loadFirefighters={loadFirefighters}
                          />
                          <FirefightersDeleteModal
                            row={row}
                            loadFirefighters={loadFirefighters}
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

export default NewFirefightersTable;
