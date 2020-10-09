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

    def insert_firefighter(self, code, first, last, email):

        firefighter = None
       
        try:
            conn = mariadb.connect(
                user = os.getenv("MARIADB_USERNAME"),
                password = os.getenv("MARIADB_PASSWORD"),
                host = os.getenv("MARIADB_HOST"),
                database = "prometeo",
                port = int(os.getenv("MARIADB_PORT")))

            cursor = conn.cursor()

            cursor.execute('INSERT INTO firefighters (code, first, last, email) VALUES (?, ?, ?, ?)', (code, first, last, email))

            id = cursor.lastrowid()

            if id > 0:
                firefighter = {'id': id} 
                conn.commit()
                return True
            else:
                return False

        except Exception as e:
            return None

        finally:
            cursor.close()
            conn.close()

        return firefighter

    def update_firefighter(self, id, code, first, last, email):
        
        firefighter = None
        
        try:
            conn = mariadb.connect(
                user = os.getenv("MARIADB_USERNAME"),
                password = os.getenv("MARIADB_PASSWORD"),
                host = os.getenv("MARIADB_HOST"),
                database = "prometeo",
                port = int(os.getenv("MARIADB_PORT")))

            cursor = conn.cursor()

            cursor.execute('UPDATE firefighters SET (id = ?, first = ?, last = ?, email = ?) WHERE id = ?', (id, first, last, email, id))

            data = cursor.fetchall()

            if len(data[0][0]) == 0:
                conn.commit()
                firefighter = {'id': id} 
            else:
                return False

        except Exception as e:
            return None

        finally:
            cursor.close()
            conn.close()

        return firefighter

    def delete_firefighter(self, id):
        
        firefighter = None       
        
        try:
            conn = mariadb.connect(
                user = os.getenv("MARIADB_USERNAME"),
                password = os.getenv("MARIADB_PASSWORD"),
                host = os.getenv("MARIADB_HOST"),
                database = "prometeo",
                port = int(os.getenv("MARIADB_PORT")))

            cursor = conn.cursor()

            cursor.callproc('sp_delete_firefighter', (id))
            cursor.execute('UPDATE firefighters SET (deleted_at = NOW()) WHERE id = ?', (id,))
            
            data = cursor.fetchall()

            if len(data[0][0]) == 0:
                conn.commit()
                firefighter = {'id': id} 
            else:
                return False

        except Exception as e:
            return None

        finally:
            cursor.close()
            conn.close()

        return firefighter

    def get_firefighter(self, id):
        
        print("get_firefighter - entro en la funcion")

        firefighter = {}

        try:
            conn = mariadb.connect(
                user = os.getenv("MARIADB_USERNAME"),
                password = os.getenv("MARIADB_PASSWORD"),
                host = os.getenv("MARIADB_HOST"),
                database = "prometeo",
                port = int(os.getenv("MARIADB_PORT")))

            cursor = conn.cursor()

            cursor.execute('SELECT id, code, first, last, email FROM firefighters WHERE id = ?', (id,))

            data = cursor.fetchone()

            if len(data) > 0:
                firefighter = {'id': data[0], 'code': data[1],'first': data[2], 'last': data[3], 'email': data[4]} 
            else:
                return None

        except Exception as e:
            return None

        finally:
            cursor.close()
            conn.close()

        return firefighter

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
            cursor.execute('SELECT id, code, first, last, email FROM firefighters')
            data = cursor.fetchall()
            if len(data) > 0:
                self.logger.info("get_all_firefighters - Hay informacion")
                for i in data:
                    self.logger.info(i)
                    firefighters.append({'id': i[0], 'code': i[1], 'first': i[2], 'last': i[3], 'email': i[4]}) 
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
