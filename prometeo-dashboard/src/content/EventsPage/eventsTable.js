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
  TableExpandRow,
  TableExpandedRow,
  TableExpandHeader,
} from 'carbon-components-react';
import EventsAddModal from './eventsAddModal';
import EventsEditModal from './eventsEditModal';
import EventsDeleteModal from './eventsDeleteModal';
import AppContext from '../../context/app';

// Utility to access the backend API
const client = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

// {'id': i[0], 'code': i[1], 'status': i[2], 'type': i[3], 'date': i[4], 'info': i[5]}

// Table and data
const NewEventsTable = ({ eventId }) => {
  const [events, setEvents] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const { t } = useContext(AppContext);

  React.useEffect(() => {
    loadEvents();
  }, [fetched]);

  const loadEvents = React.useCallback(async () => {
    try {
      const data = await client(`/api-main/v1/events`);
      console.log(data);
      setEvents(data.events);
    } catch (e) {
      console.log(e);
    }
  });

  // Form header data
  const headerData = [
    {
      header: t('content.events.id'),
      key: 'id',
    },
    {
      header: t('content.events.code'),
      key: 'code',
    },
    {
      header: t('content.events.type'),
      key: 'type',
    },
    {
      header: t('content.events.date'),
      key: 'date',
    },
    {
      header: t('content.events.status'),
      key: 'status',
    },
  ];

  return (
    <div className="bx--grid bx--grid--full-width events-content">
      <div className="bx--row">
        <div className="bx--col-md-16">
          <h1 className="events-page__heading">
            {t('content.events.heading')}
          </h1>
        </div>
      </div>

      <div className="bx--row">
        <div className="bx--col-md-16">
          <h2 className="events-page__subheading">
            {t('content.events.subheading')}
          </h2>
        </div>
      </div>

      <div className="bx--row events-page__r2">
        <div className="bx--col-lg-16 fullwidth">
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
                    <EventsAddModal rows={rows} loadEvents={loadEvents} />
                  </TableToolbarContent>
                </TableToolbar>
                <Table size="normal" {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      <TableExpandHeader />
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                      <TableHeader>{t('content.events.actions')}</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <React.Fragment key={row.id}>
                        <TableExpandRow key={row.id}>
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                          <TableCell>
                            <EventsEditModal
                              row={row}
                              loadEvents={loadEvents}
                            />
                            <EventsDeleteModal
                              row={row}
                              loadEvents={loadEvents}
                            />
                          </TableCell>
                        </TableExpandRow>
                        <TableExpandedRow colSpan={headers.length + 1}>
                          <p>{row.id}</p>
                        </TableExpandedRow>
                      </React.Fragment>
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

export default NewEventsTable;
