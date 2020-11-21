import React from "react";
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
} from "carbon-components-react";
import EventsAddModal from "./eventsAddModal";
import EventsEditModal from "./eventsEditModal";
import EventsDeleteModal from "./eventsDeleteModal";

// Utility to access the backend API
const client = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

// Form header data
const headerData = [
  {
    header: "Event ID",
    key: "id",
  },
  {
    header: "Code",
    key: "code",
  },
  {
    header: "Type",
    key: "type",
  },
  {
    header: "Firefighters",
    key: "firefighters",
  },
  {
    header: "State",
    key: "state",
  },
];

// Table and data
const NewEventsTable = ({ eventId }) => {
  const [events, setEvents] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);

  React.useEffect(() => {
    loadEvents();
  }, [fetched]);

  const loadEvents = React.useCallback(async () => {
    try {
      const data = await client(`/api/v1/events`);
      console.log(data);
      setEvents(data.events);
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <div className="bx--grid bx--grid--full-width dashboard-content sensors-page">
      <div className="bx--row sensors-page__r2">
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
              <TableContainer title="Events">
                <TableToolbar aria-label="data table toolbar">
                  <TableToolbarContent>
                    <EventsAddModal rows={rows} loadEvents={loadEvents} />
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
                      <TableHeader>Actions</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                        <TableCell>
                          <EventsEditModal row={row} loadEvents={loadEvents} />
                          <EventsDeleteModal
                            row={row}
                            loadEvents={loadEvents}
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

export default NewEventsTable;
