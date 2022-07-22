## Endpoints

List of Available Endpoints:

- `POST /register` 
- `POST /login`
- `POST /google-sign`
- `GET /petrol`
- `GET /transaksi`
- `GET /chart`
- `GET /api/search/:query`
- `POST /transaksi/:petrolId`

### POST /register

#### Description

- Register User

#### Request
- body

```
{
"email": "string",
"password": "string",
"kendaraan": "string",
}
```

**Response**
_(201 - Created)_

```
statuscode: 201,
data: {
message: `User has been created`,
id: "string",
email: "string",
}
```
**Response**
_(400 - Bad Request)_
```
{
 msg: "email is required"
} 
OR
{
 msg: "email is required"
}
OR
{
 msg: "email must be in email format"
}
{
 msg: "password is required"
} 
OR
{
 msg: "password is required"
}
OR
{
 msg: "Password must be at least 5 characters"
}
```


### POST /login

#### Description

- login User

#### Request
- body

{
"email": "string",
"password": "string"
}
**Response**
_(200 - Ok)_

```
statuscode: 200,
data: {
accesstoken: <token>,
userId: "string",
email: "string",
}
}
```

**Response**
_(400 - Bad Request)_

```
{
"msg": "Email is required"
}
OR
{
"msg": "Password is required"
}
```

**Response**
_(401 - Unauthorized)_

```
{
"msg": "Invalid Email/Password"
}
```


### POST /google-sign

#### Description

- login with Google-sign and Get access token after user authentication using google sign

#### Request
- headers
```
{
"credential": "String",
 audience: CLIENT_ID,
}
```
**Response**
_(200 - Ok)_
res.status(200).json({
statuscode: 200,
data: {
access_token: <token>,
userId: "string",
email: "string",
}
}

**Response**
_(201 - Created)_
res.status(200).json({
statuscode: 200,
data: {
access_token: <token>,
userId: "string",
email: "string",
}
}

### GET /petrol

#### Description

- Get all petrol

#### Request
- headers:

```
{
 "access_token": "string"
}
```
**Response**
_(200 - Ok)_
{
"nama": "string",
"harga": "Integer",
"informasi": "string"
},


### GET /transaksi

#### Description

- Get all transaksi

#### Request
- headers:

```
{
 "access_token": "string"
}
```
**Response**
_(200 - Ok)_
{
"UserId": "Integer",
"PetrolId": "Integer",
"TotalHarga": "Integer"
}


### GET /chart

#### Description

- Get all chart

#### Request
- headers:

```
{
 "access_token": "string"
}
```
**Response**
_(200 - Ok)_
{
"month": ["TotalHarga"],
}


### POST /transaksi/:petrolId

#### Description

- post transaksi

#### Request
- headers:

```
{
 "access_token": "string"
}
```
- body:

```
{
 "liter": "integer"
 "userId": "integer"
}
```
- params:

```
{
 "petrolId": "integer"
}
```

**Response**
_(200 - Ok)_
res.status(201).json({
statuscode: 201,
    data: {
    UserId: "integer",
    PetrolId:"integer",
    TotalHarga: "integer",
    },
});


### GET /api/search/:query

#### Description

- GET API

#### Request
- headers:
```
{
 "access_token": "string"
}
```
- params:
```
{
 "query": "string"
}
```
**Response**
_(200 - Ok)_
{
    "data":"string"
}


