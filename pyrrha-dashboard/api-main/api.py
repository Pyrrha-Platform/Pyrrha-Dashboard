import time
import os
import logging
import mariadb
from flask import Flask, Response, json, request
from .firefighter_manager import firefighter_manager
from .event_manager import event_manager
from .device_manager import device_manager
from .dashboard_manager import dashboard_manager

logger = logging.getLogger('pyrrha')
logger.setLevel(logging.DEBUG)

app = Flask(__name__)


@app.errorhandler(404)
def page_not_found(e):
    return "{ 'message': 'Error: The resource could not be found.' }", 404


@app.errorhandler(500)
def internal_server_error(e):
    return "{ 'message': 'Error: Internal server error.' }", 500

"""
Handled through a JavaScript API for App ID

@app.route('/api-auth/v1/login', methods=['POST'])
def login_user():
    return

@app.route('/api-auth/v1/user', methods=['GET'])
def get_user():
    return

@app.route('/api-auth/v1/logout', methods=['POST'])
def logout_user():
    return

"""

@app.route('/api-main/v1/firefighters', methods=['GET', 'POST'])
def firefighters():

    if request.method == 'GET':
        firefighters = firefighter_manager().get_all_firefighters()
        message = {
            'status': 200,
            'message': 'OK',
            'firefighters': firefighters
        }
        body = json.dumps(message)
        resp = Response(body, status=200, mimetype='application/json')
        return resp

    elif request.method == 'POST':
        created_values = request.get_json()

        # TODO: Better validation
        if created_values['code'].strip() == '' or created_values['first'].strip() == '' or created_values['last'].strip() == '' or created_values['email'].strip() == '':

            message = {
                'status': 400,
                'message': 'Bad request',
            }
            body = json.dumps(message)
            resp = Response(body, status=400, mimetype='application/json')
            return resp

        else:
            firefighter = firefighter_manager().insert_firefighter(
                created_values['code'],
                created_values['first'],
                created_values['last'],
                created_values['email']
            )
            message = {
                'status': 201,
                'message': 'Created',
                'firefighter': firefighter['id']
            }
            body = json.dumps(message)
            resp = Response(body, status=201, mimetype='application/json')
            return resp


@app.route('/api-main/v1/firefighters/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def firefighter_by_id(id):

    if request.method == 'GET':
        firefighter = firefighter_manager().get_firefighter(id)
        message = {
            'status': 200,
            'message': 'OK',
            'firefighter': firefighter
        }
        body = json.dumps(message)
        resp = Response(body, status=200, mimetype='application/json')
        return resp

    elif request.method == 'PUT':
        updated_values = request.get_json()

        # TODO: Better validation
        if updated_values['code'].strip() == '' or updated_values['first'].strip() == '' or updated_values['last'].strip() == '' or updated_values['email'].strip() == '':
            message = {
                'status': 400,
                'message': 'Bad request',
            }
            body = json.dumps(message)
            resp = Response(body, status=400, mimetype='application/json')
            return resp

        else:
            firefighter = firefighter_manager().update_firefighter(
                updated_values['id'],
                updated_values['code'],
                updated_values['first'],
                updated_values['last'],
                updated_values['email']
            )
            message = {
                'status': 200,
                'message': 'Updated',
                'firefighter': firefighter['id']
            }
            body = json.dumps(message)
            resp = Response(body, status=200, mimetype='application/json')
            return resp

    elif request.method == 'DELETE':
        firefighter = firefighter_manager().delete_firefighter(id)
        print(firefighter)
        message = {
            'status': 200,
            'message': 'Deleted',
            'firefighter': firefighter['id']
        }
        body = json.dumps(message)
        resp = Response(body, status=200, mimetype='application/json')
        return resp

    else:
        return "{ 'message': 'Error: No id field provided. Please specify an id.' }"


@app.route('/api-main/v1/events', methods=['GET', 'POST'])
def events():

    if request.method == 'GET':
        events = event_manager().get_all_events()
        message = {
            'status': 200,
            'message': 'OK',
            'events': events
        }
        body = json.dumps(message)
        resp = Response(body, status=200, mimetype='application/json')
        return resp

    elif request.method == 'POST':
        created_values = request.get_json()

        # TODO: Better validation
        if created_values['code'].strip() == '' or created_values['type'].strip() == '' or created_values['date'].strip() == '' or created_values['firefighters'].strip() == '' or created_values['state'].strip() == '':

            message = {
                'status': 400,
                'message': 'Bad request',
            }
            body = json.dumps(message)
            resp = Response(body, status=400, mimetype='application/json')
            return resp

        else:
            event = event_manager().insert_event(
                created_values['code'],
                created_values['type'],
                created_values['date'],
                created_values['firefighters'],
                created_values['state']
            )
            message = {
                'status': 201,
                'message': 'Created',
                'event': event['id']
            }
            body = json.dumps(message)
            resp = Response(body, status=201, mimetype='application/json')
            return resp


@app.route('/api-main/v1/events/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def event_by_id(id):

    if request.method == 'GET':
        event = event_manager().get_event(id)
        message = {
            'status': 200,
            'message': 'OK',
            'event': event
        }
        body = json.dumps(message)
        resp = Response(body, status=200, mimetype='application/json')
        return resp

    elif request.method == 'PUT':
        updated_values = request.get_json()

        # TODO: Better validation
        if updated_values['code'].strip() == '' or updated_values['type'].strip() == '' or created_values['date'].strip() == '' or updated_values['firefighters'].strip() == '' or updated_values['state'].strip() == '':
            message = {
                'status': 400,
                'message': 'Bad request',
            }
            body = json.dumps(message)
            resp = Response(body, status=400, mimetype='application/json')
            return resp

        else:
            event = event_manager().update_event(
                updated_values['id'],
                updated_values['code'],
                updated_values['type'],
                updated_values['date'],
                updated_values['firefighters'],
                updated_values['state']
            )
            message = {
                'status': 200,
                'message': 'Updated',
                'event': event['id']
            }
            body = json.dumps(message)
            resp = Response(body, status=200, mimetype='application/json')
            return resp

    elif request.method == 'DELETE':
        event = event_manager().delete_event(id)
        print(event)
        message = {
            'status': 200,
            'message': 'Deleted',
            'event': event['id']
        }
        body = json.dumps(message)
        resp = Response(body, status=200, mimetype='application/json')
        return resp

    else:
        return "{ 'message': 'Error: No id field provided. Please specify an id.' }"


@app.route('/api-main/v1/devices', methods=['GET', 'POST'])
def devices():

    if request.method == 'GET':
        devices = device_manager().get_all_devices()
        message = {
            'status': 200,
            'message': 'OK',
            'devices': devices
        }
        body = json.dumps(message)
        resp = Response(body, status=200, mimetype='application/json')
        return resp

    elif request.method == 'POST':
        created_values = request.get_json()

        # TODO: Better validation
        if created_values['code'].strip() == '' or created_values['model'].strip() == '' or created_values['version'].strip() == '':

            message = {
                'status': 400,
                'message': 'Bad request',
            }
            body = json.dumps(message)
            resp = Response(body, status=400, mimetype='application/json')
            return resp

        else:
            device = device_manager().insert_device(
                created_values['code'],
                created_values['model'],
                created_values['version']
            )
            message = {
                'status': 201,
                'message': 'Created',
                'device': device['id']
            }
            body = json.dumps(message)
            resp = Response(body, status=201, mimetype='application/json')
            return resp


@app.route('/api-main/v1/devices/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def device_by_id(id):

    if request.method == 'GET':
        device = device_manager().get_device(id)
        message = {
            'status': 200,
            'message': 'OK',
            'device': device
        }
        body = json.dumps(message)
        resp = Response(body, status=200, mimetype='application/json')
        return resp

    elif request.method == 'PUT':
        updated_values = request.get_json()

        # TODO: Better validation
        if updated_values['code'].strip() == '' or updated_values['type'].strip() == '' or updated_values['model'].strip() == '' or updated_values['version'].strip() == '':
            message = {
                'status': 400,
                'message': 'Bad request',
            }
            body = json.dumps(message)
            resp = Response(body, status=400, mimetype='application/json')
            return resp

        else:
            device = device_manager().update_device(
                updated_values['id'],
                updated_values['code'],
                updated_values['model'],
                updated_values['version']
            )
            message = {
                'status': 200,
                'message': 'Updated',
                'device': device['id']
            }
            body = json.dumps(message)
            resp = Response(body, status=200, mimetype='application/json')
            return resp

    elif request.method == 'DELETE':
        device = device_manager().delete_device(id)
        print(device)
        message = {
            'status': 200,
            'message': 'Deleted',
            'device': device['id']
        }
        body = json.dumps(message)
        resp = Response(body, status=200, mimetype='application/json')
        return resp

    else:
        return "{ 'message': 'Error: No id field provided. Please specify an id.' }"


@app.route('/api-main/v1/dashboard-now', methods=['GET'])
def dashboard_now():

    devices = dashboard_manager().get_dashboard_now()
    message = {
        'status': 200,
        'message': 'OK',
        'devices': devices
    }
    body = json.dumps(message)
    resp = Response(body, status=200, mimetype='application/json')
    return resp


@app.route('/api-main/v1/dashboard/<string:device_id>', methods=['GET'])
def get_dashboard_for(device_id):

    firefighter = dashboard_manager().get_dashboard_for(device_id)
    message = {
        'status': 200,
        'message': 'OK',
        'device': device
    }
    body = json.dumps(message)
    resp = Response(body, status=200, mimetype='application/json')
    return resp


@app.route('/api-main/v1/dashboard-details/<string:device_id>/<string:increment>/<string:type>', methods=['GET'])
def get_dashboard_details(device_id, increment='all', type='CO'):

    details = dashboard_manager().get_dashboard_details(
        device_id, increment, type)
    message = {
        'status': 200,
        'message': 'OK',
        'details': details
    }
    body = json.dumps(message)
    resp = Response(body, status=200, mimetype='application/json')
    return resp


@app.route('/api-main/v1/dashboard-chart-details/<string:device_id>/<string:increment>/<string:type>', methods=['GET'])
def get_dashboard_chart_details(device_id, increment='all', type='CO'):

    is_device_active = dashboard_manager().get_dashboard_device_active(device_id)

    if is_device_active:
        print('device is active')
        chart = dashboard_manager().get_dashboard_chart_details(
            device_id, increment, type, 'window')
    else:
        print('device is inactive')
        chart = dashboard_manager().get_dashboard_chart_details(
            device_id, increment, type, 'history')

    message = {
        'status': 200,
        'message': 'OK',
        'chart': chart
    }
    body = json.dumps(message)
    resp = Response(body, status=200, mimetype='application/json')
    return resp
