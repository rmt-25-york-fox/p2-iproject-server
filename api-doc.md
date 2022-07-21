# LEARNGO-EN-JP API Documentation

available end-points:
- GET /all
- POST /login
- POST /newStatus

## GET /all
Returns all posts and user

200-OK
```
{
    "statusCode": 200,
    "data": [
        {
            "id": 1,
            "content": "content",
            "imageUrl": "url",
            "UserId": 1,
            "createdAt": "2022-07-21T04:15:28.743Z",
            "updatedAt": "2022-07-21T04:15:28.743Z",
            "User": {
                "id": 1,
                "username": "name",
                "email": "mail@mail.com",
                "displayPic": "url",
                "createdAt": "2022-07-21T04:14:00.788Z",
                "updatedAt": "2022-07-21T04:14:00.788Z"
            }
        }
    ]
}
```

## POST /login

200-OK
```
{
    statusCode: 200,
    message: 'Google Login Successful',
    access_token: "accessToken",
    username: "user.username"
}
```

## POST /newStatus

Request
```
content: string
```

201-CREATED
```
{
    statusCode: 201,
    message: 'New Post Created'
}
```

## Global Error
500-Internal Server Error
```
{
    statusCode: 500,
    message: 'Internal Server Error'
}
```
