This repository contains the [Prometeo](https://github.com/Code-and-Response/Prometeo) solution next generation in progress dashboard built on the Carbon Design System, React, Node.js, and Flask. 

The dashboard shows the real-time and long-term averages of firefighter exposure to carbon monoxide, nitrogen dioxide, temperature, and humidity. 

It also provides a way to create, read, update and delete devices and events, though these aren't currently used.

[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) [![Slack](https://img.shields.io/badge/Join-Slack-blue)](https://callforcode.org/slack)

## Setting up the solution

### Code overview

* The code is in a subdirectory as React does not support mixed case directories such as this top-level repo. The database backend for the React project is based on Python using Flask and was originally created based on this [great post and series from Miguel Grinberg](https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project). The authentication backend is a Node.js app that uses the IBM App ID service.

### Create services

* Create a MySQL or MariaDB database service then use the SQL file in the [Prometeo Database](https://github.com/Call-for-Code/Prometeo-Database) repo to create your database instance. 
* Provision an IBM App ID service instance and create a user and password within a registry and generate service credentials. Access is currently based only on authentication, there aren't separate access control tiers (such as admin, reader, etc).

### Update configuration files

* Create an `.env` file from the `/api-main/env.example` file and include your database connection settings. This file is hidden by `.gitignore`.
* Set up your Python `/api-main/venv` environment as shown in the blog post above. Then install the requirements.
* Create a `vcap-local.json` file from the `/api-auth/vcap-local.json` file and include your App ID settings. This file is hidden by `.gitignore`.
* Update the WebSockets endpoint in `src/Utils/Constants.js` and review the file for any other changes you want to make.

### Start the local development services

* Start the back-end Flask API services with the command in the package.json file set of NPM scripts, in this case `start-main-api`. This will launch a server on port 5000, proxied through the front end port 3000 for the `/api-main/v1/` path.
* Start the back-end Node.js API services with the command in the package.json file set of NPM scripts, in this case `start-auth-api`. This will launch a server on port 4000, proxied through the front end port 3000 for the `/api-auth/v1/` path.
* Start the front-end user React user interface with the build and run commands in the [package.json](https://github.com/Call-for-Code/Prometeo-Dashboard/blob/master/prometeo-dashboard/package.json#L35) file set of NPM scripts, in this case `start-ui`. This will automatically open a web brower at [http://localhost:3000](http://localhost:3000)
* Log into the UI using your App ID user.

### Deploy to the IBM Cloud

TBD

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting Prometeo pull requests.

## License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details.
