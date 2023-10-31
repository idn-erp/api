Backend API for IDN ERP
=====================================

This document contains information about the backend API of \[Your Project Name\]. The API is developed using Node.js, Express, and MySQL, and it offers various endpoints for handling authentication, executing stored procedures, and managing file attachments.

Table of Contents
-----------------

*   [Features](#features)
*   [Getting Started](#getting-started)
*   [API Endpoints](#api-endpoints)
*   [Model Synchronization](#model-synchronization)
*   [Usage](#usage)
*   [License](#license)

## Features
--------

*   User authentication
*   Execution of stored procedures for database interactions
*   Handling of file attachments
*   CORS support for cross-origin requests

## Getting Started
---------------

To set up and run the backend API on your local machine, follow these steps:

1.  Clone the repository to your local machine:
```bash
git clone https://github.com/idn-erp/api.git
```
2.  Install the required dependencies:
```bash
npm install
```
3.  Set up your environment variables by creating a `.env` file in the project root directory and defining the following variables:
```env
DB_HOST=<YourDatabaseHost>
DB_USER=<YourDatabaseUser>
DB_PASSWORD=<YourDatabasePassword>
DB_PORT=<YourDatabasePort>
DB_DEFAULT=<YourDatabaseName>
TOKEN_SECRET=<YourTokenSecret>
UPLOAD_FOLDER="../uploads"
APP_PORT=<PortNumber>
```
4.  Run the application:
```bash
node idn-api.js
```
Your backend API should now be running and accessible at http://localhost:<APP_PORT>.

## API Endpoints
-------------

*   /sp/:object/:action: Execute stored procedures based on the specified `object` and `action`.
*   /authenticate: Authenticate users with email and password.
*   /attachment/save: Save file attachments.
*   /attachment/view/:token: View file attachments based on a token.
*   /restart: Restart the application (for development purposes).

## Model Synchronization
---------------------

The backend project includes a model file named \`idn.mwb\` in the "model" folder. To synchronize this model with your database in MySQL Workbench, follow these steps:

1.  Open MySQL Workbench on your local machine.
2.  In MySQL Workbench, go to the "Database" menu and select "Forward Engineer...".
3.  Click "Next" and then select the "idn.mwb" model file from the project's "model" folder.
4.  Follow the wizard to configure your database connection and settings. You can choose to create a new database or select an existing one.
5.  Complete the wizard, and MySQL Workbench will generate the necessary SQL statements to create or update your database based on the model.

Once the synchronization is complete, your database will be ready for use with the application.

## Usage
-----

This backend API is designed to work in conjunction with the frontend or client application. Make sure you configure and integrate the API endpoints into your client application for full functionality.

## License
-------

This project is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0)](https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode).

Please review the license to understand the terms and conditions of use.
