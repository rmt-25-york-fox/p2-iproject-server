### ENDPOINTS

List of Available Endpoints:

- `POST /pub/register`
- `POST /pub/login`
- `POST /pub/google-sign-in`

- `GET /pub/movies`
- `GET /pub/movies/:id`
- `POST /pub/favorites/:movieId`
- `GET /pub/favorites`

- `POST /register`
- `POST /login`
- `POST /google-sign-in`

- `GET /movies`
- `POST /movies`
- `GET /movies/:id`
- `PUT /movies/:id`
- `PATCH /movies/:id`
- `DELETE /movies/:id`
- `GET /histories`

### POST /pub/register

#### Description

- Register Customer email and password to database

#### Request

- Body

```json
{
  "email": String,
  "password": String
}
```

#### Response

_201 - Created_

```json
{
  "id": Integer,
  "email": String
}
```

_400 - Bad Request_

```json
{
  "statusCode": 400,
  "message":
    "<mising value column> is required" / "E-mail address already in use!"
}
```

### POST /pub/login

#### Description

- Login for Customer by email and password to get acces token and other data (if any)

#### Request

- Body

```json
{
  "email": String,
  "password": String
}
```

#### Response

_200 - OK_

```json
{
  "access_token": String,
  "name": String,
  "role": String
}
```

_400 - Bad Request_

```json
{
  "statusCode": 400,
  "message": "<mising value column> is required"
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid token"
}
```

### POST /pub/google-sign-in

#### Description

- Login to Google by email and password to get acces token and other data (if any)

#### Request

- Body

```json
{
  "email": String,
  "password": String
}
```

#### Response

_200 - OK_

- Body

```json
{
  "access_token": String
}
```

_400 - Bad Request_

```json
{
  "statusCode": 400,
  "message": "Enter an email or phone number" / "Enter a password"
}
```

_401 - Unauthorized_

```json
{
  "statusCode": 401,
  "message": "Wrong password. Try again or click forgot password to reset it."
}
```

_404 - Not Found_

```json
{
  "statusCode": 404,
  "message": "Couldn't find your Google account"
}
```

### GET /pub/movies

#### Description

Get all the movies data

#### Request

- Headers

```json
{
  "access_token": String
}
```

#### Response

_200 - OK_

```json
{
  "statusCode": 200,
  "data": {
    "count": 20,
    "rows": [
      {
        "id": 1,
        "title": String,
        "synopsis": String,
        "trailerUrl": String,
        "imgUrl": String,
        "rating": Integer,
        "genreId": Integer,
        "authorId": Nummber,
        "status": String,
        "createdAt": Date,
        "updatedAt": Date,
        "User": {
          "id": Integer,
          "name": String,
          "username": String,
          "email": String,
          "role": String,
          "phoneNumber": Integer,
          "address": String,
          "createdAt": Date,
          "updatedAt": Date
        },
        "Genre": {
          "id": Integer,
          "name": String,
          "createdAt": Date,
          "updatedAt": Date
        }
      }
    ]
  }
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid token"
}
```

_404 - Not Found_

```json
{
  "message": "Movie ${id} not found"
}
```

### GET /pub/movies/:id

#### Description

Get a movie data by id for Customer

#### Request

- Headers

```json
{
  "access_token": String
}
```

#### Response

_200 - OK_

```json
{
  "statusCode": 200,
  "data": {
    "title": String,
    "synopsis": Text,
    "trailerUrl": String,
    "imgUrl": String,
    "rating": Integer,
    "genreId": Integer,
    "authorId": Integer,
    "createdAt": Date,
    "updatedAt": Date
  }
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid email/password"
}
```

_404 - Not Found_

```json
{
  "message": "Movie ${id} not found"
}
```

### POST /pub/favorites/:movieId

#### Description

Create a new favorite movie in database

#### Request

- Headers

```json
{
  "access_token": String
}
```

#### Response

_200 - OK_

```json
{
  "statusCode": Integer,
  "message": String,
  "data": {
    "id": Integer,
    "authorId": Integer,
    "movieId": Integer,
    "updatedAt": Date,
    "createdAt": Date
  }
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid token"
}
```

_404 - Not Found_

```json
{
  "message": "Movie not found"
}
```

### GET /pub/favorites

#### Description

Get all the favorite movies of the logged in user

#### Request

- Headers

```json
{
  "access_token": String
}
```

#### Response

_200 - OK_

```json
{
    "statusCode": 200,
    "data": [
        {
            "id": Integer,
            "authorId": Integer,
            "movieId": Integer,
            "createdAt": Date,
            "updatedAt": Date,
            "Movie": {
                  "id": Integer,
                  "title": String,
                  "synopsis": String,
                  "trailerUrl": String,
                  "imgUrl": String,
                  "rating": Integer,
                  "genreId": Integer,
                  "authorId": Nummber,
                  "status": String,
                  "createdAt": Date,
                  "updatedAt": Date,
                "User": {
                  "id": Integer,
                  "name": String,
                  "username": String,
                  "email": String,
                  "role": String,
                  "phoneNumber": Integer,
                  "address": String,
                  "createdAt": Date,
                  "updatedAt": Date
                },
                "Genre": {
                    "id": Integer,
                    "name": String,
                    "createdAt": Date,
                    "updatedAt": Date,
                }
            }
        }
    ]
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid token"
}
```

_404 - Not Found_

```json
{
  "message": "Movie ${id} not found"
}
```

### POST /register

#### Description

- Register email and password to database

#### Request

- Body

```json
{
  "email": String,
  "password": String
}
```

#### Response

_201 - Created_

```json
{
  "id": 17,
  "email": "boba@gmail.com"
}
```

_400 - Bad Request_

```json
{
  "statusCode": 400,
  "message":
    "<mising value column> is required" / "E-mail address already in use!"
}
```

### POST /login

#### Description

- Login by email and password to get acces token and other data (if any)

#### Request

- Body

```json
{
  "email": String,
  "password": String
}
```

#### Response

_200 - OK_

```json
{
  "access_token": String,
  "name": String,
  "role": String
}
```

_400 - Bad Request_

```json
{
  "statusCode": 400,
  "message": "<mising value column> is required"
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid token"
}
```

### POST /google-sign-in

#### Description

- Login to Google by email and password to get acces token and other data (if any)

#### Request

- Body

```json
{
  "email": String,
  "password": String
}
```

#### Response

_200 - OK_

- Body

```json
{
  "access_token": String
}
```

_400 - Bad Request_

```json
{
  "statusCode": 400,
  "message": "Enter an email or phone number" / "Enter a password"
}
```

_401 - Unauthorized_

```json
{
  "statusCode": 401,
  "message": "Wrong password. Try again or click forgot password to reset it."
}
```

_404 - Not Found_

```json
{
  "statusCode": 404,
  "message": "Couldn't find your Google account"
}
```

### GET /movies

#### Description

Get all the movies data

#### Request

- Headers

```json
{
  "access_token": String
}
```

#### Response

_200 - OK_

```json
{
  "statusCode": 200,
  "data": [
    {
      "title": String,
      "synopsis": Text,
      "trailerUrl": String,
      "imgUrl": String,
      "rating": Integer,
      "genreId": Integer,
      "authorId": Integer,
      "createdAt": Date,
      "updatedAt": Date
    }
  ]
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid token"
}
```

_404 - Not Found_

```json
{
  "message": "Movie ${id} not found"
}
```

### POST /movies

#### Description

Create a new movie data

#### Request

- Headers

```json
{
  "access_token": String
}
```

- Body

```json
{
  "title": String,
  "synopsis": Text,
  "trailerUrl": String,
  "imgUrl": String,
  "rating": Integer,
  "genreId": Integer
}
```

#### Response

_201 - Created_

```json
{
  "statusCode": 201,
  "message": "Movie created successfully",
  "data": {
    "status": String,
    "id": Integer,
    "title": String,
    "synopsis": Text,
    "trailerUrl": String,
    "imgUrl": String,
    "rating": Integer,
    "genreId": Integer,
    "authorId": Integer,
    "createdAt": Date,
    "updatedAt": Date
  }
}
```

_400 - Bad Request_

```json
{
  "statusCode": 400,
  "message": "<mising value column> is required"
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid token"
}
```

### GET /movies/:id

#### Description

Get a movie data by id

#### Request

- Headers

```json
{
  "access_token": String
}
```

#### Response

_200 - OK_

```json
{
  "statusCode": 200,
  "data": {
    "title": String,
    "synopsis": Text,
    "trailerUrl": String,
    "imgUrl": String,
    "rating": Integer,
    "genreId": Integer,
    "authorId": Integer,
    "createdAt": Date,
    "updatedAt": Date
  }
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid email/password"
}
```

_404 - Not Found_

```json
{
  "message": "Movie ${id} not found"
}
```

### PUT /movies/:id

### Description

Update all of the data of a movie by id

#### Request

- Headers

```json
{
  "access_token": String
}
```

- Body

```json
{
  "status": String,
  "title": String,
  "synopsis": Text,
  "trailerUrl": String,
  "imgUrl": String,
  "rating": Integer,
  "genreId": Integer
}
```

#### Response

_200 - OK_

```json
{
  "message": "Movie <id> success to update"
}
```

_400 Bad Request_

```json
{
  "message": "< missing value column > is required!"
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid token"
}
```

_403 Forbidden_

```json
{
  "message": "You are not authorized"
}
```

_404 - Not Found_

```json
{
  "message": "Movie ${id} not found"
}
```

### PATCH /movies/:id

### Description

Update the status of a movie data by id

#### Request

- Headers

```json
{
  "access_token": String
}
```

- Body

```json
{
  "status": String
}
```

#### Response

_200 - OK_

```json
{
  "message": "Movie <id> success to update"
}
```

_400 - Bad Request_

```json
{
  "message": "Status is required!"
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid token"
}
```

_403 Forbidden_

```json
{
  "message": "You are not authorized"
}
```

_404 - Not Found_

```json
{
  "message": "Movie ${id} not found"
}
```

### DELETE /movies/:id

#### Description

Delete a movie data by id

#### Request

- Headers

```json
{
  "access_token": String
}
```

#### Response

_200 - OK_

```json
{
  "message": "Movie ${id} success to delete"
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid token"
}
```

_403 Forbidden_

```json
{
  "message": "You are not authorized"
}
```

_404 - Not Found_

- Body

  ```json
  {
    "message": "Movie ${id} not found"
  }
  ```

### GET /histories

#### Description

Obtain all of histories data from database

#### Request

- Headers

```json
{
  "access_token": String
}
```

#### Response

_200 - OK_

```json
{
  "statusCode": 200,
  "data": [
      {
          "id": Integer,
          "movieId": Integer,
          "title": String,
          "description": Text,
          "updatedBy": Integer,
          "createdAt": Date,
          "updatedAt": Date,
          "Movie": {
              "id": Integer,
              "title": String,
              "synopsis": Text,
              "trailerUrl": String,
              "imgUrl": String,
              "rating": Integer,
              "genreId": Integer,
              "authorId": Integer,
              "status": String,
              "createdAt": Date,
              "updatedAt": Date
          }
      }]
```

_401 - Unauthorized_

```json
{
  "message": "Invalid token"
}
```

_404 - Not Found_

```json
{
  "message": "Data not found"
}
```

### Global Error

### Response

_500 - Internal Server Errors_

```json
{
  "statusCode": 500,
  "message": "Internal Server Errors"
}
```
