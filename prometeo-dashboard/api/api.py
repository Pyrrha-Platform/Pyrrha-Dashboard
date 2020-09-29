import time
from flask import Flask, Response, json, request

app = Flask(__name__)

@app.route('/api/v1/firefighters', methods=['GET', 'POST'])
def firefighters():
    if request.method == 'GET':
        firefighters = [
            {'id': 'GRAF001', 'first': 'Joan', 'last': 'Herrera', 'email': 'graf001@graf.cat'}, 
            {'id': 'GRAF002', 'first': 'Marco', 'last': 'Rodriguez', 'email': 'graf002@graf.cat'}, 
            {'id': 'GRAF003', 'first': 'Marisol', 'last': 'Santillan', 'email': 'graf003@graf.cat'}, 
            {'id': 'GRAF004', 'first': 'Upkarno', 'last': 'Lidderez', 'email': 'graf004@graf.cat'}
        ]
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
        message = {
            'status': 201,
            'message': 'Created',
            'firefighter': request.get_json()['id']
        }
        body = json.dumps(message)
        resp = Response(body, status=201, mimetype='application/json')
        return resp

@app.route('/api/v1/firefighters/<string:id>', methods=['GET', 'PUT', 'DELETE'])
def firefighter_by_id(id):
    if request.method == 'GET':
        # Fetch from database
        firefighter = {'id': 'GRAF001', 'first': 'Joan', 'last': 'Herrera', 'email': 'graf001@graf.cat'}
        message = {
            'status': 200,
            'message': 'OK',
            'firefighter': firefighter
        }
        body = json.dumps(message)
        resp = Response(body, status=200, mimetype='application/json')
        return resp

    elif request.method == 'PUT':
        # Update database
        message = {
            'status': 200,
            'message': 'Updated',
            'firefighter': id
        }
        body = json.dumps(message)
        resp = Response(body, status=200, mimetype='application/json')
        return resp

    elif request.method == 'DELETE':
        # Update database
        message = {
            'status': 200,
            'message': 'Deleted',
            'firefighter': id
        }
        body = json.dumps(message)
        resp = Response(body, status=200, mimetype='application/json')
        return resp

    else:
        return "Error: No id field provided. Please specify an id."

@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404

@app.errorhandler(500)
def page_not_found(e):
    return "<h1>500</h1><p>Internal server error.</p>", 500