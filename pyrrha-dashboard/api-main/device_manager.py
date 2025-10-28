import mariadb
import os
import logging
from dotenv import load_dotenv


class device_manager(object):
    def __init__(self):
        load_dotenv()
        self._logger = logging.getLogger("pyrrha.devices")
        self._logger.setLevel(logging.DEBUG)
        self._logger.debug("creating an instance of devices")
        self._user = os.getenv("MARIADB_USERNAME")
        self._password = os.getenv("MARIADB_PASSWORD")
        self._host = os.getenv("MARIADB_HOST")
        self._port = int(os.getenv("MARIADB_PORT"))
        self._database = os.getenv("MARIADB_DATABASE")

    def insert_device(self, name, model, version):

        device = None

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
                "INSERT INTO devices (name, model, version) VALUES (?, ?, ?)",
                (name, model, version),
            )

            conn.commit()

            id = cursor.lastrowid

            if id > 0:
                device = {"id": id}
            else:
                return False

        except Exception as e:
            return None

        finally:
            if 'cursor' in locals() and cursor:
                cursor.close()
            if 'conn' in locals() and conn:
                conn.close()

        return device

    def update_device(self, id, name, model, version):

        device = None

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
                "UPDATE devices SET name = ?, model = ?, version = ? WHERE device_id = ?",
                (name, model, version, id),
            )

            if cursor.rowcount == 1:
                conn.commit()
                device = {"id": id}
            else:
                return False

        except Exception as e:
            return None

        finally:
            if 'cursor' in locals() and cursor:
                cursor.close()
            if 'conn' in locals() and conn:
                conn.close()

        return device

    def delete_device(self, id):

        device = None

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
                "UPDATE devices SET deleted_at = NOW() WHERE device_id =  ?", (id,)
            )

            if cursor.rowcount == 1:
                conn.commit()
                device = {"id": id}
            else:
                return False

        except Exception as e:
            return None

        finally:
            if 'cursor' in locals() and cursor:
                cursor.close()
            if 'conn' in locals() and conn:
                conn.close()

        return device

    def get_device(self, id):

        self._logger.debug("get_device - entro en la funcion")

        device = {}

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
                "SELECT device_id, name, model, version, latitude, longitude FROM devices WHERE deleted_at IS NULL AND device_id = ?",
                (id,),
            )

            data = cursor.fetchone()

            if len(data) > 0:
                device = {
                    "id": data[0],
                    "name": data[1],
                    "model": data[2],
                    "version": data[3],
                    "latitude": float(data[4]) if data[4] is not None else None,
                    "longitude": float(data[5]) if data[5] is not None else None,
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

        return device

    def get_all_devices(self):
        self._logger.debug("get_all_devices - entro en la funcion")

        devices = []

        try:
            self._logger.debug("get_all_devices - trying")

            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
                init_command="SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
            )

            self._logger.debug("get_all_devices - before cursor")
            cursor = conn.cursor()
            self._logger.debug("get_all_devices - after cursor")

            self._logger.debug("get_all_devices - llamada a sql")
            cursor.execute('SELECT device_id, name, model, version, latitude, longitude FROM devices WHERE deleted_at IS NULL')
            self._logger.debug("get_all_devices - executed query")
            data = cursor.fetchall()
            self._logger.debug("get_all_devices - fetchall")
            self._logger.debug(data)
            if len(data) > 0:
                self._logger.debug("get_all_devices - Hay informacion")
                for i in data:
                    self._logger.debug(i)
                    devices.append(
                        {
                            "id": i[0], 
                            "name": i[1], 
                            "model": i[2], 
                            "version": i[3],
                            "latitude": float(i[4]) if i[4] is not None else None,
                            "longitude": float(i[5]) if i[5] is not None else None,
                        }
                    )
            else:
                self._logger.debug("get_all_devices - NO HAY INFORMACION")
                return None
        except Exception as e:
            self._logger.debug("get_all_devices - Estoy en la excepcion")
            self._logger.debug(e)
            return None

        finally:
            if 'cursor' in locals() and cursor:
                cursor.close()
            if 'conn' in locals() and conn:
                conn.close()

        return devices
