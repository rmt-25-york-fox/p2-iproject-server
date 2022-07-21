## Endpoints

List of Available Endpoints:

- `GET /tutorials/nodejs`
- `GET /tutorials/java`
- `GET /tutorials/golang`
- `GET /donations`
- `POST /donations/payment`
- `PATCH /donations/payment`
- `POST /livechats`

### GET /tutorials/nodejs

#### Description

- Get all nodejs tutorial data from youtube

#### Response

_200 - OK_

- Body
  ```json
  [
    {
      "id": Integer,
      "title": String,
      "thumbnail": String,
      "channelTitle": String,
      "channelUrl": String,
      "description": String,
      "publishedAt": Date,
      "videoUrl": String
    },
      ...
  ]
  ```

### GET /tutorials/java

#### Description

- Get all java tutorial data from youtube

#### Response

_200 - OK_

- Body
  ```json
  [
    {
      "id": Integer,
      "title": String,
      "thumbnail": String,
      "channelTitle": String,
      "channelUrl": String,
      "description": String,
      "publishedAt": Date,
      "videoUrl": String
    },
      ...
  ]
  ```

### GET /tutorials/golang

#### Description

- Get all golang tutorial data from youtube

#### Response

_200 - OK_

- Body

  ```json
  [
    {
      "id": Integer,
      "title": String,
      "thumbnail": String,
      "channelTitle": String,
      "channelUrl": String,
      "description": String,
      "publishedAt": Date,
      "videoUrl": String
    },
     ...
  ]
  ```

### GET /donations

#### Description

- Get all donation data with sucess paymentStatus

#### Response

_200 - OK_

- Body
  ```json
  [
    {
      "id": Integer,
      "name": String,
      "email": String,
      "amount": Integer,
      "message": String,
      "orderId": String,
      "paymentStatus": String,
      "createdAt": Date,
      "updatedAt": Date
    },
     ...
  ]
  ```

### POST /donations/payment

#### Description

- Create a new payment for donation

#### Request

- Body
  ```json
  {
    "name": String,
    "email": String,
    "amount": Integer,
    "message": String,
  }
  ```

#### Response

_200 - Ok_

- Body
  ```json
  {
    "token": String,
    "redirect_url": String
  }
  ```

### PATCH /donations/payment

#### Description

- Patch a paymentStatus data based on given orderId

#### Request

- Body
  ```json
  {
    "orderId": String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "message": "Payment status updated"
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "message": "Donation not found"
  }
  ```

### POST /livechats

#### Description

- Post the livechat endpoint to get a new chat

#### Request

- Body
  ```json
  {
    "username": String,
    "message": String,
  }
  ```

#### Response

_200 - Ok_

- Body
  ```json
  {
    "message": "Message sent successfully"
  }
  ```

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "message": "Internal Server Error"
  }
  ```
