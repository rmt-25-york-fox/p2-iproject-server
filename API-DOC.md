## Endpoint

- `Post / login`
- `Post / register`
- `Post / google-sign-in`
- `Get / spaceshuttle`
- `Post / spaceshuttle`
- `Get / spaceshuttle:id`
- `Put / spaceshuttle:id`

### POST / login

> _Request Body_

```
{
  "email": "<email>",
  "password": "<password>"
}
```

_Response (200 - Ok)_

```
{
  statusCode: 200,
  access_token: <access_token>,
  email: <email>
}
```

_Response (401 - Unauthorized)_

```
{
  "message": "Invalid email/password"
}
```

### POST / register

> _Request Body_

```
{
  "username": "<email>",
  "email": "<email>",
  "password": "<password>",
}
```

_Response (201 - Created)_

```
{
    "statusCode": 201,
    "msg": "User with id <id> successfully created"
}
```

_Response (400 - Unauthorized)_

```
{
    "statusCode": 400,
    "message": "email is required"
},
{
    "statusCode": 400,
    "message": "email is required!"
},
{
    "statusCode": 400,
    "message": "password is required!"
}
```

### GET / spaceshuttle

> _Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Response (200 - Ok)_

```
{
    id": <id>,
    "UserId": <UserId>,
    "name": <name>,
    "information": <information>,
    "imgUrl": <imgUrl>,
    "createdAt": <newDate>,
    "updatedAt": <newDate>
}
```

_Response (401 - Unauthorized)_

```
{
    "statusCode": 401,
    "message": "Invalid Token"
}
```

### POST / spaceshuttle

> _Request Header_

```
{
  "access_token": "<your access token>"
}
```

> _Request Body_

```
{
    "UserId":<req.user>,
    "name": <name>,
    "information": <information>,
    "imgUrl": <imgUrl>,
}
```

_Response (200 - Ok)_

```
{
    "statusCode": 200,
    "message": "Data with id <${id}> created",
    "data": [
        {
            "id": <id>,
            "name": <name>,
            "information": <information>,
            "imgUrl": <imgUrl>,
        }
    ]
}
```

_Response (400 - Bad Request)_

```
{
    "statusCode": 400,
    "message": "name is required"
},
{
    "statusCode": 400,
    "message": "information is required"
},
{
    "statusCode": 400,
    "message": "imgUrl is required"
}
```

### GET / spaceshuttle:id

> _Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Response (200 - Ok)_

```
{
    "data": {
        "id": <id>,
            "name": <name>,
            "information": <information>,
            "imgUrl": <imgUrl>,
    }
}
```

_Response (401 - Unauthorized)_

```
{
    "statusCode": 401,
    "message": "Invalid Token"
}
```

### PUT / spaceshuttle:id

> _Request Header_

```
{
  "access_token": "<your access token>"
}
```

> _Request Body_

```
{
    "name": <name>,
    "information": <information>,
    "imgUrl": <imgUrl>,
}
```

_Response (200 - Ok)_

```
{
    "message": "SpaceShuttle with id ${data.id} updated",
    "data": {"UserId":<req.user>,
    "name": <name>,
    "information": <information>,
    "imgUrl": <imgUrl>,
    }
}
```

_Response (403 - Forbidden)_

```
{
    "statusCode": 403,
    "message": "You dont have access"
}
```

_Response (404 - NotFound)_

```
{
    "statusCode": 404,
    "message": "Data not found"
}
```
