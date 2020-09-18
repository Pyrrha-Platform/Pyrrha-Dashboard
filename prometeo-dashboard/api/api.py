import time
from flask import Flask

app = Flask(__name__)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/v1/firefighters', methods=['GET'])
def get_all_firefighters():
    return [{'firefighter': 1}, {'firefighter': 2}, {'firefighter': 3}]

@app.route('/api/v1/firefighters/<int:id>', methods=['GET'])
def get_firefighter_by_id():
    if 'id' in request.args:
        id = int(request.args['id'])
        return {'firefighter': id}
    else:
        return "Error: No id field provided. Please specify an id."

@app.route('/api/v1/firefighter', methods=['POST'])
def add_firefighter():
    return {'created': 1}


@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404

@app.errorhandler(500)
def page_not_found(e):
    return "<h1>500</h1><p>Internal server error.</p>", 500