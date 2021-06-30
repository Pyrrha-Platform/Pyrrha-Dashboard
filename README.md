# Pyrrha dashboard

this repository contains the [Pyrrha](https://github.com/Pyrrha-Platform/Pyrrha) solution next generation in progress dashboard built on the Carbon Design System, React, Node.js, and Flask.

The dashboard shows the real-time and long-term averages of firefighter exposure to carbon monoxide, nitrogen dioxide, temperature, and humidity.

It also provides a way to create, read, update and delete devices and events, though these aren't currently used.

[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) [![Slack](https://img.shields.io/badge/Join-Slack-blue)](https://callforcode.org/slack)

## Setting up the solution

### Code overview

The code is in a `pyrrha-dashboard` subdirectory as React does not support mixed case directories such as this top-level repo. All the instructions below assume you're in that directory.

The database backend for the React project is based on Python using Flask and was originally created based on this [great post and series from Miguel Grinberg](https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project).

The authentication backend is a Node.js app that uses the IBM App ID service, reused from another Call for Code project, [OpenEEW](https://github.com/openeew/openeew-dashboard).

### Create services

- Create a MySQL or MariaDB database service then use the SQL file in the [Pyrrha Database](https://github.com/Call-for-Code/Prometeo-Database) repo to create the structure and populate your database instance.
- Provision an IBM App ID service instance and create a user and password within a registry and generate service credentials. Access is currently based only on authentication, there aren't [separate authorization control tiers](https://github.com/Call-for-Code/Prometeo-Dashboard/issues/24) (such as admin, reader, etc).

### Update configuration files

- Create an `.env` file from the `/api-main/.env.example` file and include your database connection settings. This file is hidden by `.gitignore`.
- Set up your Python `/api-main/venv` environment as shown in the blog post above. Then install the requirements.
- Create a `vcap-local.json` file from the `/api-auth/vcap-local.json` file and include your App ID settings. This file is hidden by `.gitignore`.
- Update the WebSockets endpoint in `src/Utils/Constants.js` and review that file for any other changes you want to make.

### Start the local development services

- NOTE: This assumes everything is running in a local development environment on a single `localhost`, if you are deploying the services separately, update the proxy and CORS settings in `src/setupProxy.js`
- Ensure you have a MariaDB or MySQL client installed on your workstation. If you're using macOS, you can [follow these instructions](https://mariadb.com/kb/en/installing-mariadb-on-macos-using-homebrew/).
- Start the back-end Flask API services with the command in the `package.json` file set of NPM scripts, in this case `start-main-api`. This will launch a server on port 5000, proxied through the front end port 3000 for the `/api-main/v1/` path.
- Start the back-end Node.js API services with the command in the `package.json` file set of NPM scripts, in this case `start-auth-api`. This will launch a server on port 4000, proxied through the front end port 3000 for the `/api-auth/v1/` path.
- Build (`npm run setup`) and start the front-end user React user interface with the command in the [package.json](https://github.com/Call-for-Code/Prometeo-Dashboard/blob/master/prometeo-dashboard/package.json#L35) file set of NPM scripts, in this case `start-ui`. This will automatically open a web brower at [http://localhost:3000](http://localhost:3000)
- If you have [security enabled](https://github.com/Call-for-Code/Prometeo-Dashboard/blob/master/prometeo-dashboard/src/utils/Constants.js#L9), log into the UI using your App ID user. You will want to save your credentials in your browser as changes during development will destroy the session and cause you to reauthenticate often.

### Deploy to the IBM Cloud

On the IBM Cloud Kubernetes Service, this application is hosted as [three microservices](https://github.com/Call-for-Code/Prometeo-Dashboard/tree/master/prometeo-dashboard/k8s).

### Files

#### User interface (React)

- `src/components` - The React components used by the app, including Carbon and custom widgets.
- `src/content` - The React pages and custom styling for each page.
- `src/context` - The React stateful variables.
- `src/hooks` - The API access clients.
- `src/locales` - The localization files. They are also enabled in other files, such as the header widget.
- `src/utils` - Configuration, thresholds, and common functions.

#### Main API (Python Flask)

- `api-main/apy.py` - The main REST controller.
- `api-main/*_manager` - The models for data access for a given entity.

#### Authentication API (Node.js)

- `api-auth/server.js` - The main REST controller.
- `api-auth/rest` - Defines the REST routes.
- `api-auth/services` - Various utilities for interactiong with App ID.

### Pages

Currently the dashboard takes a device-centric view of the current readings. These readings can be correlated with a particular firefighter who was assigned the device. This separation is intentional at the moment in order to preserve identity privacy in the current implementation. This mapping, and the thresholds used by the system are controlled by the firefighter department medical professional.

- Dashboard (`/`) - Lists the currently connected devices (by default, those named starting with "Pyrrha-"). It shows the latest reading for the device, whether from the database or from a WebSocket message. Devices with notifications that have been received in the last minute are highlighted. Devices with dangerous long-term averages are also highlighted.
- Details (`/details/[device-mac]`) - Clicking into a specific device will show its current status and provide options for reading averages over time, such as 10, 30, and 60 minute averages, as well as 4 and 8 hour averages.
- Events (`/events`) - List, edit, add, delete events.
- Devices (`/devices`) - List, edit, add, delete devices.
- Firefighters (`/firefighters`) - List, edit, add, delete firefighters.
- Profile (`/profile`) - Show's the read only view of the logged in user.
- Languages (right masthead switcher) - Toggles between English, Spanish, and Catalan.

### Screenshots

#### Full view of connected devices in Spanish

![es-dashboard.png](/img/es-dashboard.png)

#### Full view of connected devices in English

![en-dashboard.png](/img/en-dashboard.png)

#### Full latest averages in Catalan

![ca-details.png](/img/ca-details.png)

#### Carbon monoxide 30 minute view in English

![en-30mn-co.png](/img/en-30mn-co.png)

#### Nitrogen dioxide 1 hour view in Catalan

![dashboard-events.png](/img/ca-1hr-no2.png)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting Pyrrha pull requests.

## License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details.
