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
            'firefighter': request.get_json()['id']
        }
        body = json.dumps(message)
        resp = Response(body, status=201, mimetype='application/json')
        return resp

@app.route('/api/v1/firefighters/<string:id>', methods=['GET', 'PUT', 'DELETE'])
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
            'firefighter': id
        }
        body = json.dumps(message)
        resp = Response(body, status=200, mimetype='application/json')
        return resp

    elif request.method == 'DELETE':
        firefighter = firefighter_manager().delete_firefighter(request.get_json())
        message = {
            'status': 200,
            'message': 'Deleted',
            'firefighter': id
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



def add_firefighter(data):

    firefighter = None

    id = data['id']
    first = data['first']
    last = data['last']
    email = data['email']

    print(id)
    print(first)
    print(last)
    print(email)

    try:
        conn = mariadb.connect(
            user = os.getenv("MARIADB_USERNAME"),
            password = os.getenv("MARIADB_PASSWORD"),
            host = os.getenv("MARIADB_HOST"),
            database = "prometeo",
            port = int(os.getenv("MARIADB_PORT"))
        )

        cursor = conn.cursor()
        
        print("Add firefighter")
        cursor.execute('INSERT INTO newfirefighters (id, first, last, email) VALUES (?, ?, ?, ?)', (id, first, last, email))
        if cursor.lastrowid() > 0:
            print("firefighters - Added firefighter")
            conn.commit()
        else:
            print("firefighters - No firefighter added")
            return None

    except mariadb.Error as f:
        print("Error connecting to MariaDB:")
        print(f)

    except Exception as e:
        print('Error making the update')
        print(e)
        return None

    finally:
        cursor.close()
        conn.close()

    return firefighter


def update_firefighter(data):

    firefighter = None

    print(data)

    try:
        conn = mariadb.connect(
            user = os.getenv("MARIADB_USERNAME"),
            password = os.getenv("MARIADB_PASSWORD"),
            host = os.getenv("MARIADB_HOST"),
            database = "prometeo",
            port = int(os.getenv("MARIADB_PORT"))
        )

        cursor = conn.cursor()

        print("Update firefighter")
        cursor.execute('UPDATE newfirefighters SET (id = ?, first = ?, last = ?, email = ?) WHERE id = ?', (id, first, last, email, id))
        data = cursor.fetchall()
        if len(data[0][0]) == 0:
            print("firefighter - Updated firefighter")
            print(data)
           
        else:
            print("firefighters - firefighter not updated")
            return None

    except mariadb.Error as f:
        print("Error connecting to MariaDB:")
        print(f)
            #sys.exit(1)

    except Exception as e:
        print('Error getting the data')
        print(e)
        return None

    finally:
        cursor.close()
        conn.close()

    return firefighter


def delete_firefighter(id):

    firefighter = None

    try:
        conn = mariadb.connect(
            user = os.getenv("MARIADB_USERNAME"),
            password = os.getenv("MARIADB_PASSWORD"),
            host = os.getenv("MARIADB_HOST"),
            database = "prometeo",
            port = int(os.getenv("MARIADB_PORT"))
        )

        cursor = conn.cursor()

        print("Update firefighter")
        cursor.execute('DELETE FROM newfirefighters WHERE id = ?', (id,))
        data = cursor.fetchall()
        if len(data[0][0]) == 0:
            print("firefighter - Deleted firefighter")
            print(data)
           
        else:
            print("firefighters - firefighter not deleted")
            return None

    except mariadb.Error as f:
        print("Error connecting to MariaDB:")
        print(f)
            #sys.exit(1)

    except Exception as e:
        print('Error getting the data')
        print(e)
        return None

    finally:
        cursor.close()
        conn.close()

    return firefighter