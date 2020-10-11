#import requests
import json
import mariadb
import os
import logging
from dotenv import load_dotenv

class event_manager(object):

    def __init__(self):
        load_dotenv()
        self.logger = logging.getLogger('prometeo.events.fire_fighters')
        self.logger.debug('creating an instance of events')

    def insert_event(self, code, first, last, email):

        event = None
       
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

            # cursor.execute('INSERT INTO events (event_code, name, surname, email) VALUES (?, ?, ?, ?)', (code, first, last, email))
            cursor.callproc('sp_create_event', (data))

            conn.commit()

            id = cursor.lastrowid

            if id > 0:
                event = {'id': id} 
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
                user = os.getenv('MARIADB_USERNAME'),
                password = os.getenv('MARIADB_PASSWORD'),
                host = os.getenv('MARIADB_HOST'),
                database = 'prometeo',
                port = int(os.getenv('MARIADB_PORT')),
                autocommit = False
            )

            cursor = conn.cursor()

            # cursor.execute('UPDATE events SET event_code = ?, name = ?, surname = ?, email = ? WHERE event_id = ?', (code, first, last, email, id))
            cursor.callproc('sp_update_event', (data))

            if cursor.rowcount == 1:
                conn.commit()
                event = {'id': id} 
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
                user = os.getenv('MARIADB_USERNAME'),
                password = os.getenv('MARIADB_PASSWORD'),
                host = os.getenv('MARIADB_HOST'),
                database = 'prometeo',
                port = int(os.getenv('MARIADB_PORT')),
                autocommit = False
            )

            cursor = conn.cursor()

            cursor.execute('UPDATE events SET deleted_at = NOW() WHERE event_internal_id =  ?', (id,))
            
            if cursor.rowcount == 1:
                conn.commit()
                event = {'id': id} 
            else:
                return False

        except Exception as e:
            return None

        finally:
            cursor.close()
            conn.close()

        return event

    def get_event(self, id):
        
        print("get_event - entro en la funcion")

        event = {}

        try:
            conn = mariadb.connect(
                user = os.getenv('MARIADB_USERNAME'),
                password = os.getenv('MARIADB_PASSWORD'),
                host = os.getenv('MARIADB_HOST'),
                database = 'prometeo',
                port = int(os.getenv('MARIADB_PORT'))
            )

            cursor = conn.cursor()

            # cursor.execute('SELECT event_id, event_code, name, surname, email FROM events WHERE deleted_at IS NULL AND event_id = ?', (id,))
            cursor.callproc('sp_select_event', (id,))

            data = cursor.fetchone()

            if len(data) > 0:
                event = {'id': data[0], 'code': data[1], 'type': data[5], 'firefighters': data[14], 'state': data[3]} 
            else:
                return None

        except Exception as e:
            return None

        finally:
            cursor.close()
            conn.close()

        return event

    def get_all_events(self):
        print("get_all_events - entro en la funcion")

        events = []

        try:
            print("get_all_events - trying")

            conn = mariadb.connect(
                user = os.getenv('MARIADB_USERNAME'),
                password = os.getenv('MARIADB_PASSWORD'),
                host = os.getenv('MARIADB_HOST'),
                database = 'prometeo',
                port = int(os.getenv('MARIADB_PORT'))
            )

            print("get_all_events - before cursor")
            cursor = conn.cursor()
            print("get_all_events - after cursor")

            print("get_all_events - llamada a sql")
            # cursor.execute('SELECT event_id, event_code, name, surname, email FROM events WHERE deleted_at IS NULL')
            cursor.callproc('sp_select_all_events')
            print("get_all_events - sp_select_all_events")
            data = cursor.fetchall()
            print("get_all_events - fetchall")
            print(data)
            if len(data) > 0:
                print("get_all_events - Hay informacion")
                for i in data:
                    print(i)
                    events.append({'id': i[0], 'code': i[1], 'type': i[5], 'firefighters': i[14], 'state': i[3]}) 
            else:
                print("get_all_events - NO HAY INFORMACION")
                return None
        except Exception as e:
            print("get_all_events - Estoy en la excepcion")
            print(e)
            return None

        finally:
            cursor.close()
            conn.close()

        return events

    def get_event_firefighters_devices(self, id):
        try:
            conn = mariadb.connect(
                user = os.getenv('MARIADB_USERNAME'),
                password = os.getenv('MARIADB_PASSWORD'),
                host = os.getenv('MARIADB_HOST'),
                database = 'prometeo',
                port = int(os.getenv('MARIADB_PORT'))
            )

            cursor = conn.cursor()
            print("get_event")
            print(id)

            cursor.callproc('sp_select_event_firefighters_devices', (id,))

            print("get_event_firefighters_devices - he abierto el cursor")

            data = cursor.fetchall()

            if len(data) > 0:
                print("get_event_firefighters_devices - hay datos")
                for i in data:
                    print(i)
                return(data)
            else:
                print("get_event_firefighters_devices - no hay datos")
                return None

        except Exception as e:
            print("get_event_firefighters_devices - estoy en la excepcion")
            return None

        finally:
            cursor.close()
            conn.close()