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

    def get_dashboard_for(self, device_id):
        print("get_dashboard - entro en la funcion")

        devices = []

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
                'SELECT * FROM firefighter_sensor_log WHERE device_id = ? ORDER BY device_timestamp DESC LIMIT 1', (device_id,))
            # cursor.callproc('sp_select_firefighter_status_analytics', ('0007', '2000-01-01 04:32:38', 1,))
            
            print("get_dashboard - sp_select_all_devices")
            data = cursor.fetchall()
            print("get_dashboard - fetchall")
            if len(data) > 0:
                print("get_dashboard - Hay informacion")
                for i in data:
                    print(i)
                    devices.append({
                        'timestamp_mins': i[0].strftime("%Y-%m-%dT%H:%M:%S"),
                        'device_id': i[2],
                        'device_battery_level': i[3],
                        'temperature': i[4],
                        'humidity': i[5],
                        'carbon_monoxide': i[6],
                        'nitrogen_dioxide': i[7],
                        'formaldehyde': i[8],
                        'acrolein': i[9],
                        'benzene': i[10],
                        'device_timestamp': i[11].strftime("%Y-%m-%dT%H:%M:%S"),
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

        return devices

    def get_dashboard_now(self):
        print("get_dashboard_now - entro en la funcion")

        devices = []

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

            print("get_dashboard_now - llamada a sql")
            sql = """
                SELECT * FROM (
                    SELECT 
                        device_id,
                        temperature,
                        humidity,
                        carbon_monoxide,
                        nitrogen_dioxide,
                        timestamp_mins,
                        device_timestamp,
                        row_number() OVER(PARTITION BY device_id ORDER BY timestamp_mins DESC) AS latest_reading_for_device
                    FROM
                        firefighter_sensor_log
                    WHERE device_id LIKE '%Prometeo%'
                    ORDER BY timestamp_mins DESC
                ) device_readings
                WHERE device_readings.latest_reading_for_device = 1
            """

            print("get_dashboard_now - get latest reading for each device")
            cursor.execute(sql)

            print("get_dashboard_now - fetchall")
            data = cursor.fetchall()

            if len(data) > 0:
                print("get_dashboard_now - Hay informacion")
                for i in data:
                    print(i)
                    devices.append({
                        'device_id': i[0],
                        'temperature': i[1],
                        'humidity': i[2],
                        'carbon_monoxide': i[3],
                        'nitrogen_dioxide': i[4],
                        'timestamp_mins': i[5].strftime("%Y-%m-%dT%H:%M:%S"),
                        'device_timestamp': i[6].strftime("%Y-%m-%dT%H:%M:%S"),
                    })

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

        return devices

    def get_dashboard_details(self, device_id, increment, type):
        print("get_dashboard_details - entro en la funcion")

        details = []

        try:
            print("get_dashboard_details - trying")
            conn = mariadb.connect(
                user=os.getenv('MARIADB_USERNAME'),
                password=os.getenv('MARIADB_PASSWORD'),
                host=os.getenv('MARIADB_HOST'),
                database='prometeo',
                port=int(os.getenv('MARIADB_PORT'))
            )

            print("get_dashboard_details - before cursor")
            cursor = conn.cursor()

            print("get_dashboard_details - llamada a sql")
            sql = """
                SELECT 
                    *
                FROM
                    firefighter_status_analytics fsa
                WHERE
                    fsa.device_id = %s 
                ORDER BY device_timestamp DESC
                LIMIT 1;
            """

            print("get_dashboard_details - get latest reading for the device")
            cursor.execute(sql, (device_id, ))

            print("get_dashboard_details - fetchall")
            data = cursor.fetchall()

            if len(data) > 0:
                print("get_dashboard_details - Hay informacion")
                for i in data:
                    print(i)
                    details.append({
                        'device_id': i[2],
                        'temperature': i[4],
                        'humidity': i[5],
                        'carbon_monoxide': i[6],
                        'nitrogen_dioxide': i[7],
                        'timestamp_mins': i[0].strftime("%Y-%m-%dT%H:%M:%S"),
                        'device_timestamp': i[11].strftime("%Y-%m-%dT%H:%M:%S"),
                        'carbon_monoxide_twa_10min': "{:.2f}".format(i[14]),
                        'carbon_monoxide_twa_30min': "{:.2f}".format(i[15]),
                        'carbon_monoxide_twa_60min': "{:.2f}".format(i[16]),
                        'carbon_monoxide_twa_240min': "{:.2f}".format(i[17]),
                        'carbon_monoxide_twa_480min': "{:.2f}".format(i[18]),
                        'carbon_monoxide_gauge_10min': "{:.2f}".format(i[19]),
                        'carbon_monoxide_gauge_30min': "{:.2f}".format(i[20]),
                        'carbon_monoxide_gauge_60min': "{:.2f}".format(i[21]),
                        'carbon_monoxide_gauge_240min': "{:.2f}".format(i[22]),
                        'carbon_monoxide_gauge_480min': "{:.2f}".format(i[23]),
                        'nitrogen_dioxide_twa_10min': "{:.2f}".format(i[24]),
                        'nitrogen_dioxide_twa_30min': "{:.2f}".format(i[25]),
                        'nitrogen_dioxide_twa_60min': "{:.2f}".format(i[26]),
                        'nitrogen_dioxide_twa_240min': "{:.2f}".format(i[27]),
                        'nitrogen_dioxide_twa_480min': "{:.2f}".format(i[28]),
                        'nitrogen_dioxide_gauge_10min': "{:.2f}".format(i[29]),
                        'nitrogen_dioxide_gauge_30min': "{:.2f}".format(i[30]),
                        'nitrogen_dioxide_gauge_60min': "{:.2f}".format(i[31]),
                        'nitrogen_dioxide_gauge_240min': "{:.2f}".format(i[32]),
                        'nitrogen_dioxide_gauge_480min': "{:.2f}".format(i[33])
                    })

            else:
                print("get_dashboard_details - NO HAY INFORMACION")
                return None

        except Exception as e:
            print("get_dashboard_details - Estoy en la excepcion")
            print(e)
            return None

        finally:
            cursor.close()
            conn.close()

        return details

    def get_dashboard_chart_details(self, device_id, increment, type):
        print("get_dashboard_chart_details - entro en la funcion")

        chart = []

        print("get_dashboard_chart_details - device_id:", device_id)
        print("get_dashboard_chart_details - increment:", increment)
        print("get_dashboard_chart_details - type:", type)

        # Default column names
        ty = "carbon_monoxide_twa_"
        inc = "10min"
        limit = 10

        if type == 'NO2':
            ty = "nitrogen_dioxide_twa_"

        # Set these manually rather than on client input
        if increment == '30min':
            inc = '30min'
            limit = 30
        elif increment == '1hr':
            inc = '60min'
            limit = 30
        elif increment == '4hr':
            inc = '240min'
            limit = 240
        elif increment == '8hr':
            inc = '480min'
            limit = 480

        # The one column name to select
        column = ty + inc
        print(column)

        try:
            print("get_dashboard_chart_details - trying")
            conn = mariadb.connect(
                user=os.getenv('MARIADB_USERNAME'),
                password=os.getenv('MARIADB_PASSWORD'),
                host=os.getenv('MARIADB_HOST'),
                database='prometeo',
                port=int(os.getenv('MARIADB_PORT'))
            )

            print("get_dashboard_chart_details - before cursor")
            cursor = conn.cursor()

            print("get_dashboard_chart_details - llamada a sql")
            sql = f"""
                SELECT 
                    timestamp_mins, device_timestamp, {column}
                FROM
                    firefighter_status_analytics
                WHERE
                    device_id = %s 
                ORDER BY device_timestamp DESC
                LIMIT {limit};
            """
            print(sql)

            print("get_dashboard_chart_details - get latest 10 reading for", column)
            cursor.execute(sql, (device_id, ))

            print("get_dashboard_chart_details - fetchall")
            data = cursor.fetchall()

            if len(data) > 0:
                print("get_dashboard_chart_details - Hay informacion")
                for i in data:
                    print(i)
                    chart.append({
                        'timestamp_mins': i[0].strftime("%Y-%m-%dT%H:%M:%S"),
                        'device_timestamp': i[1].strftime("%Y-%m-%dT%H:%M:%S"),
                        'value': "{:.2f}".format(i[2])
                    })

            else:
                print("get_dashboard_chart_details - NO HAY INFORMACION")
                return None

        except Exception as e:
            print("get_dashboard_chart_details - Estoy en la excepcion")
            print(e)
            return None

        finally:
            cursor.close()
            conn.close()

        return chart
