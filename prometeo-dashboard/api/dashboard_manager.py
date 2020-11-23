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

    def get_dashboard_for(self, firefighter_id):
        print("get_dashboard - entro en la funcion")

        firefighters = []

        try:
            print("get_dashboard - trying")

            conn = mariadb.connect(
                user=os.getenv('MARIADB_USERNAME'),
                password=os.getenv('MARIADB_PASSWORD'),
                host=os.getenv('MARIADB_HOST'),
                database='prometeo',
                port=int(os.getenv('MARIADB_PORT'))
            )

            print("get_dashboard - before cursor")
            cursor = conn.cursor()
            print("get_dashboard - after cursor")

            print("get_dashboard - llamada a sql")
            cursor.execute(
                'SELECT * FROM firefighter_sensor_log WHERE firefighter_id = ? ORDER BY device_timestamp DESC LIMIT 1', (firefighter_id,))
            # cursor.callproc('sp_select_firefighter_status_analytics', ('0007', '2000-01-01 04:32:38', 1,))
            print("get_dashboard - sp_select_all_devices")
            data = cursor.fetchall()
            print("get_dashboard - fetchall")
            if len(data) > 0:
                print("get_dashboard - Hay informacion")
                for i in data:
                    print(i)
                    firefighters.append({
                        'timestamp_mins': i[0],
                        'firefighter_id': i[1],
                        'device_id': i[2],
                        'device_battery_level': i[3],
                        'temperature': i[4],
                        'humidity': i[5],
                        'carbon_monoxide': i[6],
                        'nitrogen_dioxide': i[7],
                        'formaldehyde': i[8],
                        'acrolein': i[9],
                        'benzene': i[10],
                        'device_timestamp': i[11],
                        'device_status_LED': i[12]
                    })
                # firefighters = data
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

        return firefighters

    def get_dashboard_now(self):
        print("get_dashboard_now - entro en la funcion")

        firefighters = []

        try:
            print("get_dashboard_now - trying")

            conn = mariadb.connect(
                user=os.getenv('MARIADB_USERNAME'),
                password=os.getenv('MARIADB_PASSWORD'),
                host=os.getenv('MARIADB_HOST'),
                database='prometeo',
                port=int(os.getenv('MARIADB_PORT'))
            )

            print("get_dashboard_now - before cursor")
            cursor = conn.cursor()
            print("get_dashboard_now - after cursor")

            print("get_dashboard_now - llamada a sql")
            sql = """
                SELECT 
                    f.firefighter_id,
                    name,
                    surname,
                    email,
                    device_id,
                    temperature,
                    humidity,
                    carbon_monoxide,
                    nitrogen_dioxide,
                    timestamp_mins
                FROM
                    firefighters f
                INNER JOIN (
                    SELECT 
                        fsl1.*
                    FROM
                        firefighter_sensor_log fsl1
                            INNER JOIN
                        (SELECT 
                            firefighter_id, MAX(timestamp_mins) AS reading
                        FROM
                            firefighter_sensor_log
                        GROUP BY firefighter_id) fsl2 ON fsl2.firefighter_id = fsl1.firefighter_id
                            AND fsl1.timestamp_mins = fsl2.reading
                    ORDER BY reading DESC
                ) fsl on fsl.firefighter_id = f.firefighter_id
            """
            # cursor.execute('SELECT * FROM firefighter_sensor_log ORDER BY device_timestamp DESC LIMIT 15')
            cursor.execute(sql)
            print("get_dashboard_now - sp_select_all_devices")
            data = cursor.fetchall()
            print("get_dashboard_now - fetchall")
            if len(data) > 0:
                print("get_dashboard_now - Hay informacion")
                for i in data:
                    print(i)
                    firefighters.append({
                        'firefighterId': i[0],
                        'firefighterFirst': i[1],
                        'firefighterLast': i[2],
                        'firefighterCode': i[2],
                        'firefighterEmail': i[3],
                        'deviceId': i[4],
                        'temperature': i[5],
                        'humidity': i[6],
                        'carbonMonoxide': i[7],
                        'nitrogenDioxide': i[8],
                        'timestampMins': i[9],
                    })
                # firefighters = data
            else:
                print("get_dashboard_now - NO HAY INFORMACION")
                return None
        except Exception as e:
            print("get_dashboard_now - Estoy en la excepcion")
            print(e)
            return None

        finally:
            cursor.close()
            conn.close()

        return firefighters
