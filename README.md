# API for an automated charging station management system.

### Status of the App: 
- [x] Task 1: implement API for CRUD operations against stations, companies, stationTypes;
  - Implementation completed
- [ ] Task 2: implement script parsing
  - Implementation 50% completed

### Things to do:
- [ ] Finish Task 2 implementation: ETA 6 hours
  - Transform response object in respect to the task statement
  - Add logics of stopping charging of stations
  - Filter `Wait` operations form the response
- [ ] Clean and refactor the code
- [ ] Add error handling in DB queries
- [ ] Hide from a user errors coming from the DB or internal errors 
- [ ] Add unit tests for API CRUD and script parser, ETA 6 hours
- [ ] Add API documentations (swagger integration), ETA 3 hours

## Starting the app
- `yarn install`
- Start the app: `yarn start`
- Develop the app: `yarn dev`

### Database
For the app SQLite is used. Each service can be setup to run its own DB or use one for every service by setting the `SERVICES_DB_PATH` environment variable. 
Moleculer log level is `info` by default, but can be overridden with `CHARGE_MANAGE_API_MOL_LOG_LEVEL` to `warn` or `debug`.

### Environment variables

- `CHARGER_DB_PATH`
- `CHARGER_SERVICE_PORT`
- `CHARGER_SERVICE_VERSION`
- `CHARGE_MANAGE_API_MOL_LOG_LEVEL`
- `COMPANIES_DB_PATH`
- `COMPANIES_SERVICE_PORT`
- `COMPANIES_SERVICE_VERSION`
- `GATEWAY_SERVICE_PORT`
- `SERVICES_DB_PATH`
- `STATIONS_DB_PATH`
- `STATIONS_SERVICE_PORT`
- `STATIONS_SERVICE_VERSION`
- `STATIONTYPES_DB_PATH`
- `STATIONTYPES_SERVICE_PORT`
- `STATIONTYPES_SERVICE_VERSION`
