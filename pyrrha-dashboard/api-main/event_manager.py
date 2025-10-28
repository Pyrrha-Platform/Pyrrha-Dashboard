import mariadb
import os
import logging
from dotenv import load_dotenv


class event_manager(object):
    def __init__(self):
        load_dotenv()
        self._logger = logging.getLogger("pyrrha.events")
        self._logger.setLevel(logging.DEBUG)
        self._logger.debug("creating an instance of events")
        self._user = os.getenv("MARIADB_USERNAME")
        self._password = os.getenv("MARIADB_PASSWORD")
        self._host = os.getenv("MARIADB_HOST")
        self._port = int(os.getenv("MARIADB_PORT"))
        self._database = os.getenv("MARIADB_DATABASE")

    def insert_event(self, name, event_type, fuel_type, status, event_date, init_time, end_time, extra_info):
        event = None

        try:
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
                init_command="SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
            )

            cursor = conn.cursor()

            cursor.execute(
                "INSERT INTO events (name, event_type, fuel_type, status, event_date, init_time, end_time, extra_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                (name, event_type, fuel_type, status, event_date, init_time, end_time, extra_info),
            )

            conn.commit()

            id = cursor.lastrowid

            if id > 0:
                event = {"id": id}
            else:
                return False

        except Exception as e:
            self._logger.error(f"Error inserting event: {e}")
            return None

        finally:
            if 'cursor' in locals() and cursor:
                cursor.close()
            if 'conn' in locals() and conn:
                conn.close()

        return event

    def update_event(self, id, name, event_type, fuel_type, status, event_date, init_time, end_time, extra_info):
        event = None

        try:
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
                init_command="SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
            )

            cursor = conn.cursor()

            cursor.execute(
                'UPDATE events SET name = ?, event_type = ?, fuel_type = ?, status = ?, event_date = ?, init_time = ?, end_time = ?, extra_info = ? WHERE event_id = ?', 
                (name, event_type, fuel_type, status, event_date, init_time, end_time, extra_info, id)
            )

            if cursor.rowcount == 1:
                conn.commit()
                event = {"id": id}
            else:
                return False

        except Exception as e:
            self._logger.error(f"Error updating event: {e}")
            return None

        finally:
            if 'cursor' in locals() and cursor:
                cursor.close()
            if 'conn' in locals() and conn:
                conn.close()

        return event

    def delete_event(self, id):

        event = None

        try:
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
                init_command="SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
            )

            cursor = conn.cursor()

            cursor.execute(
                "UPDATE events SET deleted_at = NOW() WHERE event_id = ?",
                (id,),
            )

            if cursor.rowcount == 1:
                conn.commit()
                event = {"id": id}
            else:
                return False

        except Exception as e:
            return None

        finally:
            if 'cursor' in locals() and cursor:
                cursor.close()
            if 'conn' in locals() and conn:
                conn.close()

        return event

    def get_event(self, id):

        self._logger.debug("get_event - entro en la funcion")

        event = {}

        try:
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
                init_command="SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
            )

            cursor = conn.cursor()

            # cursor.execute('SELECT event_id, name, surname, email FROM events WHERE deleted_at IS NULL AND event_id = ?', (id,))
            cursor.callproc("sp_select_event", (id,))

            data = cursor.fetchone()

            if len(data) > 0:
                event = {
                    "id": data[0],
                    "code": data[1],
                    "type": data[3],
                    "date": data[5],
                    "firefighters": 10,
                    "state": data[2],
                }
            else:
                return None

        except Exception as e:
            return None

        finally:
            if 'cursor' in locals() and cursor:
                cursor.close()
            if 'conn' in locals() and conn:
                conn.close()

        return event

    def get_all_events(self):
        self._logger.debug("get_all_events - entro en la funcion")

        events = []

        try:
            self._logger.debug("get_all_events - trying")

            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
                init_command="SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
            )

            self._logger.debug("get_all_events - before cursor")
            cursor = conn.cursor()

            self._logger.debug("get_all_events - after cursor")
            sql = """
                SELECT event_id, name, status, event_type, event_date, extra_info 
                FROM events 
                WHERE deleted_at IS NULL
            """

            self._logger.debug("get_all_events - llamada a sql")
            cursor.execute(sql)
            # cursor.callproc('sp_select_all_events')

            self._logger.debug("get_all_events - sp_select_all_events")
            data = cursor.fetchall()

            self._logger.debug("get_all_events - fetchall")
            self._logger.debug(data)
            if len(data) > 0:
                self._logger.debug("get_all_events - Hay informacion")
                for i in data:
                    self._logger.debug(i)
                    events.append(
                        {
                            "id": i[0],
                            "code": i[1],
                            "status": i[2],
                            "firefighters": 10,
                            "type": i[3],
                            "date": i[4],
                            "info": i[5],
                        }
                    )
            else:
                self._logger.debug("get_all_events - NO HAY INFORMACION")
                return None
        except Exception as e:
            self._logger.debug("get_all_events - Estoy en la excepcion")
            self._logger.debug(e)
            return None

        finally:
            cursor.close()
            conn.close()

        return events

    def get_event_firefighters_devices(self, id):
        try:
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
                init_command="SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
            )

            cursor = conn.cursor()
            self._logger.debug("get_event")
            self._logger.debug(id)

            cursor.callproc("sp_select_event_firefighters_devices", (id,))

            self._logger.debug("get_event_firefighters_devices - he abierto el cursor")

            data = cursor.fetchall()

            if len(data) > 0:
                self._logger.debug("get_event_firefighters_devices - hay datos")
                for i in data:
                    self._logger.debug(i)
                return data
            else:
                self._logger.debug("get_event_firefighters_devices - no hay datos")
                return None

        except Exception as e:
            self._logger.debug("get_event_firefighters_devices - estoy en la excepcion")
            return None

        finally:
            cursor.close()
            conn.close()

    def get_event_types(self):
        """Get all event types for dropdown"""
        try:
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
                init_command="SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
            )

            cursor = conn.cursor()
            cursor.execute("SELECT event_id, event_description FROM event_types WHERE deleted_at IS NULL")
            data = cursor.fetchall()

            event_types = []
            if data:
                for row in data:
                    event_types.append({
                        "event_id": row[0],
                        "event_description": row[1]
                    })

            return event_types

        except Exception as e:
            self._logger.error(f"Error getting event types: {e}")
            return []

        finally:
            cursor.close()
            conn.close()

    def get_fuel_types(self):
        """Get all fuel types for dropdown"""
        try:
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
                init_command="SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
            )

            cursor = conn.cursor()
            cursor.execute("SELECT fuel_id, fuel_description FROM fuel_types WHERE deleted_at IS NULL")
            data = cursor.fetchall()

            fuel_types = []
            if data:
                for row in data:
                    fuel_types.append({
                        "fuel_id": row[0],
                        "fuel_description": row[1]
                    })

            return fuel_types

        except Exception as e:
            self._logger.error(f"Error getting fuel types: {e}")
            return []

        finally:
            cursor.close()
            conn.close()

    def get_status_options(self):
        """Get all status options for dropdown"""
        try:
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
                init_command="SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
            )

            cursor = conn.cursor()
            cursor.execute("SELECT status_id, status_description FROM status WHERE deleted_at IS NULL")
            data = cursor.fetchall()

            status_options = []
            if data:
                for row in data:
                    status_options.append({
                        "status_id": row[0],
                        "status_description": row[1]
                    })

            return status_options

        except Exception as e:
            self._logger.error(f"Error getting status options: {e}")
            return []

        finally:
            cursor.close()
            conn.close()
