import time
from flask import Flask
from flask import jsonify

app = Flask(__name__)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/v1/firefighters', methods=['GET'])
def get_all_firefighters():
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
    resp = jsonify(message)
    resp.status_code = 200
    print(resp)
    return resp

@app.route('/api/v1/firefighters/<string:id>', methods=['GET'])
def get_firefighter_by_id():
    if 'id' in request.args:
        id = int(request.args['id'])
        firefighter = {'id': 'GRAF001', 'first': 'Joan', 'last': 'Herrera', 'email': 'graf001@graf.cat'}
        message = {
            'status': 200,
            'message': 'OK',
            'firefighter': firefighter
        }
        resp = jsonify(message)
        resp.status_code = 200
        print(resp)
        return resp
    else:
        return "Error: No id field provided. Please specify an id."

@app.route('/api/v1/firefighter', methods=['POST'])
def add_firefighter():
        message = {
            'status': 201,
            'message': 'Created',
            'firefighter': 'GRAF001'
        }
        resp = jsonify(message)
        resp.status_code = 201
        print(resp)
        return resp


@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404

@app.errorhandler(500)
def page_not_found(e):
    return "<h1>500</h1><p>Internal server error.</p>", 500