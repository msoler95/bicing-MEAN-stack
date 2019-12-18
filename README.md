# Bicing project

## Introduction

This project is created for thethings.io. There are 2 exercices and 2 bonus exercices. The exercices retrieve information from the bicing API and work with it. All the exercices are solved inside the website. 

## Preview

Live preview of bicing project: http://167.99.82.8 

## Start

### First install dependecies

To install server dependeces: `npm install`
To install angular dependeces: `npm run angular-deps`

### Second build

Run: `npm run build`
(You should have angular cli instaled)

### Third start bd and server

Run: `mongod`
Run: `npm start`
(You should have mongodb installed)

Server should be running on localhost:8080

## Frontend
You can visualize the frontend in localhost:8080

## API

Get all stations: localhost:8080/stations/

Get near stations with free bikes: http://localhost:8080/stations/nearestStationWithFreeBikes/?&loc=41.379632,2.192662,1

Get stations by time: localhost:8080/stations/?&timeFrom=2019-12-18T02:15:00&timeEnd=2019-12-18T02:14:00

Get stations by location: localhost:8080/stations/?&loc=41.379632,2.192662,1

Get station: localhost:8080/stations/?&id=3

Get stations by id and time: localhost:8080/stations/?&timeFrom=2019-12-18T14:10:00&timeEnd=2019-12-18T20:28:00&id=3

Get stations by location and time: localhost:8080/stations/?&timeFrom=2019-12-18T14:00:00&timeEnd=2019-12-18T20:00:00&loc=41.379632,2.192662,1



