# COM519_AE1_Skilled - Assessment 1 of COM519 - Advanced Database Systems
![Lint Project](https://github.com/Grahame-student/COM519_AE1_Skilled/workflows/Lint%20Project/badge.svg)

Skilled is a simple webapp designed as a tool to track the level of expertise team members have against a set or role requirements. The goal is to create a visualisation of where team members are that can be used to justify where effort should be invested to improve their capabilities.

The software allows registered users to
* define groups of relevant skills that a team should have
* define roles with different skill levels
* add / remove team members
* create / view assessments of team members against the defined roles

## Software Dependencies
The following must be installed or accessible:
* `node js` [Node JS website](https://nodejs.org/en/)
* `mongodb` [MongodDB website](https://www.mongodb.com/)
  if not installed locally must be accessible as a network / hosted resource

## Installation
Checkout the code from github using: `git clone https://github.com/Grahame-student/COM519_AE1_Skilled.git`

_The location the code is checked out into should not have an spaces in its path, some npm packages have problems installing to them._

Install the required node packages using:

`npm install`

Create a `.env` file using the provided `.env.template` file
* Set `BASE_URI` to the URI to use for the `Skilled` webapp
* Set `PORT` to the port number to listen on
* Set `MONGODB_URI` to the URI of your mongodb database
* Set `SESSION_SECRET` to a secret string

**The .env file should not be checked into a version control system as some of these values could be used to compromise the security of the webapp**

When deploying to a hosted service ensure that the .env file is either uploaded to the hosted service or appropriate environment variables are set.
Additionally, you will need to set the following values:
* Set `API_BASE` to the URI of your hosted webapp
* Set `NODE_ENV` to `production`

These values ensure that the real URIs are used and not any defined for local development / debugging activities.

## Usage
To start the `Skilled` application navigate to the directory that the code was checked out into and use:

`node app.js`

The following output should be seen on the command prompt

`Skilled app listening at http://localhost:2020`

Navigate to the URL shown, and the application's main page should be displayed.

![Screenshot of Skilled's main page](docs/images/skilled_front_page.png)

