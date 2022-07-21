## Endpoints

List of Available Endpoints:
- `POST /register`
- `POST /login`
- `GET /request`
- `POST /request`
- `GET /myTask`
- `Get /myRequests`
- `GET /request/:id`
- `PATCH /request/:id`
- `PATCH /requests/:id`

### POST /register

#### Description

- Register new user 

#### Response
_201 - Created_
-Body
```json
{
  "data": {
    "id": Integer,
    "email": String
  }
}
```
_400 - Bad Request_
```json
{
      "name": String,
}
```

### POST /login

#### Description

- Login user 

#### Response
_200 - OK
-Body
```json
{
    "access_token": String
}
```
_401 - Validation Error_
```json
{ 
  "statusCode": 401, 
  "message": "invalid email/password" 
} 
```

### GET /request

#### Description

- Get all requests in table requests

#### Response

_200 - OK_

- Body
```json
{
  "data": [
    {
      "id": Integer,
      "title": String,
      "description": Text,
      "points": Integer,
      "UserId": Integer,
      "picId": Integer,
      "picName": String
    }
  ]
}
```

### POST /request

#### Description

- Add new request in table requests

#### Response
_201 - Created_

- Body
```json
{
  "data": {
    "id": Integer,
      "title": String,
      "description": Text,
      "points": Integer,
      "UserId": Integer,
      "picId": Integer,
      "picName": String
  }
}
```

_400 - Bad Request_

- Body
```json
{
  "statusCode": 400,
  "error": {
    "message": {
      "name": "SequelizeValidationError",
      "errors": Array
    }
  }
}
```

### GET /myTask

#### Description

- Get all accepted requests for logged in user

#### Response

_200 - OK_

- Body
```json
{
  "data": [
    {
      "id": Integer,
      "title": String,
      "description": Text,
      "points": Integer,
      "UserId": Integer,
      "picId": Integer,
      "picName": String
    }
  ]
}
```

### GET /myRequests

#### Description

- Get all logged in user's requests 

#### Response

_200 - OK_

- Body
```json
{
  "data": [
    {
      "id": Integer,
      "title": String,
      "description": Text,
      "points": Integer,
      "UserId": Integer,
      "picId": Integer,
      "picName": String
    }
  ]
}
```
### GET /request/:id

#### Description

- Get specific requests in table requests

#### Response

_200 - OK_

- Body
```json
{
  "data": [
    {
      "id": Integer,
      "title": String,
      "description": Text,
      "points": Integer,
      "UserId": Integer,
      "picId": Integer,
      "picName": String
    }
  ]
}
```

### PATCH /request/:id

#### Description

- Assign task to user

#### Response

_200 - OK_

- Body
```json 
{ 
  "message": "Success add task" 
} 
```

### PATCH /requests/:id

#### Description

- Update status task to done

#### Response

_200 - OK_

- Body
```json 
{ 
  "message": "Task finished" 
} 
```

### Global Error

#### Response

_401 - invalid Token_
- Body
```json
{
   "message": "invalid Token"
}
```

_404 - Unthorized_

- Body
```json
{
   "message": "Unthorized"
}
```

_500 - Internal Server Error_

- Body
```json
{
   "message": "Internal Server Error"
}
```