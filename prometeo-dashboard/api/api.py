import time
import os
import logging
import mariadb
from flask import Flask, Response, json, request
from .firefighter_manager import firefighter_manager

logger = logging.getLogger('prometeo')
logger.setLevel(logging.DEBUG)

app = Flask(__name__)

@app.route('/api/v1/firefighters', methods=['GET', 'POST'])
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
        print(request.get_json())
        firefighter = firefighter_manager().insert_firefighter(request.get_json())
        message = {
            'status': 201,
            'message': 'Created',
            'firefighter': firefighter.id
        }
        body = json.dumps(message)
        resp = Response(body, status=201, mimetype='application/json')
        return resp

@app.route('/api/v1/firefighters/<int:id>', methods=['GET', 'PUT', 'DELETE'])
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
        firefighter = firefighter_manager().update_firefighter(request.get_json())
        message = {
            'status': 200,
            'message': 'Updated',
            'firefighter': firefighter.id
        }
        body = json.dumps(message)
        resp = Response(body, status=200, mimetype='application/json')
        return resp

    elif request.method == 'DELETE':
        firefighter = firefighter_manager().delete_firefighter(request.get_json())
        message = {
            'status': 200,
            'message': 'Deleted',
            'firefighter': firefighter.id
        }
        body = json.dumps(message)
        resp = Response(body, status=200, mimetype='application/json')
        return resp

    else:
        return "{ 'message': 'Error: No id field provided. Please specify an id.' }"

@app.errorhandler(404)
def page_not_found(e):
    return "{ 'message': 'Error: The resource could not be found.' }", 404

@app.errorhandler(500)
def internal_server_error(e):
    return "{ 'message': 'Error: Internal server error.' }", 500
