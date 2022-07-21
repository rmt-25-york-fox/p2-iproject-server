# p2-cms-integration-server

CMS Integration - Server

## Endpoints :
- `POST /register`
- `POST /login`

- `GET /product`
- `GET /showcase`

- `POST /myorder`
- `GET /myorder`
- `PATCH /myorder/:id`
- `GET /myorder/:id`
- `DELETE /myorder/:id`

- `GET /shipping/province`
- `GET /shipping/city`
- `GET /shipping/cost`

- `POST /payment`

## 1. POST /register
_Request:_

- Body
  > bagian yang perlu diisi, AuthorId mengikuti login

```json
{
  "email": STRING,
  "password": STRING,
}
```

_Response (201 - Created)_

> pengiriman data lengkap dan sudah berhasil

```json
{
  "id": INTEGER,
  "email": STRING,
}
```

_Response (500 - Internal Server Error)_

> jika didalam data server ada error

```json
{
  "message": "Internal Server Error Ngab!"
}
```

## 2. POST /login
Request:

- Body

```json
{
  "email": STRING,
  "password": STRING
}
```

_Response (200 - OK)_

```json
{
  "access_token": <Access Token>
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Error Invalid Email or Password"
}
```
## 3. GET /product
Request:

_Response (200 - OK)_

> jika berhasil membaca data

```json
{
  "statusCode": 200,
  "message": "Product read successfully",
  
}
```

_Response (500 - Internal Server Error)_

> jika didalam data server ada error

```json
{
  "message": "Internal Server Error Ngab!"
}
```
## 4. GET /showcase
_Response (200 - OK)_

> jika berhasil membaca data

```json
{
  "statusCode": 200,
  "message": "Product read successfully",
  
}
```

_Response (500 - Internal Server Error)_

> jika didalam data server ada error

```json
{
  "message": "Internal Server Error Ngab!"
}
```
## 5. POST /myorder
_Request:_

- Headers
  > token didapat setelah login

```json
{
  "access_token": <Access Token>
}
```

- Body
  > bagian yang perlu diisi, AuthorId mengikuti login

```json
{
  "name": STRING,
  "description": STRING,
  "price": INTEGER,
  "imgUrl": STRING,
  "CategoryId": INTEGER,
}
```

_Response (201 - Created)_

> pengiriman data lengkap dan sudah berhasil

```json
{
  "statusCode": 201,
  "message": "My Order created successfully",
  
}
```

_Response (500 - Internal Server Error)_

> jika didalam data server ada error

```json
{
  "message": "Internal Server Error Ngab!"
}
```
## 6. GET /myorder
Request:

- Headers
  > token didapat setelah login

```json
{
  "access_token": <Access Token>
}
```

_Response (200 - OK)_

> jika berhasil membaca data

```json
{
  "statusCode": 200,
  "message": "Product read successfully",
  
}
```

_Response (500 - Internal Server Error)_

> jika didalam data server ada error

```json
{
  "message": "Internal Server Error Ngab!"
}
```
## 7. PATCH /myorder/:id
Request:

- Headers
  > token didapat setelah login

```json
{
  "access_token": <Access Token>
}
```

- Body

```json
{
  "VgaId": INTEGER,
  "PsuId": INTEGER,
  "ProcessorId": INTEGER,
  "SsdId": INTEGER,
  "RamId": INTEGER,
}
```

_Response (200 - OK)_

> jika berhasil menemukan dan menghapus data

```json
{
    "message": terupdate
}
```


_Response (500 - Internal Server Error)_

> jika didalam data server ada error

```json
{
  "message": "Internal Server Error Ngab!"
}
```

## 8. GET /myorder/:id
Request:

- Headers
  > token didapat setelah login

```json
{
  "access_token": <Access Token>
}
```

_Response (200 - OK)_

> jika data berhasil dibaca

```json
{
  "statusCode": 200,
  "message": "Success Read My Order",
  
}
```

## 9. DELETE /myorder/:id
Request:

- Headers
  > token didapat setelah login

```json
{
  "access_token": <Access Token>
}
```

_Response (200 - OK)_

> jika berhasil menemukan dan menghapus data

```json
{
  "statusCode": 200,
  "message": "My Order 5 deleted successfully"
}
```

_Response (500 - Internal Server Error)_

> jika didalam data server ada error

```json
{
  "message": "Internal Server Error Ngab!"
}
```
## 10. GET /shipping/province
Request:

- Headers
  > token didapat setelah login

```json
{
  "access_token": <Access Token>
}
```

_Response (200 - OK)_

> jika berhasil membaca data

```json
{
  "statusCode": 200,
}
```

_Response (500 - Internal Server Error)_

> jika didalam data server ada error

```json
{
  "message": "Internal Server Error Ngab!"
}
```
## 11. GET /shipping/city`
Request:

- Headers
  > token didapat setelah login

```json
{
  "access_token": <Access Token>
}
```

_Response (200 - OK)_

> jika berhasil membaca data

```json
{
  "statusCode": 200,
}
```

_Response (500 - Internal Server Error)_

> jika didalam data server ada error

```json
{
  "message": "Internal Server Error Ngab!"
}
```
## 12. GET /shipping/cost
Request:

- Headers
  > token didapat setelah login

```json
{
  "access_token": <Access Token>
}
```

_Response (200 - OK)_

> jika berhasil membaca data

```json
{
  "statusCode": 200,
}
```

_Response (500 - Internal Server Error)_

> jika didalam data server ada error

```json
{
  "message": "Internal Server Error Ngab!"
}
```
## 13. POST /payment
_Via SNAP API Midtrans_




