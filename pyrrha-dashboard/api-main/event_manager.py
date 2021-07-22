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

    def insert_event(self, code, type, firefighters, state):

        event = None

        try:
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
            )

            cursor = conn.cursor()

            cursor.execute(
                "INSERT INTO events (event_code, name, surname, email) VALUES (?, ?, ?, ?)",
                (code, first, last, email),
            )
            # cursor.callproc('sp_create_event', (data))

            conn.commit()

            id = cursor.lastrowid

            if id > 0:
                event = {"id": id}
            else:
                return False

        except Exception as e:
            return None

        finally:
            cursor.close()
            conn.close()

        return event

    def update_event(self, id, code, first, last, email):

        event = None

        try:
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
            )

            cursor = conn.cursor()

            # cursor.execute('UPDATE events SET event_code = ?, name = ?, surname = ?, email = ? WHERE event_id = ?', (code, first, last, email, id))
            cursor.callproc("sp_update_event", (data))

            if cursor.rowcount == 1:
                conn.commit()
                event = {"id": id}
            else:
                return False

        except Exception as e:
            return None

        finally:
            cursor.close()
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
            )

            cursor = conn.cursor()

            cursor.execute(
                "UPDATE events SET deleted_at = NOW() WHERE event_internal_id =  ?",
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
            cursor.close()
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
            )

            cursor = conn.cursor()

            # cursor.execute('SELECT event_id, event_code, name, surname, email FROM events WHERE deleted_at IS NULL AND event_id = ?', (id,))
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
            cursor.close()
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
            )

            self._logger.debug("get_all_events - before cursor")
            cursor = conn.cursor()

            self._logger.debug("get_all_events - after cursor")
            sql = """
                SELECT event_internal_id, event_code, status, event_type, event_date, extra_info 
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
