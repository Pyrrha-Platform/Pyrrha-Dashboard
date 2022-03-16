import mariadb
import os
import logging
from dotenv import load_dotenv


class dashboard_manager(object):
    def __init__(self):
        load_dotenv()
        self._logger = logging.getLogger("pyrrha.dashboard")
        self._logger.setLevel(logging.DEBUG)
        self._logger.debug("creating an instance of dashboards")
        self._user = os.getenv("MARIADB_USERNAME")
        self._password = os.getenv("MARIADB_PASSWORD")
        self._host = os.getenv("MARIADB_HOST")
        self._port = int(os.getenv("MARIADB_PORT"))
        self._database = os.getenv("MARIADB_DATABASE")

    def get_dashboard_for(self, device_id):
        self._logger.debug("get_dashboard - entro en la funcion")

        devices = []

        try:
            self._logger.debug("get_dashboard - trying")

            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
            )

            self._logger.debug("get_dashboard - before cursor")
            cursor = conn.cursor()
            self._logger.debug("get_dashboard - after cursor")

            self._logger.debug("get_dashboard - llamada a sql")

            cursor.execute(
                "SELECT * FROM firefighter_sensor_log WHERE device_id = ? ORDER BY device_timestamp DESC LIMIT 1",
                (device_id,),
            )
            # cursor.callproc('sp_select_firefighter_status_analytics', ('0007', '2000-01-01 04:32:38', 1,))

            self._logger.debug("get_dashboard - sp_select_all_devices")
            data = cursor.fetchall()
            self._logger.debug("get_dashboard - fetchall")
            if len(data) > 0:
                self._logger.debug("get_dashboard - Hay informacion")
                for i in data:
                    # self._logger.debug(i)
                    devices.append(
                        {
                            "timestamp_mins": i[0].strftime("%Y-%m-%dT%H:%M:%S+00:00"),
                            "device_id": i[2],
                            "device_battery_level": i[3],
                            "temperature": i[4],
                            "humidity": i[5],
                            "carbon_monoxide": i[6],
                            "nitrogen_dioxide": i[7],
                            "formaldehyde": i[8],
                            "acrolein": i[9],
                            "benzene": i[10],
                            "device_timestamp": i[11].strftime(
                                "%Y-%m-%dT%H:%M:%S+00:00"
                            ),
                            "device_status_LED": i[12],
                        }
                    )
                # firefighters = data
                conn.close()
            else:
                self._logger.debug("get_dashboard - NO HAY INFORMACION")
                conn.close()
                return None
        except Exception as e:
            self._logger.debug("get_dashboard - Estoy en la excepcion")
            self._logger.debug(e)
            return None

        return devices

    def get_dashboard_now(self):
        self._logger.debug("get_dashboard_now - entro en la funcion")

        devices = []

        try:
            self._logger.debug("get_dashboard_now - trying")
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
            )

            self._logger.debug("get_dashboard_now - before cursor")
            cursor = conn.cursor()

            self._logger.debug("get_dashboard_now - llamada a sql")
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

            self._logger.debug("get_dashboard_now - get latest reading for each device")
            cursor.execute(sql)

            self._logger.debug("get_dashboard_now - fetchall")
            data = cursor.fetchall()

            if len(data) > 0:
                self._logger.debug("get_dashboard_now - Hay informacion")
                for i in data:
                    # self._logger.debug(i)
                    devices.append(
                        {
                            "device_id": i[0],
                            "temperature": i[1],
                            "humidity": i[2],
                            "carbon_monoxide": i[3],
                            "nitrogen_dioxide": i[4],
                            "timestamp_mins": i[5].strftime("%Y-%m-%dT%H:%M:%S+00:00"),
                            "device_timestamp": i[6].strftime(
                                "%Y-%m-%dT%H:%M:%S+00:00"
                            ),
                        }
                    )
                conn.close()
            else:
                self._logger.debug("get_dashboard_now - NO HAY INFORMACION")
                conn.close()
                return None

        except Exception as e:
            self._logger.debug("get_dashboard_now - Estoy en la excepcion")
            self._logger.debug(e)
            return None

        return devices

    def get_dashboard_details(self, device_id, increment, type):
        self._logger.debug("get_dashboard_details - entro en la funcion")

        details = []

        try:
            self._logger.debug("get_dashboard_details - trying")
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
            )

            self._logger.debug("get_dashboard_details - before cursor")
            cursor = conn.cursor()

            self._logger.debug("get_dashboard_details - llamada a sql")
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

            self._logger.debug(
                "get_dashboard_details - get latest reading for the device"
            )
            cursor.execute(sql, (device_id,))

            self._logger.debug("get_dashboard_details - fetchall")
            data = cursor.fetchall()

            if len(data) > 0:
                self._logger.debug("get_dashboard_details - Hay informacion")
                for i in data:
                    # self._logger.debug(i)
                    details.append(
                        {
                            "device_id": i[2],
                            "temperature": i[4],
                            "humidity": i[5],
                            "carbon_monoxide": i[6],
                            "nitrogen_dioxide": i[7],
                            "timestamp_mins": i[0].strftime("%Y-%m-%dT%H:%M:%S+00:00"),
                            "device_timestamp": i[11].strftime(
                                "%Y-%m-%dT%H:%M:%S+00:00"
                            ),
                            "carbon_monoxide_twa_10min": "{:.2f}".format(i[14]),
                            "carbon_monoxide_twa_30min": "{:.2f}".format(i[15]),
                            "carbon_monoxide_twa_60min": "{:.2f}".format(i[16]),
                            "carbon_monoxide_twa_240min": "{:.2f}".format(i[17]),
                            "carbon_monoxide_twa_480min": "{:.2f}".format(i[18]),
                            "carbon_monoxide_gauge_10min": "{:.2f}".format(i[19]),
                            "carbon_monoxide_gauge_30min": "{:.2f}".format(i[20]),
                            "carbon_monoxide_gauge_60min": "{:.2f}".format(i[21]),
                            "carbon_monoxide_gauge_240min": "{:.2f}".format(i[22]),
                            "carbon_monoxide_gauge_480min": "{:.2f}".format(i[23]),
                            "nitrogen_dioxide_twa_10min": "{:.2f}".format(i[24]),
                            "nitrogen_dioxide_twa_30min": "{:.2f}".format(i[25]),
                            "nitrogen_dioxide_twa_60min": "{:.2f}".format(i[26]),
                            "nitrogen_dioxide_twa_240min": "{:.2f}".format(i[27]),
                            "nitrogen_dioxide_twa_480min": "{:.2f}".format(i[28]),
                            "nitrogen_dioxide_gauge_10min": "{:.2f}".format(i[29]),
                            "nitrogen_dioxide_gauge_30min": "{:.2f}".format(i[30]),
                            "nitrogen_dioxide_gauge_60min": "{:.2f}".format(i[31]),
                            "nitrogen_dioxide_gauge_240min": "{:.2f}".format(i[32]),
                            "nitrogen_dioxide_gauge_480min": "{:.2f}".format(i[33]),
                        }
                    )
                conn.close()
            else:
                self._logger.debug("get_dashboard_details - NO HAY INFORMACION")
                conn.close()
                return None

        except Exception as e:
            self._logger.debug("get_dashboard_details - Estoy en la excepcion")
            self._logger.debug(e)
            return None

        return details

    def get_dashboard_chart_details(self, device_id, increment, type, range="window"):
        self._logger.debug("get_dashboard_chart_details - entro en la funcion")

        chart = []

        self._logger.debug("get_dashboard_chart_details - device_id:", device_id)
        self._logger.debug("get_dashboard_chart_details - increment:", increment)
        self._logger.debug("get_dashboard_chart_details - type:", type)

        # Default column names
        ty = "carbon_monoxide_twa_"
        inc = "10min"

        if type == "NO2":
            ty = "nitrogen_dioxide_twa_"

        # Set these manually rather than on client input
        if increment == "30min":
            inc = "30min"
        elif increment == "1hr":
            inc = "60min"
        elif increment == "4hr":
            inc = "240min"
        elif increment == "8hr":
            inc = "480min"

        # The one column name to select
        column = ty + inc
        self._logger.debug(column)

        try:
            self._logger.debug("get_dashboard_chart_details - trying")
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
            )

            self._logger.debug("get_dashboard_chart_details - before cursor")
            cursor = conn.cursor()

            self._logger.debug("get_dashboard_chart_details - llamada a sql")

            # Default, past 8 hours
            sql = f"""
                SELECT 
                    timestamp_mins, device_timestamp, {column}
                FROM
                    firefighter_status_analytics
                WHERE
                    device_id = %s 
                AND 
                    device_timestamp >= DATE_SUB(NOW(), INTERVAL 8 HOUR)
                ORDER BY device_timestamp DESC
            """

            # Otherwise, the last 240 readings
            if range == "history":
                sql = f"""
                    SELECT 
                        timestamp_mins, device_timestamp, {column}
                    FROM
                        firefighter_status_analytics
                    WHERE
                        device_id = %s 
                    ORDER BY device_timestamp DESC
                    LIMIT 240
                """

            self._logger.debug(sql)

            self._logger.debug(
                "get_dashboard_chart_details - get latest readings for", column
            )
            cursor.execute(sql, (device_id,))

            self._logger.debug("get_dashboard_chart_details - fetchall")
            data = cursor.fetchall()

            if len(data) > 0:
                self._logger.debug("get_dashboard_chart_details - Hay informacion")
                for i in data:
                    # self._logger.debug(i)
                    chart.append(
                        {
                            "timestamp_mins": i[0].strftime("%Y-%m-%dT%H:%M:%S+00:00"),
                            "device_timestamp": i[1].strftime(
                                "%Y-%m-%dT%H:%M:%S+00:00"
                            ),
                            "value": "{:.2f}".format(i[2]),
                        }
                    )
                conn.close()
            else:
                self._logger.debug("get_dashboard_chart_details - NO HAY INFORMACION")
                conn.close()
                return None

        except Exception as e:
            self._logger.debug("get_dashboard_chart_details - Estoy en la excepcion")
            self._logger.debug(e)
            return None

        return chart

    def get_dashboard_device_active(self, device_id):

        self._logger.debug("get_dashboard_device_active - entro en la funcion")

        device_active = True

        try:
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
            )

            cursor = conn.cursor()

            sql = f"""
                SELECT 
                    device_timestamp 
                FROM 
                    firefighter_status_analytics 
                WHERE 
                    device_id = %s
                AND 
                    device_timestamp >= DATE_SUB(NOW(), INTERVAL 8 HOUR)
            """
            cursor.execute(sql, (device_id,))

            data = cursor.fetchone()

            if len(data) > 0:
                device_active = True
            else:
                device_active = False

            conn.close()

        except Exception as e:
            return None

        return device_active

    def get_map_now(self):
        self._logger.debug("get_map_now - entro en la funcion")

        # TODO: Store/get latitude and longitude from the database

        map = []

        try:
            self._logger.debug("get_map_now - trying")
            conn = mariadb.connect(
                user=self._user,
                password=self._password,
                host=self._host,
                database=self._database,
                port=self._port,
            )

            self._logger.debug("get_map_now - before cursor")
            cursor = conn.cursor()

            self._logger.debug("get_map_now - llamada a sql")
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

            self._logger.debug("get_map_now - get latest reading for each device")
            cursor.execute(sql)

            self._logger.debug("get_map_now - fetchall")
            data = cursor.fetchall()

            if len(data) > 0:
                self._logger.debug("get_map_now - Hay informacion")
                for i in data:
                    # self._logger.debug(i)

                    """
                    # TODO: Hardcoded to Barcelona's lat/long for now
                    map.append(
                        {
                            "device_id": i[0],
                            "temperature": i[1],
                            "humidity": i[2],
                            "carbon_monoxide": i[3],
                            "nitrogen_dioxide": i[4],
                            "timestamp_mins": i[5].strftime("%Y-%m-%dT%H:%M:%S+00:00"),
                            "device_timestamp": i[6].strftime(
                                "%Y-%m-%dT%H:%M:%S+00:00"
                            ),
                            "latitude": "41.390205",
                            "longitude": "2.154007",
                        }
                    )
                    """

                # Hardcoded for now
                map = {
                    "devices": [
                        {
                            "carbon_monoxide": 10.0,
                            "firefighter_code": "Graf 7",
                            "firefighter_email": "graf0007@graf.cat",
                            "firefighter_first": "Bombero",
                            "device_id": "Prometeo:00:00:00:00:00:07",
                            "firefighter_last": "Graf 7",
                            "humidity": 46,
                            "nitrogen_dioxide": 0.55,
                            "temperature": 41,
                            "latitude": 41.364031,
                            "longitude": 1.831706,
                            "timestamp_mins": "Tue, 11 Mar 2022 10:58:00 GMT",
                            "id": "Prometeo:00:00:00:00:00:07",
                            "device_version": 1,
                            "lastCheckin": "Tue, 11 Mar 2022 10:58:00 GMT",
                            "isUserOwner": True,
                        },
                        {
                            "carbon_monoxide": 10.0,
                            "firefighter_code": "Graf 3",
                            "firefighter_email": "graf0003@graf.cat",
                            "firefighter_first": "Bombero",
                            "device_id": "Prometeo:00:00:00:00:00:03",
                            "firefighter_last": "Graf 3",
                            "humidity": 67,
                            "nitrogen_dioxide": 0.5,
                            "temperature": 33,
                            "latitude": 40.486027649186646,
                            "longitude": 0.2514942041995945,
                            "timestamp_mins": "Tue, 11 Feb 2022 10:56:00 GMT",
                            "id": "Prometeo:00:00:00:00:00:03",
                            "device_version": 1,
                            "lastCheckin": "Tue, 11 Feb 2022 10:58:00 GMT",
                            "isUserOwner": True,
                        },
                        {
                            "carbon_monoxide": 10.0,
                            "firefighter_code": "Graf 5",
                            "firefighter_email": "graf0003@graf.cat",
                            "firefighter_first": "Bombero",
                            "device_id": "Prometeo:00:00:00:00:00:05",
                            "firefighter_last": "Graf 5",
                            "humidity": 67,
                            "nitrogen_dioxide": 0.5,
                            "temperature": 33,
                            "latitude": 39.552386966400555,
                            "longitude": -0.41370484730314183,
                            "timestamp_mins": "Tue, 13 Mar 2022 10:56:00 GMT",
                            "id": "Prometeo:00:00:00:00:00:05",
                            "device_version": 1,
                            "lastCheckin": "Tue, 13 Mar 2022 10:58:00 GMT",
                            "isUserOwner": True,
                        },
                    ]
                }

                conn.close()
            else:
                self._logger.debug("get_map_now - NO HAY INFORMACION")
                conn.close()
                return None

        except Exception as e:
            self._logger.debug("get_map_now - Estoy en la excepcion")
            self._logger.debug(e)
            return None

        return map
