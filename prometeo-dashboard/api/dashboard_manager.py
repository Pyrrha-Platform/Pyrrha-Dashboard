#import requests
import json
import mariadb
import os
import logging
from dotenv import load_dotenv

class dashboard_manager(object):

    def __init__(self):
        load_dotenv()
        self.logger = logging.getLogger('prometeo.dashboards.fire_fighters')
        self.logger.debug('creating an instance of dashboards')

    def get_dashboard(self, max):
        print("get_dashboard - entro en la funcion")

        devices = []

        try:
            print("get_dashboard - trying")

            conn = mariadb.connect(
                user = os.getenv('MARIADB_USERNAME'),
                password = os.getenv('MARIADB_PASSWORD'),
                host = os.getenv('MARIADB_HOST'),
                database = 'prometeo',
                port = int(os.getenv('MARIADB_PORT'))
            )

            print("get_dashboard - before cursor")
            cursor = conn.cursor()
            print("get_dashboard - after cursor")

            print("get_dashboard - llamada a sql")
            # cursor.execute('SELECT device_id, device_code, name, surname, email FROM devices WHERE deleted_at IS NULL')
            cursor.callproc('sp_select_firefighter_status_analytics', ('0007', '2000-01-01 04:32:38', 1,))
            print("get_dashboard - sp_select_all_devices")
            data = cursor.fetchall()
            print("get_dashboard - fetchall")
            print(data)
            if len(data) > 0:
                print("get_dashboard - Hay informacion")
                """
                for i in data:
                    print(i)
                    devices.append({'id': i[0], 'code': i[1], 'model': i[2], 'version': i[3]} ) 
                """
                devices = data
            else:
                print("get_dashboard - NO HAY INFORMACION")
                return None
        except Exception as e:
            print("get_dashboard - Estoy en la excepcion")
            print(e)
            return None

        finally:
            cursor.close()
            conn.close()

        return devices