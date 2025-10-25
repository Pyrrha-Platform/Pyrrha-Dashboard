import React, { useContext, useState, useEffect, useCallback } from 'react';
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
  Grid,
  Column,
} from '@carbon/react';
import FirefightersAddModal from './firefightersAddModal';
import FirefightersEditModal from './firefightersEditModal';
import FirefightersDeleteModal from './firefightersDeleteModal';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

// Utility to access the backend API
const client = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

// Table and data
const NewFirefightersTable = () => {
  const [firefighters, setFirefighters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useContext(AppContext);

  const loadFirefighters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await client(`${Constants.API_BASE_URL}/api-main/v1/firefighters`);
      setFirefighters(data.firefighters || []);
    } catch (e) {
      console.error('Error loading firefighters:', e);
      setError('Failed to load firefighters');
      setFirefighters([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFirefighters();
  }, [loadFirefighters]);

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
    <Grid className="firefighters-content main-container" fullWidth>
      <Column sm={4} md={8} lg={16}>
        <h1 className="firefighters-page__heading">
          {t('content.firefighters.heading')}
        </h1>
      </Column>

      <Column sm={4} md={8} lg={16}>
        <h2 className="firefighters-page__subheading">
          {t('content.firefighters.subheading')}
        </h2>
      </Column>

      <Column sm={4} md={8} lg={16}>
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
      </Column>
    </Grid>
  );
};

export default NewFirefightersTable;
