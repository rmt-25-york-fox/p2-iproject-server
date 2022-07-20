# p2-iproject-server

Individual Project - Server

## ENDPOINTS

### List of Available Endpoints:

- POST /register
- POST /login
- GET /digimon
- GET /digimon/:name
- POST /leaderboards
- POST /create-user
- POST /digimon/digiId
- GET /mydigimons

### POST /register

**Description : Add new user data**

_Request Body_

```
{
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
}
```

_Response (201 - Created)_

```
{
    "message": "Successfully created a new account"
}
```

_Response (400 - Bad Request)_

```
{
    "message": "<message from SequelizeValidationError>"
}
```

_Response (400 - Bad Request)_

```
{
    "message": "Email sudah dipakai, silahkan gunakan email lainnya"
}
```

---

### POST /login

**Description: Login to existing user data**

_Request Body_

```
{
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
}
```

_Response (200 - OK)_

```
{
    "access_token": "<access_token>",
    "data": {
        "id": Integer,
        "UserId": Integer,
        "access_token": "<globalstats token>",
        "updatedAt": Date,
        "createdAt": Date
    }
}
```

_Response (401 - Unauthorized)_

```
{
      "message": "Invalid email/password"
}
```

_Response (400 - Bad Request)_

```
{
      "message": "Silahkan masukkan email || password"
}
```

---

### GET /digimon

**Description: Get all digimons data**

_Response (200 - OK)_

```
[
    {
        "id": Integer,
        "name": String,
        "img": String,
        "level": String,
        "createdAt": Date,
        "updatedAt": Date
    },
    {
        "id": Integer,
        "name": String,
        "img": String,
        "level": String,
        "createdAt": Date
        "updatedAt": Date
    },
]
```

---

### GET /digimon/:name

**Description: Get digimon by given name**
_Request Params_

```
{
    "name": "<digimon name>"
}
```

_Response (200 - OK)_

```
[
    {
        "name": String,
        "img": String,
        "level": String
    }
]
```

### POST /leaderboards

**Description: Show current leaderboards**
_Request Headers_

```
{
    "Authorization": "Bearer <globalstats access_token>"
}
```

_Response (200 - OK)_

```
{
    "data": [
        {
            "name": String,
            "user_profile": null,
            "user_icon": null,
            "rank": Integer,
            "value": Integer,
            "additionals": [
                {
                    "key": String,
                    "value": Integer,
                    "rank": Integer
                }
            ]
        },
        {
            "name": String
            "user_profile": null,
            "user_icon": null,
            "rank": Integer,
            "value": Integer,
            "additionals": [
                {
                    "key": String,
                    "value": Integer,
                    "rank": Integer
                }
            ]
        },
    ]
}
```

---

### POST /create-user

**Description: Create user for globalstats to play game**
_Request Headers_

```
{
    "Authorization": "Bearer <globalstats access_token>"
}
```

_Request Body_

```
{
  "name": "<insert name>"
}
```

_Response (201 - Created)_

```
{
    "name": String,
    "_id": Integer,
    "values": [
        {
            "key": String,
            "value": Integer,
            "sorting": String,
            "rank": Integer
        }
    ],
    "achievements": []
}
```

_Response (400 - Bad Request)_

```
{
    "message": "Silahkan masukkan username"
}
```

---

### POST /digimon/digiId

**Description: Add Digimon to DigimonUser**

_Request Headers_

```
{
    "access_token": "<your access_token>"
}
```

_Response (201 - Created)_

```
{
    "UserId": Integer,
    "DigiId": Integer
}
```

_Resposne (404 - Not Found)_

```
{
    "message": "Digimon not Found"
}
```

---

### GET /mydigimons

**Description: Show all DigimonUser data based on user.id**

_Request Headers_

```
{
    "access_token": "<your access_token>"
}
```

_Response (200 - OK)_

```
[
    {
        "UserId": Integer,
        "DigimonId": Integer,
        "createdAt": Date,
        "updatedAt": Date,
        "Digimon": {
            "id": Integer,
            "name": String,
            "img": String,
            "level": String,
            "createdAt": Date,
            "updatedAt": Date
        }
    }
]
```

---

### GLOBAL ERROR

_Response (400 - Bad Request)_

```
{
    "message": "<Message error from SequelizeValidationError>"
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "Invalid Token"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Intenal server error"
}
```
