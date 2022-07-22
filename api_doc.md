## Endpoints

List of Available Endpoints:
- `POST /register`
- `POST /login`
- `GET /merchants`

### POST /register
#### Description
- Create a new user data

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
    {
      "phoneNumber": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "id": Integer,
      "fullName": String,
      "phoneNumber": String,
      "role": String,
    }
    ```

_400 - SequelizeValidationError OR SequelizeUniqueConstraintError_
- Body
    ```json
    {
      "statusCode": 400,
      "message": Array
      }
    }
    ```
_401 - Bad Request_
- Body
    ```json
    {
      "statusCode": 401,
      "message": "Nomor handphone harus diisi"
      }
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "message": "Nomor handphone tidak sesuai"
      }
    }
    ```

### POST /login
#### Description
- Login user

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
    {
      "phoneNumber": String
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    {
      "access_token": String,
      "id": Integer,
      "fullName": String,
      "phoneNumber": String,
      "role": String,
    }
    ```

_401 - Bad Request_
- Body
    ```json
    {
      "statusCode": 401,
      "message": "Nomor handphone harus diisi"
      }
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "message": "Nomor handphone tidak sesuai"
      }
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "message": "Data tidak ditemukan"
      }
    }
    ```
  
### GET /merchants
#### Description
- Get all the merchants data

#### Response
_200 - OK_

- Body
    ```json
    [
      {
        "id": Integer,
        "UserId": Integer,
        "MerchantId": Integer,
        "createdAt": Date,
        "updatedAt": Date,
        "User": {
          "id": Integer,
          "fullName": String,
          "nickname": String,
          "phoneNumber": String,
          "location": String,
          "role": String,
          "createdAt": Date,
          "updatedAt": Date
        },
        "Merchant": {
          "id": Integer,
          "product": String,
          "location": String,
          "createdAt": Date,
          "updatedAt": Date
        }
      },
      ...
    ]
    
    ```
  
### Authentication Error
#### Response
_401 - Unauthorized OR JsonWebTokenError_
- Body
    ```json
    {
      "statusCode": 401,
      "message": "Token Invalid"
    }
    ```
_403 - Forbidden_
- Body
    ```json
    {
      "statusCode": 403,
      "message": "You are not authorized"
    }
    ```

### Global Error
#### Response
_500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "message": "Internal Server Error"
    }
    ```