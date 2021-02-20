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

            # firefighter_id is actually what the firefighter_code in the firefighters table
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

            # firefighter_id is actually what the firefighter_code in the firefighters table
            print("get_dashboard_now - llamada a sql")
            sql = """
                SELECT 
                    f.firefighter_code,
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
                ) fsl ON fsl.firefighter_id = f.firefighter_code
                WHERE deleted_at IS NULL 
            """

            print("get_dashboard_now - get latest reading for each firefighters")
            cursor.execute(sql)

            print("get_dashboard_now - fetchall")
            data = cursor.fetchall()

            if len(data) > 0:
                print("get_dashboard_now - Hay informacion")
                for i in data:
                    print(i)
                    firefighters.append({
                        'firefighter_id': i[0],
                        'firefighter_first': i[1],
                        'firefighter_last': i[2],
                        'firefighter_code': i[0],
                        'firefighter_email': i[3],
                        'device_id': i[4],
                        'temperature': i[5],
                        'humidity': i[6],
                        'carbon_monoxide': i[7],
                        'nitrogen_dioxide': i[8],
                        'timestamp_mins': i[9],
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

        return firefighters

    def get_dashboard_details(self, firefighter_id, increment, type):
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
                    firefighter_status_analytics fsa, firefighters f
                WHERE
                    fsa.firefighter_id = %s 
                AND
                    fsa.firefighter_id = f.firefighter_code
                ORDER BY device_timestamp DESC
                LIMIT 1;
            """

            print("get_dashboard_details - get latest reading for each firefighters")
            cursor.execute(sql, (firefighter_id, ))

            print("get_dashboard_details - fetchall")
            data = cursor.fetchall()

            if len(data) > 0:
                print("get_dashboard_details - Hay informacion")
                for i in data:
                    print(i)
                    details.append({
                        'firefighter_id': i[65],
                        'firefighter_first': i[66],
                        'firefighter_last': i[67],
                        'firefighter_code': i[65],
                        'firefighter_email': i[68],
                        'device_id': i[2],
                        'temperature': i[4],
                        'humidity': i[5],
                        'carbon_monoxide': i[6],
                        'nitrogen_dioxide': i[7],
                        'timestamp_mins': i[0],
                        'deviceTimestamp': i[11],
                        'carbon_monoxide_twa_10min': "{:.2f}".format(i[14]),
                        'carbon_monoxide_twa_30min': "{:.2f}".format(i[15]),
                        'carbon_monoxide_twa_60min': "{:.2f}".format(i[16]),
                        'carbon_monoxide_twa_240min': "{:.2f}".format(i[17]),
                        'carbon_monoxide_twa_480min': "{:.2f}".format(i[18]),
                        'carbon_monoxideGauge10min': "{:.2f}".format(i[19]),
                        'carbon_monoxideGauge30min': "{:.2f}".format(i[20]),
                        'carbon_monoxideGauge60min': "{:.2f}".format(i[21]),
                        'carbon_monoxideGauge240min': "{:.2f}".format(i[22]),
                        'carbon_monoxideGauge480min': "{:.2f}".format(i[23]),
                        'nitrogen_dioxide_twa_10min': "{:.2f}".format(i[24]),
                        'nitrogen_dioxide_twa_30min': "{:.2f}".format(i[25]),
                        'nitrogen_dioxide_twa_60min': "{:.2f}".format(i[26]),
                        'nitrogen_dioxide_twa_240min': "{:.2f}".format(i[27]),
                        'nitrogen_dioxide_twa_480min': "{:.2f}".format(i[28]),
                        'nitrogen_dioxideGauge10min': "{:.2f}".format(i[29]),
                        'nitrogen_dioxideGauge30min': "{:.2f}".format(i[30]),
                        'nitrogen_dioxideGauge60min': "{:.2f}".format(i[31]),
                        'nitrogen_dioxideGauge240min': "{:.2f}".format(i[32]),
                        'nitrogen_dioxideGauge480min': "{:.2f}".format(i[33])
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

    def get_dashboard_chart_details(self, firefighter_id, increment, type):
        print("get_dashboard_chart_details - entro en la funcion")

        chart = []

        print("get_dashboard_chart_details - firefighter_id:", firefighter_id)
        print("get_dashboard_chart_details - increment:", increment)
        print("get_dashboard_chart_details - type:", type)

        # Default column names
        ty = "carbon_monoxide_twa_"
        inc = "10min"

        if type == 'NO2':
            ty = "nitrogen_dioxide_twa_"

        # Set these manually rather than on client input
        if increment == '30min':
            inc = '30min'
        elif increment == '1hr':
            inc = '60min'
        elif increment == '4hr':
            inc = '240min'
        elif increment == '8hr':
            inc = '480min'

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
                    firefighter_id = %s 
                ORDER BY device_timestamp DESC
                LIMIT 10;
            """
            print(sql)

            print("get_dashboard_chart_details - get latest 10 reading for", column)
            cursor.execute(sql, (firefighter_id, ))

            print("get_dashboard_chart_details - fetchall")
            data = cursor.fetchall()

            if len(data) > 0:
                print("get_dashboard_chart_details - Hay informacion")
                for i in data:
                    print(i)
                    chart.append({
                        'timestamp_mins': i[0].strftime("%Y-%m-%dT%H:%M:%S"),
                        'deviceTimestamp': i[1].strftime("%Y-%m-%dT%H:%M:%S"),
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
