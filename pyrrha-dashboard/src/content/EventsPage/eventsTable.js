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
  TableToolbar,
  TableToolbarContent,
} from '@carbon/react';
import EventsAddModal from './eventsAddModal';
import EventsEditModal from './eventsEditModal';
import EventsDeleteModal from './eventsDeleteModal';
import AppContext from '../../context/app';
import Constants from '../../utils/Constants';

// Table and data
const NewEventsTable = () => {
  const [events, setEvents] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const { t } = useContext(AppContext);

  React.useEffect(() => {
    loadEvents();
  }, [fetched]);

  const loadEvents = useCallback(async () => {
    try {
      const response = await fetch(
        `${Constants.API_BASE_URL}/api-main/v1/events`,
      );
      const data = await response.json();

      // Transform API response to match frontend expectations
      const transformedEvents = (data.events || []).map((event) => ({
        id: event.id,
        name: event.code, // API uses 'code' field for event name
        type: event.type, // Keep as number for now, could map to descriptive text
        status: event.status, // Keep as number for now, could map to descriptive text
        date: new Date(event.date).toLocaleDateString(), // Format date for display
      }));

      setEvents(transformedEvents);
    } catch (e) {
      console.log(e);
    }
  }, []);

  // Form header data
  const headerData = [
    {
      header: t('content.events.id'),
      key: 'id',
    },
    {
      header: t('content.events.name'),
      key: 'name',
    },
    {
      header: t('content.events.type'),
      key: 'type',
    },
    {
      header: t('content.events.status'),
      key: 'status',
    },
    {
      header: t('content.events.date'),
      key: 'date',
    },
  ];

  return (
    <Grid className="events-content main-container">
      <Column sm={4} md={8} lg={16}>
        <h1 className="events-page__heading">{t('content.events.heading')}</h1>
      </Column>

      <Column sm={4} md={8} lg={16}>
        <h2 className="events-page__subheading">
          {t('content.events.subheading')}
        </h2>
      </Column>

      <Column sm={4} md={8} lg={16} className="events-page__r2 fullwidth">
        <DataTable
          isSortable
          headers={headerData}
          rows={events}
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
                  <EventsAddModal loadEvents={loadEvents} />
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
                    <TableHeader>{t('content.events.actions')}</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                      <TableCell>
                        <EventsEditModal row={row} loadEvents={loadEvents} />
                        <EventsDeleteModal row={row} loadEvents={loadEvents} />
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

export default NewEventsTable;
