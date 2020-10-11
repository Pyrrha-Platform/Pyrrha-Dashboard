#import requests
import json
import mariadb
import os
import logging
from dotenv import load_dotenv

class device_manager(object):

    def __init__(self):
        load_dotenv()
        self.logger = logging.getLogger('prometeo.devices.fire_fighters')
        self.logger.debug('creating an instance of devices')

    def insert_device(self, code, first, last, email):

        device = None
       
        try:
            conn = mariadb.connect(
                user = os.getenv('MARIADB_USERNAME'),
                password = os.getenv('MARIADB_PASSWORD'),
                host = os.getenv('MARIADB_HOST'),
                database = 'prometeo',
                port = int(os.getenv('MARIADB_PORT')),
                autocommit = False
            )

            cursor = conn.cursor()

            cursor.execute('INSERT INTO devices (device_code, name, surname, email) VALUES (?, ?, ?, ?)', (code, first, last, email))

            conn.commit()

            id = cursor.lastrowid

            if id > 0:
                device = {'id': id} 
            else:
                return False

        except Exception as e:
            return None

        finally:
            cursor.close()
            conn.close()

        return device

    def update_device(self, id, code, first, last, email):
        
        device = None
        
        try:
            conn = mariadb.connect(
                user = os.getenv('MARIADB_USERNAME'),
                password = os.getenv('MARIADB_PASSWORD'),
                host = os.getenv('MARIADB_HOST'),
                database = 'prometeo',
                port = int(os.getenv('MARIADB_PORT')),
                autocommit = False
            )

            cursor = conn.cursor()

            cursor.execute('UPDATE devices SET device_code = ?, name = ?, surname = ?, email = ? WHERE device_id = ?', (code, first, last, email, id))

            if cursor.rowcount == 1:
                conn.commit()
                device = {'id': id} 
            else:
                return False

        except Exception as e:
            return None

        finally:
            cursor.close()
            conn.close()

        return device

    def delete_device(self, id):
        
        device = None       
        
        try:
            conn = mariadb.connect(
                user = os.getenv('MARIADB_USERNAME'),
                password = os.getenv('MARIADB_PASSWORD'),
                host = os.getenv('MARIADB_HOST'),
                database = 'prometeo',
                port = int(os.getenv('MARIADB_PORT')),
                autocommit = False
            )

            cursor = conn.cursor()

            cursor.execute('UPDATE devices SET deleted_at = NOW() WHERE device_id =  ?', (id,))
            
            if cursor.rowcount == 1:
                conn.commit()
                device = {'id': id} 
            else:
                return False

        except Exception as e:
            return None

        finally:
            cursor.close()
            conn.close()

        return device

    def get_device(self, id):
        
        print("get_device - entro en la funcion")

        device = {}

        try:
            conn = mariadb.connect(
                user = os.getenv('MARIADB_USERNAME'),
                password = os.getenv('MARIADB_PASSWORD'),
                host = os.getenv('MARIADB_HOST'),
                database = 'prometeo',
                port = int(os.getenv('MARIADB_PORT'))
            )

            cursor = conn.cursor()

            cursor.execute('SELECT device_id, device_code, name, surname, email FROM devices WHERE deleted_at IS NULL AND device_id = ?', (id,))

            data = cursor.fetchone()

            if len(data) > 0:
                device = {'id': data[0], 'code': data[1],'first': data[2], 'last': data[3], 'email': data[4]} 
            else:
                return None

        except Exception as e:
            return None

        finally:
            cursor.close()
            conn.close()

        return device

    def get_all_devices(self):
        print("get_all_devices - entro en la funcion")

        devices = []

        try:
            conn = mariadb.connect(
                user = os.getenv('MARIADB_USERNAME'),
                password = os.getenv('MARIADB_PASSWORD'),
                host = os.getenv('MARIADB_HOST'),
                database = 'prometeo',
                port = int(os.getenv('MARIADB_PORT'))
            )

            cursor = conn.cursor()

            self.logger.info("get_all_devices - llamada a sql")
            cursor.execute('SELECT device_id, device_code, name, surname, email FROM devices WHERE deleted_at IS NULL')
            data = cursor.fetchall()
            if len(data) > 0:
                self.logger.info("get_all_devices - Hay informacion")
                for i in data:
                    self.logger.info(i)
                    devices.append({'id': i[0], 'code': i[1], 'first': i[2], 'last': i[3], 'email': i[4]}) 
            else:
                self.logger.info("get_all_devices - NO HAY INFORMACION")
                return None
        except Exception as e:
            self.logger.info("get_all_devices - Estoy en la excepcion")
            return None

        finally:
            cursor.close()
            conn.close()

        return devices