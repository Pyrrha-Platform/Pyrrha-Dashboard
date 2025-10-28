import mariadb
import os
import logging
from dotenv import load_dotenv


class firefighter_manager(object):
    def __init__(self):
        load_dotenv()
        self._logger = logging.getLogger("pyrrha.firefighters")
        self._logger.setLevel(logging.DEBUG)
        self._logger.debug("creating an instance of firefighters")
        self._user = os.getenv("MARIADB_USERNAME")
        self._password = os.getenv("MARIADB_PASSWORD")
        self._host = os.getenv("MARIADB_HOST")
        self._port = int(os.getenv("MARIADB_PORT"))
        self._database = os.getenv("MARIADB_DATABASE")

    def insert_firefighter(self, code, first, last, email):

        firefighter = None

        try:
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
                init_command="SET NAMES utf8mb4"
            )

            cursor = conn.cursor()

            cursor.execute(
                "INSERT INTO firefighters (firefighter_code, name, surname, email) VALUES (?, ?, ?, ?)",
                (code, first, last, email),
            )

            conn.commit()

            id = cursor.lastrowid

            if id > 0:
                firefighter = {"id": id}
            else:
                return False

        except Exception as e:
            return None

        finally:
            if 'cursor' in locals():
                cursor.close()
            if 'conn' in locals():
                conn.close()

        return firefighter

    def update_firefighter(self, id, code, first, last, email):

        firefighter = None

        try:
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
                init_command="SET NAMES utf8mb4"
            )

            cursor = conn.cursor()

            # firefighter_code is actually what we're using as the id from this table
            cursor.execute(
                "UPDATE firefighters SET firefighter_code = ?, name = ?, surname = ?, email = ? WHERE firefighter_code = ?",
                (code, first, last, email, id),
            )

            if cursor.rowcount == 1:
                conn.commit()
                firefighter = {"id": id}
            else:
                return False

        except Exception as e:
            return None

        finally:
            if 'cursor' in locals():
                cursor.close()
            if 'conn' in locals():
                conn.close()

        return firefighter

    def delete_firefighter(self, id):

        firefighter = None

        try:
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
                init_command="SET NAMES utf8mb4"
            )

            cursor = conn.cursor()

            # firefighter_code is actually what we're using as the id from this table
            cursor.execute(
                "UPDATE firefighters SET deleted_at = NOW() WHERE firefighter_code =  ?",
                (id,),
            )

            if cursor.rowcount == 1:
                conn.commit()
                firefighter = {"id": id}
            else:
                return False

        except Exception as e:
            self._logger.error(f"Error deleting firefighter: {str(e)}")
            return None

        finally:
            if 'cursor' in locals():
                cursor.close()
            if 'conn' in locals():
                conn.close()

        return firefighter

    def get_firefighter(self, id):

        self._logger.debug("get_firefighter - entro en la funcion")

        firefighter = {}

        try:
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
                init_command="SET NAMES utf8mb4"
            )

            cursor = conn.cursor()

            cursor.execute(
                "SELECT firefighter_id, firefighter_code, name, surname, email FROM firefighters WHERE deleted_at IS NULL AND firefighter_code = ?",
                (id,),
            )

            data = cursor.fetchone()

            # firefighter_code is actually what we're using as the id from this table
            if data and len(data) > 0:
                firefighter = {
                    "id": data[1],
                    "code": data[1],
                    "first": data[2],
                    "last": data[3],
                    "email": data[4],
                }
            else:
                return None

        except Exception as e:
            self._logger.error(f"Error getting firefighter: {str(e)}")
            return None

        finally:
            if 'cursor' in locals():
                cursor.close()
            if 'conn' in locals():
                conn.close()

        return firefighter

    def get_all_firefighters(self):
        self._logger.debug("get_all_firefighters - entro en la funcion")

        firefighters = []

        try:
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
                init_command="SET NAMES utf8mb4"
            )

            cursor = conn.cursor()

            self._logger.info("get_all_firefighters - llamada a sql")
            cursor.execute(
                "SELECT firefighter_id, firefighter_code, name, surname, email FROM firefighters WHERE deleted_at IS NULL"
            )
            data = cursor.fetchall()
            if len(data) > 0:
                self._logger.info("get_all_firefighters - Hay informacion")
                for i in data:
                    self._logger.info(i)
                    # firefighter_code is actually what we're using as the id from this table
                    firefighters.append(
                        {
                            "id": i[1],
                            "code": i[1],
                            "first": i[2],
                            "last": i[3],
                            "email": i[4],
                        }
                    )
            else:
                self._logger.info("get_all_firefighters - NO HAY INFORMACION")
                return None
        except Exception as e:
            self._logger.error(f"Error getting all firefighters: {str(e)}")
            return None

        finally:
            if 'cursor' in locals():
                cursor.close()
            if 'conn' in locals():
                conn.close()

        return firefighters
