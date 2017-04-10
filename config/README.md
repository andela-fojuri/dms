[![Build Status](https://travis-ci.org/andela-fojuri/dms.svg?branch=master)](https://travis-ci.org/andela-fojuri/dms)
# Document Management System 

Document Management System API contains several API end points that allows users to create, edit, retrieve and delete documents. It also offers a way to ensure that only authorized users can perform certain operations.

## API ENDPOINTS
**Users**

Request type | Endpoint | Action 
------------ | -------- | ------
POST | [/users](#create-users) | Create a new user
GET | [/users](#get-users) | Get all users
GET | [/users/:id](#get-a-user) | Get details of a specific user
PUT | [/users/:id](#update-user) | Edit user details
DELETE | [/users/:id](#delete-user) | Remove a user from storage
POST | [/users/login](#login) | To log a user in
POST | [/users/logout](#login) | To log a user out

**Roles**

Request type | Endpoint | Action 
------------ | -------- | ------
POST | [/roles](#create-role) | Create a new role
GET | [/roles](#get-roles) | Get all created roles
PUT | [/role/:id](#update-role) | To edit a role
DELETE | [/role/:id](#delete-a-role) | To delete a role

**Documents**

Request type | Endpoint | Action 
------------ | -------- | ------ 
POST | [/documents](#create-document) | Create a new document
GET | [/documents](#get-documents) | Retrieve all documents 
GET | [/documents/:id](#get-a-document) | Retrieve a specific document
PUT | [/documents/:id](#update-document) | Update a specific document
DELETE | [/documents/:id](#delete-document) | Remove a specific document from storage
GET| [/users/:id/documents](#get-usersdoc) | To retrieve all documents of a specific user
GET| [/users/documents](#get-usersdoc) | To retrieve all accessible documents such as public documents, document created by user and shared documents.
GET| [/role/documents](#get-usersdoc) | To retrieve all documents shared with the user.
GET| [/public/documents](#get-usersdoc) | To retrieve all public documents.
GET | [/documents??offset=0&limit=10](#get-documents) | Retrieve maximum of first 10 documents


**Search**

Request type | Endpoint | Action 
------------ | -------- | ------
GET | [/search/users](#search-user) | Search for a user
GET | [/search/documents/](#search-document) | Search for a document

Users
-----

## Create Users
To create a new user, make a **POST** request to `/users`
#### Request
```
{
    "username": "Yetunde",
    "email": "yetunde@gmail.com",
    "password": "yetunde",
    "password_confirmation": "yetunde"
}
```

#### Response
```
{
  "message": "User Created Successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImVtYWlsIjoieWV0dW5kZUBnbWFpbC5jb20iLCJyb2xlSWQiOjMsImlhdCI6MTQ5MTgyNDU5MCwiZXhwIjoxNDkxODYwNTkwfQ.EezfO9EyTbOTaYA8wUO_O-sGg_KbzbMvaPef2w3KsZM"
}
```

## Get Users
Fetches all users' details,
#### Request
  - Endpoint: **GET**: `/users`
  - Requires `Authorization` header to be set
#### Response
```
{
  "users": [
    {
      "id": 1,
      "username": "yemisi",
      "email": "yemisi@yahoo.com",
      "password_digest": "$2a$10$cBBuacSVltzzCjjHsxAKIOgs5.AApjdxltBTNqNtyJbDCn27uHGl2",
      "createdAt": "2017-03-29T19:54:35.398Z",
      "updatedAt": "2017-03-29T19:54:35.398Z",
      "roleId": 3
    },
    {
      "id": 4,
      "username": "Sunday",
      "email": "sunday@andela.com",
      "password_digest": "$2a$10$HoMaRyIsPjD1YdQspNI38u7j/C5pLb00plIw5YChmgomU0CY5iUYi",
      "createdAt": "2017-03-31T14:25:06.761Z",
      "updatedAt": "2017-03-31T14:25:06.761Z",
      "roleId": 3
    },
    {
      "id": 8,
      "username": "JurryTest",
      "email": "jurrytest@gmail.com",
      "password_digest": "$2a$10$BfWnoxTh0UVJs/a0e7LX.OC13pL0Ucm/xdGQMKDdBLbfbSI1BWPua",
      "createdAt": "2017-04-04T22:37:52.383Z",
      "updatedAt": "2017-04-04T22:37:52.383Z",
      "roleId": 2
    },
    {
      "id": 9,
      "username": "testUser",
      "email": "testuse@gmail.com",
      "password_digest": "$2a$10$vQJbB5T6NS/7KHyo5.xUpu352OCtXEyauK6R2jqQu6CMbxWn4IKR2",
      "createdAt": "2017-04-04T22:38:45.683Z",
      "updatedAt": "2017-04-04T22:38:45.683Z",
      "roleId": 3
    },
    {
      "id": 13,
      "username": "Emmanuel",
      "email": "emanuel@yahoo.com",
      "password_digest": "$2a$10$co.qy6YJcOX74LiZ4g6w5.JYM7eXJlytbtkOvEXzP1nUMTMkPjNAS",
      "createdAt": "2017-04-04T22:50:18.556Z",
      "updatedAt": "2017-04-04T22:50:18.556Z",
      "roleId": 3
    },
    {
      "id": 19,
      "username": "Isom Cartwright",
      "email": "melvina48@yahoo.com",
      "password_digest": "$2a$10$m5cqZSVj5wtg4UI1HSOXMe0IMspz13xuvSN8BAHd1IJPqSgZqaQS2",
      "createdAt": "2017-04-05T08:28:15.857Z",
      "updatedAt": "2017-04-05T08:28:15.857Z",
      "roleId": 3
    },
    {
      "id": 20,
      "username": "Kiara Tromp",
      "email": "river54@hotmail.com",
      "password_digest": "$2a$10$ODrTOMXpu2z729lom9SgpuMg7mxCAeymB6SjGeFlmywX4THlq5pgm",
      "createdAt": "2017-04-05T08:39:02.368Z",
      "updatedAt": "2017-04-05T08:39:02.368Z",
      "roleId": 3
    },
    {
      "id": 21,
      "username": "Mathias Bechtelar",
      "email": "jerry_keebler@hotmail.com",
      "password_digest": "$2a$10$5tLcDSuyLP4X3q46btXSLO3FO0hjDnpQ2YHGdsN99vs9j3M/FrvZ6",
      "createdAt": "2017-04-05T08:40:01.897Z",
      "updatedAt": "2017-04-05T08:40:01.897Z",
      "roleId": 3
    },
    {
      "id": 22,
      "username": "Cordie Schmitt",
      "email": "lexie.rosenbaum83@yahoo.com",
      "password_digest": "$2a$10$Gy9GEOzBtQe0/RaCVv5gr.49b46MWjtuO9qBTavJogtdzqMA8l9oi",
      "createdAt": "2017-04-05T09:08:29.582Z",
      "updatedAt": "2017-04-05T09:08:29.582Z",
      "roleId": 3
    },
    {
      "id": 24,
      "username": "Hassie Koss",
      "email": "tierra86@gmail.com",
      "password_digest": "$2a$10$wMYfMRlkGoUyUtH0IpRAd.chgDJQH5vPtl57pR/PESRgz68BWLrr2",
      "createdAt": "2017-04-05T22:34:53.236Z",
      "updatedAt": "2017-04-05T22:34:53.236Z",
      "roleId": 3
    },
    {
      "id": 18,
      "username": "JTest",
      "email": "jtest@gmail.com",
      "password_digest": "$2a$10$uQBWPvhY9D9xo7ttwEtinOhlpcUEyyMpgNDhO3XcF3F2f7zpyQGo6",
      "createdAt": "2017-04-04T22:59:27.187Z",
      "updatedAt": "2017-04-06T13:58:45.938Z",
      "roleId": 8
    },
    {
      "id": 25,
      "username": "newUser",
      "email": "newuser@gmail.com",
      "password_digest": "$2a$10$Wv7VtR1oYrDlTaNZI6hnPeHg0IQy8Wi7noOQ7DEaIccQj5qe5oe7.",
      "createdAt": "2017-04-06T14:06:35.698Z",
      "updatedAt": "2017-04-06T14:06:35.698Z",
      "roleId": 3
    },
    {
      "id": 26,
      "username": "Tolulope",
      "email": "tolu@gmail.com",
      "password_digest": "$2a$10$3u.rGowigvrDWalhT6bfCunwwJBYbG/bw23SoNxo2T1b9S.TX1LqC",
      "createdAt": "2017-04-06T20:21:06.123Z",
      "updatedAt": "2017-04-06T20:21:06.123Z",
      "roleId": 3
    },
    {
      "id": 16,
      "username": "testing",
      "email": "te@yahoo.com",
      "password_digest": "$2a$10$pmepBViOnyc4bfn91bvycOmqSB/L59W5l.Stc6Xm37DF86IkS7fNu",
      "createdAt": "2017-04-04T22:55:07.605Z",
      "updatedAt": "2017-04-06T20:51:36.255Z",
      "roleId": 10
    },
    {
      "id": 28,
      "username": "Adebimpe",
      "email": "bimpe@gmail.com",
      "password_digest": "$2a$10$WtRS9ECgUO2QAbZsTOAEIOzFunrEfGGlG9hPu7.Jg5kT01pIovkMC",
      "createdAt": "2017-04-06T20:22:48.100Z",
      "updatedAt": "2017-04-06T22:07:26.663Z",
      "roleId": 4
    },
    {
      "id": 30,
      "username": "Ward Farrell",
      "email": "ressie.grant97@gmail.com",
      "password_digest": "$2a$10$KpaVNBEz3muxcUSH8umVsO4TsI58wUunRiFGtll9wJiTjmxguTfDu",
      "createdAt": "2017-04-07T10:28:21.030Z",
      "updatedAt": "2017-04-07T10:28:21.030Z",
      "roleId": 3
    },
    {
      "id": 31,
      "username": "Frances Lakin",
      "email": "robin_weber37@gmail.com",
      "password_digest": "$2a$10$dw.GTXm.FplLuakrr1G73egMkb9g.0biN9Hl..ZaTlBJ2Hu7RDpPK",
      "createdAt": "2017-04-07T10:30:18.953Z",
      "updatedAt": "2017-04-07T10:30:18.953Z",
      "roleId": 3
    },
    {
      "id": 33,
      "username": "Grady Schaefer",
      "email": "leone_morar@yahoo.com",
      "password_digest": "$2a$10$vfQa6VZI8L9kQo5QGy9fgO2XuIJfmSqr5MIjx/kAWJKbXK8wnoiVG",
      "createdAt": "2017-04-07T10:38:03.260Z",
      "updatedAt": "2017-04-07T10:38:03.260Z",
      "roleId": 3
    },
    {
      "id": 34,
      "username": "Dr. Ian Witting",
      "email": "rowland_weissnat@yahoo.com",
      "password_digest": "$2a$10$l4KL2BGLHOvOk6kisQdBhuuM9nGeH9gnRZmgDjyfPBQeOb90ALKKa",
      "createdAt": "2017-04-07T10:40:57.381Z",
      "updatedAt": "2017-04-07T10:40:57.381Z",
      "roleId": 3
    },
    {
      "id": 35,
      "username": "Ugonna",
      "email": "ugonna@yahho.com",
      "password_digest": "$2a$10$NcHa5UUq2cM67r86VWAM7eqSgR/a1/dkh0NMjguTJuC05S1htQrdG",
      "createdAt": "2017-04-07T10:42:34.235Z",
      "updatedAt": "2017-04-07T10:42:34.235Z",
      "roleId": 3
    },
    {
      "id": 36,
      "username": "kjhgcfx",
      "email": "gg@u.com",
      "password_digest": "$2a$10$9GV.3R5Tjeuhq7dT1vSSWORvbNWVccETgG7jODlM1Op8xVOU6Vz7a",
      "createdAt": "2017-04-07T10:44:36.014Z",
      "updatedAt": "2017-04-07T10:44:36.014Z",
      "roleId": 3
    },
    {
      "id": 37,
      "username": "werghjm",
      "email": "er@yahho.com",
      "password_digest": "$2a$10$8GG4oHmzssRr7C/pGYwvX.mq8NDioI15IR6qfrOjbL9CDAIHGkIKm",
      "createdAt": "2017-04-07T10:51:31.456Z",
      "updatedAt": "2017-04-07T10:51:31.456Z",
      "roleId": 3
    },
    {
      "id": 38,
      "username": "Solon Stehr",
      "email": "noelia4@gmail.com",
      "password_digest": "$2a$10$8KXoMgvB2u.QaZ2bvY631.CpbaY6a/Kv4tJouZmBln8OD.WgC6Gg2",
      "createdAt": "2017-04-07T10:52:30.761Z",
      "updatedAt": "2017-04-07T10:52:30.761Z",
      "roleId": 3
    },
    {
      "id": 39,
      "username": "Tristian Ward",
      "email": "nicola30@gmail.com",
      "password_digest": "$2a$10$pFwiUg8qcqkTg1OGvra24u0RrZnWfu2ywyDQzyHrBv6zDu5hfJ6we",
      "createdAt": "2017-04-07T11:23:10.449Z",
      "updatedAt": "2017-04-07T11:23:10.449Z",
      "roleId": 3
    },
    {
      "id": 40,
      "username": "Martin Schmitt",
      "email": "hermann28@hotmail.com",
      "password_digest": "$2a$10$LEN4SAx8LE0k0ad6sztVkeyZ/I1A4geKAHQEpaULI0BBZyz4VSkl2",
      "createdAt": "2017-04-07T11:25:59.983Z",
      "updatedAt": "2017-04-07T11:25:59.983Z",
      "roleId": 3
    },
    {
      "id": 41,
      "username": "Mr. Ova Maggio",
      "email": "wilfredo.smith31@gmail.com",
      "password_digest": "$2a$10$BQ9G0hgmRBThO47OK1Cpg.M/jQnTuqDaem8dsrN63jfJSz9aKTZBe",
      "createdAt": "2017-04-07T11:29:14.957Z",
      "updatedAt": "2017-04-07T11:29:14.957Z",
      "roleId": 3
    },
    {
      "id": 42,
      "username": "Norval Oberbrunner",
      "email": "al.wiegand66@yahoo.com",
      "password_digest": "$2a$10$nYWrPxEuISA0cc.l/xe5A.l5FlJ/XcERmqHK3j6nfM6OSg65XBax6",
      "createdAt": "2017-04-07T15:03:19.963Z",
      "updatedAt": "2017-04-07T15:03:19.963Z",
      "roleId": 3
    },
    {
      "id": 3,
      "username": "Fisayomi",
      "email": "fisayomi.ojuri@andela.com",
      "password_digest": "$2a$10$75QI2BggpeZkHrjsh0NVq.cFJc4xwRN2XiQQfigKhmi2sVoY9f9Ju",
      "createdAt": "2017-03-30T14:53:44.355Z",
      "updatedAt": "2017-04-08T21:07:00.563Z",
      "roleId": 1
    },
    {
      "id": 43,
      "username": "Yetunde",
      "email": "yetunde@gmail.com",
      "password_digest": "$2a$10$A0RCdxYGgFGgIITdk.L3EOv0NlAk2P3mh0Nw8CR8/HNxHLzf9N0OK",
      "createdAt": "2017-04-10T11:43:10.504Z",
      "updatedAt": "2017-04-10T11:43:10.504Z",
      "roleId": 3
    }
  ],
  "count": 29
}
```


## Find A User
#### Request
  - Endpoint: **GET**: `/users/:id`
  - Requires `Authorization` header to be set
#### Response
```
{
  "id": 3,
  "username": "Fisayomi",
  "email": "fisayomi.ojuri@andela.com",
  "password_digest": "$2a$10$75QI2BggpeZkHrjsh0NVq.cFJc4xwRN2XiQQfigKhmi2sVoY9f9Ju",
  "createdAt": "2017-03-30T14:53:44.355Z",
  "updatedAt": "2017-04-08T21:07:00.563Z",
  "roleId": 1,
  "Role": {
    "id": 1,
    "category": "SuperAdmin",
    "createdAt": "2017-03-29T19:51:32.526Z",
    "updatedAt": "2017-03-29T19:51:32.526Z"
  }
}
```
## Update user
#### Request
  - Enpoint: **PUT**: `/users/:id`
  - Requires `Authorization` header to be set
```
{
  "RoleId": 4
}
```
#### Response
```
{
  "message": "Role Updated Successfully"
}
```

## Delete user
#### Request
  - Enpoint: **DELETE**: `/users/:id`
  - Requires `Authorization` header to be set
#### Response

```
{
  "message": "User deleted Successfully"
}
```

## User login
### Request 
 - Endpoint: **POST**: `/users/login`
```
{
    "email": "yemisi",
    "password":"yemisi"
}
``` 

### Response 
``` 
{
  "message": "Successfully logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5ZW1pc2lAeWFob28uY29tIiwicm9sZUlkIjozLCJSb2xlIjp7ImlkIjozLCJjYXRlZ29yeSI6IlJlZ3VsYXIiLCJjcmVhdGVkQXQiOiIyMDE3LTAzLTI5VDE5OjUxOjU1LjIyOFoiLCJ1cGRhdGVkQXQiOiIyMDE3LTAzLTI5VDE5OjUxOjU1LjIyOFoifSwiaWF0IjoxNDkxODI0OTA2LCJleHAiOjE0OTE4NjA5MDZ9.EOX9nSsN6vYI6pkpypY3rcif5_5JSn69LeOdudKtYc4"
}
```

# Get user's accessible Documents 
### Request
  - Enpoint: **GET**: `/user/documents`
  - Requires `Authorization` header to be set
  
### Response 
```
{
  "documents": [
    {
      "id": 34,
      "title": "ljskhagfxjhgfjhgfnbvjhg",
      "content": "<p>jkhgfdcfghjkjhgfdckjuhgkjhgfjujygfds</p>",
      "access": "Public",
      "createdAt": "2017-04-01T09:41:24.730Z",
      "updatedAt": "2017-04-01T09:41:24.730Z",
      "userId": 1,
      "User": {
        "id": 1,
        "username": "yemisi",
        "email": "yemisi@yahoo.com"
      }
    },
    {
      "id": 33,
      "title": "ljskhagfxjhgfjhgfnbv",
      "content": "<p>jkhgfdcfghjkjhgfdckjuhgkjhgf</p>",
      "access": "Public",
      "createdAt": "2017-04-01T09:41:16.502Z",
      "updatedAt": "2017-04-01T09:41:16.502Z",
      "userId": 1,
      "User": {
        "id": 1,
        "username": "yemisi",
        "email": "yemisi@yahoo.com"
      }
    },
    {
      "id": 30,
      "title": "ljskhagfxjhgfjhgf",
      "content": "<p>jkhgfdcfghjkjhgfdckjuhg</p>",
      "access": "Private",
      "createdAt": "2017-04-01T09:41:00.718Z",
      "updatedAt": "2017-04-01T09:41:00.718Z",
      "userId": 1,
      "User": {
        "id": 1,
        "username": "yemisi",
        "email": "yemisi@yahoo.com"
      }
    },
    {
      "id": 28,
      "title": "ljskhagfxjhgf",
      "content": "<p>jkhgfdcfghjkjhgfdc</p>",
      "access": "Role",
      "createdAt": "2017-04-01T09:40:32.903Z",
      "updatedAt": "2017-04-01T09:40:32.903Z",
      "userId": 1,
      "User": {
        "id": 1,
        "username": "yemisi",
        "email": "yemisi@yahoo.com"
      }
    },
    {
      "id": 27,
      "title": "ljskhagfx",
      "content": "<p>jkhgfdcfghjkupdated</p>",
      "access": "Role",
      "createdAt": "2017-04-01T09:40:19.128Z",
      "updatedAt": "2017-04-08T16:37:19.558Z",
      "userId": 1,
      "User": {
        "id": 1,
        "username": "yemisi",
        "email": "yemisi@yahoo.com"
      }
    },
    {
      "id": 9,
      "title": "Sunday_Doc",
      "content": "<p>This is my first Doc</p>",
      "access": "Role",
      "createdAt": "2017-03-31T14:29:43.227Z",
      "updatedAt": "2017-03-31T14:29:43.227Z",
      "userId": 4,
      "User": {
        "id": 4,
        "username": "Sunday",
        "email": "sunday@andela.com"
      }
    }
  ],
  "count": 6
}
```

ROLES
-----
## Create Role
#### Request
  - Endpoint **POST** `/roles`
  - Requires `Authorization` header to be set
Body (application/json)
```
{
  "categoy": "testing"
}
```
#### Response
Body (application/json)
```
{
  "message": "Role created Successfully"
}
```

## Get Roles
#### Request
  - Endpoint **GET** `/roles`
  - Requires `Authorization` header to be set

#### Response
Body (application/json)
```
[
  {
    "id": 1,
    "category": "SuperAdmin",
    "createdAt": "2017-03-29T19:51:32.526Z",
    "updatedAt": "2017-03-29T19:51:32.526Z"
  },
  {
    "id": 2,
    "category": "Admin",
    "createdAt": "2017-03-29T19:51:44.268Z",
    "updatedAt": "2017-03-29T19:51:44.268Z"
  },
  {
    "id": 3,
    "category": "Regular",
    "createdAt": "2017-03-29T19:51:55.228Z",
    "updatedAt": "2017-03-29T19:51:55.228Z"
  },
  {
    "id": 4,
    "category": "Staff",
    "createdAt": "2017-03-29T19:52:09.640Z",
    "updatedAt": "2017-03-29T19:52:09.640Z"
  },
  {
    "id": 8,
    "category": "anotherRole",
    "createdAt": "2017-04-05T14:34:59.373Z",
    "updatedAt": "2017-04-05T14:34:59.373Z"
  },
  {
    "id": 11,
    "category": "testing",
    "createdAt": "2017-04-05T14:42:29.076Z",
    "updatedAt": "2017-04-05T14:42:29.076Z"
  }
```

## Update Role
#### Request
  - Endpoint **POST** `/roles/:11`
  - Requires `Authorization` header to be set
Body (application/json)
```
{
  "category": "tech"
}
```
#### Response
Body (application/json)
```
{
  "message": "Role Updated Successfully"
}
```

DOCUMENTS
---------
## Create Document
#### Request
  - Endpoint **POST** `/documents`
  - Requires `Authorization` header to be set
```
{
  "title": "test_Docc",
  "content": "This is a test Document",
  "access": "Role"
}
```
#### Response
  - Body `(application/json)`
```
{
  "message": "Document created Successfully"
}
```
## Get Document
#### Request
  - Endpoint **GET** `/public/documents`
  - Optional queries **offset** && **limit** (number of documents per page)
  - Requires `Authorization` header to be set

#### Response
```
{
  "documents": [
    {
      "id": 78,
      "title": "JavaLearning",
      "content": "I love coding",
      "access": "Public",
      "createdAt": "2017-04-10T11:57:12.328Z",
      "updatedAt": "2017-04-10T11:57:12.328Z",
      "userId": 3,
      "User": {
        "id": 3,
        "username": "Fisayomi",
        "email": "fisayomi.ojuri@andela.com"
      }
    },
    {
      "id": 65,
      "title": "sdfghj",
      "content": "<p>gthjk</p>",
      "access": "Public",
      "createdAt": "2017-04-07T10:19:28.700Z",
      "updatedAt": "2017-04-07T10:19:28.700Z",
      "userId": 3,
      "User": {
        "id": 3,
        "username": "Fisayomi",
        "email": "fisayomi.ojuri@andela.com"
      }
    },
    {
      "id": 64,
      "title": "defrghngfd",
      "content": "<p>dfgfgnhjkl</p>",
      "access": "Public",
      "createdAt": "2017-04-07T10:18:48.386Z",
      "updatedAt": "2017-04-07T10:18:48.386Z",
      "userId": 3,
      "User": {
        "id": 3,
        "username": "Fisayomi",
        "email": "fisayomi.ojuri@andela.com"
      }
    },
    {
      "id": 55,
      "title": "Sunday_type",
      "content": "<p>kjhgfdghj</p>",
      "access": "Public",
      "createdAt": "2017-04-05T14:08:11.491Z",
      "updatedAt": "2017-04-05T14:08:11.491Z",
      "userId": 3,
      "User": {
        "id": 3,
        "username": "Fisayomi",
        "email": "fisayomi.ojuri@andela.com"
      }
    },
    {
      "id": 34,
      "title": "ljskhagfxjhgfjhgfnbvjhg",
      "content": "<p>jkhgfdcfghjkjhgfdckjuhgkjhgfjujygfds</p>",
      "access": "Public",
      "createdAt": "2017-04-01T09:41:24.730Z",
      "updatedAt": "2017-04-01T09:41:24.730Z",
      "userId": 1,
      "User": {
        "id": 1,
        "username": "yemisi",
        "email": "yemisi@yahoo.com"
      }
    },
    {
      "id": 33,
      "title": "ljskhagfxjhgfjhgfnbv",
      "content": "<p>jkhgfdcfghjkjhgfdckjuhgkjhgf</p>",
      "access": "Public",
      "createdAt": "2017-04-01T09:41:16.502Z",
      "updatedAt": "2017-04-01T09:41:16.502Z",
      "userId": 1,
      "User": {
        "id": 1,
        "username": "yemisi",
        "email": "yemisi@yahoo.com"
      }
    }
  ],
  "count": 6
}
```

## Find A Document
#### Request
  - Endpoint **GET** `/documents/:id` where id is the id of the document
  - Requires `Authorization` header to be set

##### Response
```
{
  "id": 33,
  "title": "ljskhagfxjhgfjhgfnbv",
  "content": "<p>jkhgfdcfghjkjhgfdckjuhgkjhgf</p>",
  "access": "Public",
  "createdAt": "2017-04-01T09:41:16.502Z",
  "updatedAt": "2017-04-01T09:41:16.502Z",
  "userId": 1
}
```

## Update Document
#### Request
  - Endpoint **PUT** `/documents/:id` id is the id of the document
  - Requires `Authorization` header to be set
```
{
  "content": "I love coding updated"
}
```
##### Response
```
{
  "message": "Document updated Successfully"
}
```

## Delete Document
#### Request
  - Endpoint **DELETE** `/documents/:id`id of the document
  - Requires `Authorization` header to be set
#### Response
```
{
  "message": "Document deleted Successfully"
}
```

Search
-----

# Search for a user with username 
#### Request
  - Enpoint: **GET**: `/search/users?username=Sunday`
  - Requires `Authorization` header to be set as Admin/Super Admin

#### Response 

```
{
  "users": [
    {
      "id": 4,
      "username": "Sunday",
      "email": "sunday@andela.com",
      "password_digest": "$2a$10$HoMaRyIsPjD1YdQspNI38u7j/C5pLb00plIw5YChmgomU0CY5iUYi",
      "createdAt": "2017-03-31T14:25:06.761Z",
      "updatedAt": "2017-03-31T14:25:06.761Z",
      "roleId": 3
    }
  ],
  "count": 1
}
```

## Search Documents
#### Request
  - Endpoint **GET** `/search/documents?title=Sunday_type`
  - Requires `Authorization` header to be set
#### Response
```
{
  "documents": [
    {
      "id": 55,
      "title": "Sunday_type",
      "content": "<p>kjhgfdghj</p>",
      "access": "Public",
      "createdAt": "2017-04-05T14:08:11.491Z",
      "updatedAt": "2017-04-05T14:08:11.491Z",
      "userId": 3,
      "User": {
        "id": 3,
        "username": "Fisayomi",
        "email": "fisayomi.ojuri@andela.com"
      }
    }
  ],
  "count": 1
}
```