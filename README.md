Backend API for IDN ERP
=====================================

This document contains information about the backend API of \[Your Project Name\]. The API is developed using Node.js, Express, and MySQL, and it offers various endpoints for handling authentication, executing stored procedures, and managing file attachments.

Table of Contents
-----------------

*   [Features](#features)
*   [Getting Started](#getting-started)
*   [API Endpoints](#api-endpoints)
*   [Usage](#usage)
*   [License](#license)

Features
--------

*   User authentication
*   Execution of stored procedures for database interactions
*   Handling of file attachments
*   CORS support for cross-origin requests

Getting Started
---------------

To set up and run the backend API on your local machine, follow these steps:

1.  Clone the repository to your local machine:
```bash
git clone https://github.com/idn-erp/api.git
```
3.  Install the required dependencies:
```bash
npm install
```
5.  Set up your environment variables by creating a `.env` file in the project root directory and defining the following variables:
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

7.  Run the application:
```bash
npm start
```
Your backend API should now be running and accessible at http://localhost:<APP_PORT>.
This API URL has to be updated in the environment.ts file of the Ionic UI project.

API Endpoints
-------------

*   /sp/:object/:action: Execute stored procedures based on the specified `object` and `action`.
*   /authenticate: Authenticate users with email and password.
*   /attachment/save: Save file attachments.
*   /attachment/view/:token: View file attachments based on a token.
*   /restart: Restart the application (for development purposes).

Usage
-----

This backend API is designed to work in conjunction with the frontend or client application. Make sure you configure and integrate the API endpoints into your client application for full functionality.

License
-------

This project is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0)](https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode).

Please review the license to understand the terms and conditions of use.
