#import requests
import json
import mariadb
import os
import logging
from dotenv import load_dotenv

class firefighter_manager(object):

    def __init__(self):
        load_dotenv()
        self.logger = logging.getLogger('prometeo.firefighters.fire_fighters')
        self.logger.debug('creating an instance of firefighters')

    def insert_firefighter(self, id, first, last, email):

        firefighter = None
       
        try:
            conn = mariadb.connect(
                user = os.getenv("MARIADB_USERNAME"),
                password = os.getenv("MARIADB_PASSWORD"),
                host = os.getenv("MARIADB_HOST"),
                database = "prometeo",
                port = int(os.getenv("MARIADB_PORT")))

            cursor = conn.cursor()

            cursor.callproc('sp_create_firefighter', (id, first, last, email))

            data = cursor.fetchall()

            if len(data[0][0]) == 0:
                con.commit()
                return True
            else:
                return False

        except Exception as e:
            return None

        finally:
            cursor.close()
            conn.close()

    def update_firefighter(self, bomberoid, nombre, apellidos, email):
        try:
            conn = mariadb.connect(
                user = os.getenv("MARIADB_USERNAME"),
                password = os.getenv("MARIADB_PASSWORD"),
                host = os.getenv("MARIADB_HOST"),
                database = "prometeo",
                port = int(os.getenv("MARIADB_PORT")))

            cursor = conn.cursor()

            cursor.callproc('sp_update_firefighter', (bomberoid, nombre, apellidos, email))

            data = cursor.fetchall()

            if len(data[0][0]) == 0:
                con.commit()
                return True
            else:
                return False

        except Exception as e:
            return None

        finally:
            cursor.close()
            conn.close()

    def get_firefighter(self, bomberoid):
        print("get_firefighter - entro en la funcion")

        firefighter = None

        try:
            conn = mariadb.connect(
                user = os.getenv("MARIADB_USERNAME"),
                password = os.getenv("MARIADB_PASSWORD"),
                host = os.getenv("MARIADB_HOST"),
                database = "prometeo",
                port = int(os.getenv("MARIADB_PORT")))

            cursor = conn.cursor()

            cursor.execute('SELECT id, first, last, email FROM newfirefighters WHERE id = ?', (id,))

            data = cursor.fetchone()

            if len(data) > 0:
                firefighter = {'id': data[0], 'first': data[1], 'last': data[2], 'email': data[3]} 
                return firefighter
            else:
                return None

        except Exception as e:
            return None

        finally:
            cursor.close()
            conn.close()

    def get_all_firefighters(self):
        print("get_all_firefighters - entro en la funcion")

        firefighters = []

        try:
            conn = mariadb.connect(
                user = os.getenv("MARIADB_USERNAME"),
                password = os.getenv("MARIADB_PASSWORD"),
                host = os.getenv("MARIADB_HOST"),
                database = "prometeo",
                port = int(os.getenv("MARIADB_PORT")))

            cursor = conn.cursor()

            self.logger.info("get_all_firefighters - llamada a sql")
            cursor.execute('SELECT id, first, last, email FROM newfirefighters')
            data = cursor.fetchall()
            if len(data) > 0:
                self.logger.info("get_all_firefighters - Hay informacion")
                for i in data:
                    self.logger.info(i)
                    firefighters.append({'id': i[0], 'first': i[1], 'last': i[2], 'email': i[3]}) 
                return firefighters
            else:
                self.logger.info("get_all_firefighters - NO HAY INFORMACION")
                return None
        except Exception as e:
            self.logger.info("get_all_firefighters - Estoy en la excepcion")
            return None

        finally:
            cursor.close()
            conn.close()
