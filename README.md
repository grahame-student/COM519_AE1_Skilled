# COM519_AE1_Skilled - Assessment 1 of COM519 - Advanced Database Systems
![Lint Project](https://github.com/Grahame-student/COM519_AE1_Skilled/workflows/Lint%20Project/badge.svg)

Skilled is a simple webapp designed as a tool to track the level of expertise team members have against a set or role requirements. The goal is to create a visualisation of where team members are that can be used to justify where effort should be invested to improve their capabilities.

The software allows registered users to
* define groups of relevant skills that a team should have
* define roles with different skill levels
* add / remove team members
* create / view assessments of team members against the defined roles

## Software Dependencies
The following must be installed or accessable:
* `node js` () TODO: add url
* `mongodb` if not installed locally must be accessable as a network / hosted resource

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

## Usage
To start the `Skilled` application navigate to the directory that the code was checked out into and use:
`node app.js`

The following output should be seen on the command prompt
`Skilled app listening at http://localhost:2020`

Navigate to the URL shown and the application's main page should be displayed
** TODO: Insert screenshot of web app front page **

