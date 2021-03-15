# Monash University Backend Coding Challenge

by Federico Roma

## Installation

```bash
$ yarn

# or

$ npm install
```

## Running the app

```bash
$ yarn run start:dev

# or

$ npm run start:dev
```

## Considerations

- I created the address book in the form of a REST API using the nestJS framework, to be able to speed delivery and have a modularized application.
- There is no integration with aany database. Mock data and contacts created are stored in memory, so restarting the nest server will reset the number of available contacts.
- I included a postman collection of available requests in `monash.postman_collection.json`

## Available API Requests

```
GET - http://localhost:3000/api
```

```
GET - http://localhost:3000/api/book
```

```
GET - http://localhost:3000/api/book/:id
```

```
GET - http://localhost:3000/api/book/compare?bookA=1&bookB=2
```

```
GET - http://localhost:3000/api/contact
```

```
POST - http://localhost:3000/api/contact

Request body:

{
  book: 1,
  name: "Geraldine",
  phone: "+61 (841) 564-2043"
}
```
