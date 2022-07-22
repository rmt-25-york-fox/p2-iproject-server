# LEARNGO-EN-JP API Documentation

available end-points:
- GET /news
- GET /trans
- GET /kanji
- GET /all
- POST /login
- POST /newStatus
- POST /newComment

## GET /news
Get news data from 3rd party API

200-OK
```
{
    "statusCode": 200,
    "data": [
        {
            "title": "title",
            "url": "url",
            "source": "company"
        },
    ]
}
```

## GET /trans
Translate text from English to Japanese

Request
```
URL Query: ?status=text
```

200-OK
```
{
    "statusCode": 200,
    "result": "translated text"
}
```

## GET /kanji
Retrieve kanji from third party API based on the grade.

Request
```
URL Query: ?grade=integer
```

200-OK
```
{
    "statusCode": 200,
    "data": [
        "一",
        "右",
        "雨",
        "円"
    ]
}
```

## GET/kanjidetails/:kanji
Get the details of a kanji from third party API

Request
```
URL params: kanji
example: .../kanjidetails/円
```

200-OK
```
{
    "statusCode": 200,
    "data": {
        "kanji": "円",
        "grade": 1,
        "stroke_count": 4,
        "meanings": [
            "circle",
            "yen",
            "round"
        ],
        "kun_readings": [
            "まる.い",
            "まる",
            "まど",
            "まど.か",
            "まろ.やか"
        ],
        "on_readings": [
            "エン"
        ],
        "name_readings": [
            "つぶら",
            "のぶ",
            "まどか",
            "みつ"
        ],
        "jlpt": 4,
        "unicode": "5186",
        "heisig_en": "circle"
    }
}
```

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
imageInput: file
```

201-CREATED
```
{
    statusCode: 201,
    message: 'New Post Created'
}
```

## POST /newComment
Post a new comment

Request
```
body: {
    postId,
    content
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
