This repository contains the [Prometeo](https://github.com/Code-and-Response/Prometeo) solution next generation in progress dashboard built on Carbon, React, and Flask. The dashboard shows the real-time and long-term averages of firefighter exposure to carbon monoxide, nitrogen dioxide, temperature, and humidity. It also provides a way to create, read, update and delete devices and events.

[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) [![Slack](https://img.shields.io/badge/Join-Slack-blue)](https://callforcode.org/slack)

## Setting up the solution

* The code is in a subdirectory as React does not support mixed case directories such as this top-level repo. The backend for the React project is based on Python using Flask and was originally created based on this [great post and series from Miguel Grinberg](https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project).
* Create a MySQL or MariaDB database service then use the SQL file in the [Prometeo Database](https://github.com/Call-for-Code/Prometeo-Database) repo to create your database instance.
* Create an `.env` file from the `env.example` file and include your database connection settings. This file is hidden by `.gitignore`.
* Set up your Python `venv` environment as shown in the blog post above. Then install the requirements.
* Start the back-end Flask API services with the command in the package.json file set of NPM scripts. 
* Start the front-end user React user interface with the build and run commands in the [package.json](https://github.com/Call-for-Code/Prometeo-Dashboard/blob/master/prometeo-dashboard/package.json#L35) file set of NPM scripts. This will automatically open a web brower at [http://localhost:3000](http://localhost:3000)


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting Prometeo pull requests.

## License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details.
