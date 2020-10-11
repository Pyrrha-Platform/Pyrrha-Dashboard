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

            cursor.execute('SELECT IntSensorId, SensorID, model, version FROM sensors WHERE deleted_at IS NULL AND IntSensorId = ?', (id,))

            data = cursor.fetchone()

            if len(data) > 0:
                device = {'id': data[0], 'code': data[1], 'model': data[2], 'version': data[3]} 
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
            print("get_all_devices - trying")

            conn = mariadb.connect(
                user = os.getenv('MARIADB_USERNAME'),
                password = os.getenv('MARIADB_PASSWORD'),
                host = os.getenv('MARIADB_HOST'),
                database = 'prometeo',
                port = int(os.getenv('MARIADB_PORT'))
            )

            print("get_all_devices - before cursor")
            cursor = conn.cursor()
            print("get_all_devices - after cursor")

            print("get_all_devices - llamada a sql")
            # cursor.execute('SELECT device_id, device_code, name, surname, email FROM devices WHERE deleted_at IS NULL')
            cursor.callproc('sp_select_all_devices')
            print("get_all_devices - sp_select_all_devices")
            data = cursor.fetchall()
            print("get_all_devices - fetchall")
            print(data)
            if len(data) > 0:
                print("get_all_devices - Hay informacion")
                for i in data:
                    print(i)
                    devices.append({'id': i[0], 'code': i[1], 'model': i[2], 'version': i[3]} ) 
            else:
                print("get_all_devices - NO HAY INFORMACION")
                return None
        except Exception as e:
            print("get_all_devices - Estoy en la excepcion")
            print(e)
            return None

        finally:
            cursor.close()
            conn.close()

        return devices