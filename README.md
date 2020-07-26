# CSGO Demo Viwer

A webapp to view 2D CSGO demos

## Description

This is a full-stack webapp to view CSGO demos. 
- For the backend, it uses Gin + Golang as backend to parse `.dem` files, and also to create a REST API to serve them
- For the frontend, it uses React to view and control the demo.

## Getting Started

### Dependencies

* Node + NPM for the WebApp
* Golang for the backend

### Installing

* How/where to download your program
* Any modifications needed to be made to files/folders

### Executing program

#### Backend

The backend uses two external services to sabe information:
- AWS S3 to save the demos' frames
- Postgresql database to save demo information

You need to create and fill a `.env` file on `backend/` directory before running it, with the information for accessing both services:

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
DB_CONFIG=host=
```

After having for services configured:

`$ cd backend/`
`go run main.go`

It will run the REST API with the demo parser on the port 8080

#### WebApp

You need a local backend running before running the webapp

`$ cd app/`
`$ npm install`
`$ npm start`

It will run the webapp on the port 3000

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

- Marcelo G. de Andrade


## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details