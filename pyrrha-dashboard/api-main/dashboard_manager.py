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

            self._logger.debug("get_dashboard_for - llamada a sql")

            cursor.execute(
                "SELECT * FROM firefighter_device_log WHERE device_id = ? ORDER BY device_timestamp DESC LIMIT 1",
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
                            "device_status_led": i[12],
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
                SELECT 
                    device_readings.*,
                    d.name as device_name
                FROM (
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
                        firefighter_device_log
                    ORDER BY timestamp_mins DESC
                ) device_readings
                LEFT JOIN devices d ON d.device_id = device_readings.device_id
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
                            "device_name": i[8] if i[8] else f"Device {i[0]}",
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
                    fsa.*,
                    COALESCE(d.name, CONCAT('Device ', fsa.device_id)) as device_name
                FROM
                    firefighter_status_analytics fsa
                LEFT JOIN devices d ON d.device_id = fsa.device_id
                WHERE
                    fsa.device_id = %s 
                ORDER BY device_timestamp DESC
                LIMIT 1;
            """

            self._logger.debug(
                "get_dashboard_details - get latest reading for the device"
            )
            cursor.execute(sql, (int(device_id),))

            self._logger.debug("get_dashboard_details - fetchall")
            data = cursor.fetchall()

            if len(data) > 0:
                self._logger.debug("get_dashboard_details - Hay informacion")
                for i in data:
                    # self._logger.debug(i)
                    details.append(
                        {
                            "device_id": device_id,  # Use the actual device_id parameter passed to the function
                            "device_name": i[66] if len(i) > 66 and i[66] else i[65],  # Use device_name from JOIN, fallback to device string
                            "temperature": i[4],
                            "humidity": i[5],
                            "carbon_monoxide": i[6],
                            "nitrogen_dioxide": i[7],
                            "timestamp_mins": i[1].strftime("%Y-%m-%dT%H:%M:%S+00:00"),  # timestamp_mins is index 1
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

        self._logger.debug(f"get_dashboard_chart_details - device_id: {device_id}")
        self._logger.debug(f"get_dashboard_chart_details - increment: {increment}")
        self._logger.debug(f"get_dashboard_chart_details - type: {type}")

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
                f"get_dashboard_chart_details - get latest readings for {column}"
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
                SELECT 
                    device_readings.*,
                    d.latitude,
                    d.longitude
                FROM (
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
                        firefighter_device_log
                    ORDER BY timestamp_mins DESC
                ) device_readings
                LEFT JOIN devices d ON d.device_id = device_readings.device_id
                WHERE device_readings.latest_reading_for_device = 1
            """

            self._logger.debug("get_map_now - get latest reading for each device")
            cursor.execute(sql)

            self._logger.debug("get_map_now - fetchall")
            data = cursor.fetchall()

            if len(data) > 0:
                self._logger.debug("get_map_now - Hay informacion")
                devices = []
                for i in data:
                    self._logger.debug(f"Processing device data: {i}")
                    
                    # Extract data from query result
                    # Query returns: device_id, temperature, humidity, carbon_monoxide, nitrogen_dioxide, 
                    # timestamp_mins, device_timestamp, latest_reading_for_device, latitude, longitude
                    device_data = {
                        "device_id": str(i[0]),
                        "id": str(i[0]),
                        "temperature": float(i[1]) if i[1] is not None else 0.0,
                        "humidity": float(i[2]) if i[2] is not None else 0.0,
                        "carbon_monoxide": float(i[3]) if i[3] is not None else 0.0,
                        "nitrogen_dioxide": float(i[4]) if i[4] is not None else 0.0,
                        "timestamp_mins": i[5].strftime("%Y-%m-%dT%H:%M:%S+00:00") if i[5] else None,
                        "device_timestamp": i[6].strftime("%Y-%m-%dT%H:%M:%S+00:00") if i[6] else None,
                        "lastCheckin": i[5].strftime("%Y-%m-%dT%H:%M:%S+00:00") if i[5] else None,
                        "latitude": float(i[8]) if i[8] is not None else None,
                        "longitude": float(i[9]) if i[9] is not None else None,
                        "device_version": 1,
                        "isUserOwner": True,
                        "firefighter_code": f"Device {str(i[0])[-2:]}",
                        "firefighter_email": f"device{str(i[0])[-2:]}@pyrrha.com",
                        "firefighter_first": "Device",
                        "firefighter_last": f"User {str(i[0])[-2:]}"
                    }
                    devices.append(device_data)
                
                map = {"devices": devices}

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
