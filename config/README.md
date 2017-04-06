[![Build Status](https://travis-ci.org/andela-fojuri/dms.svg?branch=master)](https://travis-ci.org/andela-fojuri/dms)
# Document Management System 

Document Management System API contains several API end points that allows users to create, edit, retrieve and delete documents. It also offers a way to ensure that only authorized users can perform certain operations.

Development
-----------
The application was developed with [NodeJs](http://nodejs.org) and [Express](http://expressjs.com) is used for routing. The [Postgres](http://postgresql.com) database was used with [sequelize](http://sequelizejs.com) as the ORM

Installation
------------
1.  Ensure you have NodeJs and postgres installed
2.  Clone the repository `git clone https://github.com/andela-fojuri/dms.git`
3.  Change your directory `cd dms`
4.  Install all dependencies `npm install`
5.  Run tests  `npm test`
6.  Run integration test `npm run e2e`
7.  Start the app `npm start` and use [postman](https://www.getpostman.com/) to consume the API


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
  "success": true,
  "message": "User Created Successfully",
  "createdUser": {
    "id": 29,
    "username": "Yetunde",
    "email": "yetunde@gmail.com",
    "password": "yetunde",
    "password_confirmation": "yetunde",
    "roleId": 3,
    "updatedAt": "2017-04-06T20:31:30.512Z",
    "createdAt": "2017-04-06T20:31:30.512Z",
    "password_digest": "$2a$10$27HY4xUyMq2dGINYfE2k2e6sktlL265cNyjPrBgUQXL997G2AOs.W"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImVtYWlsIjoieWV0dW5kZUBnbWFpbC5jb20iLCJyb2xlSWQiOjMsImlhdCI6MTQ5MTUxMDY5MCwiZXhwIjoxNDkxNTQ2NjkwfQ.78zyf7GLfgZkodRT6pqcG87K6poHTkizfDGOFhmBEN4"
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
  "success": true,
  "message": [
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
      "id": 3,
      "username": "Fisayomi",
      "email": "fisayomi.ojuri@andela.com",
      "password_digest": "$2a$10$FLmcv3/RXSeAuEjx92lpjevLCK6vpiJBWRDsSud/DFwdCsyIp92gy",
      "createdAt": "2017-03-30T14:53:44.355Z",
      "updatedAt": "2017-03-30T14:53:44.355Z",
      "roleId": 1
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
      "id": 28,
      "username": "Adebimpe",
      "email": "bimpe@gmail.com",
      "password_digest": "$2a$10$WtRS9ECgUO2QAbZsTOAEIOzFunrEfGGlG9hPu7.Jg5kT01pIovkMC",
      "createdAt": "2017-04-06T20:22:48.100Z",
      "updatedAt": "2017-04-06T20:22:48.100Z",
      "roleId": 3
    },
    {
      "id": 29,
      "username": "Yetunde",
      "email": "yetunde@gmail.com",
      "password_digest": "$2a$10$27HY4xUyMq2dGINYfE2k2e6sktlL265cNyjPrBgUQXL997G2AOs.W",
      "createdAt": "2017-04-06T20:31:30.512Z",
      "updatedAt": "2017-04-06T20:31:30.512Z",
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
    }
  ],
  "count": 17
}
```


## Find A User
#### Request
  - Endpoint: **GET**: `/users/:id`
  - Requires `Authorization` header to be set
#### Response
```
{
  "success": true,
  "message": {
    "id": 16,
    "username": "testing",
    "email": "te@yahoo.com",
    "password_digest": "$2a$10$pmepBViOnyc4bfn91bvycOmqSB/L59W5l.Stc6Xm37DF86IkS7fNu",
    "createdAt": "2017-04-04T22:55:07.605Z",
    "updatedAt": "2017-04-06T20:51:36.255Z",
    "roleId": 10,
    "Role": {
      "id": 10,
      "category": "test2",
      "createdAt": "2017-04-05T14:39:10.388Z",
      "updatedAt": "2017-04-05T22:19:20.160Z"
    }
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
  "success": true,
  "message": {
    "id": 28,
    "username": "Adebimpe",
    "email": "bimpe@gmail.com",
    "password_digest": "$2a$10$WtRS9ECgUO2QAbZsTOAEIOzFunrEfGGlG9hPu7.Jg5kT01pIovkMC",
    "createdAt": "2017-04-06T20:22:48.100Z",
    "updatedAt": "2017-04-06T22:07:26.663Z",
    "roleId": "4"
  }
}
```

## Delete user
#### Request
  - Enpoint: **DELETE**: `/users/:id`
  - Requires `Authorization` header to be set
#### Response

```
{
  "success": true,
  "message": "User deleted Successfully"
}
```

## User login
### Request 
 - Endpoint: **POST**: `/users/login`
```
{
    "email": "Fisayomi",
    "password":"fisayomi"
}
``` 

### Response 
``` 
{
  "success": true,
  "message": "Successfully logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJmaXNheW9taS5vanVyaUBhbmRlbGEuY29tIiwicm9sZUlkIjoxLCJSb2xlIjp7ImlkIjoxLCJjYXRlZ29yeSI6IlN1cGVyQWRtaW4iLCJjcmVhdGVkQXQiOiIyMDE3LTAzLTI5VDE5OjUxOjMyLjUyNloiLCJ1cGRhdGVkQXQiOiIyMDE3LTAzLTI5VDE5OjUxOjMyLjUyNloifSwiaWF0IjoxNDkxNTE1ODAwLCJleHAiOjE0OTE1NTE4MDB9.tnGpWrYtPg6XLsqDgIwiLyi3WHW8BJ4NQ0p4lHSXCnc",
  "user": 3
}
```

# Get user's accessible Documents 
### Request
  - Enpoint: **GET**: `/user/documents`
  - Requires `Authorization` header to be set
  
### Response 
```
{
  "success": true,
  "message": [
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
        "email": "yemisi@yahoo.com",
        "password_digest": "$2a$10$cBBuacSVltzzCjjHsxAKIOgs5.AApjdxltBTNqNtyJbDCn27uHGl2",
        "createdAt": "2017-03-29T19:54:35.398Z",
        "updatedAt": "2017-03-29T19:54:35.398Z",
        "roleId": 3
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
        "email": "yemisi@yahoo.com",
        "password_digest": "$2a$10$cBBuacSVltzzCjjHsxAKIOgs5.AApjdxltBTNqNtyJbDCn27uHGl2",
        "createdAt": "2017-03-29T19:54:35.398Z",
        "updatedAt": "2017-03-29T19:54:35.398Z",
        "roleId": 3
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
        "email": "yemisi@yahoo.com",
        "password_digest": "$2a$10$cBBuacSVltzzCjjHsxAKIOgs5.AApjdxltBTNqNtyJbDCn27uHGl2",
        "createdAt": "2017-03-29T19:54:35.398Z",
        "updatedAt": "2017-03-29T19:54:35.398Z",
        "roleId": 3
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
        "email": "yemisi@yahoo.com",
        "password_digest": "$2a$10$cBBuacSVltzzCjjHsxAKIOgs5.AApjdxltBTNqNtyJbDCn27uHGl2",
        "createdAt": "2017-03-29T19:54:35.398Z",
        "updatedAt": "2017-03-29T19:54:35.398Z",
        "roleId": 3
      }
    },
    {
      "id": 27,
      "title": "ljskhagfx",
      "content": "<p>jkhgfdcfghjk</p>",
      "access": "Role",
      "createdAt": "2017-04-01T09:40:19.128Z",
      "updatedAt": "2017-04-01T09:40:19.128Z",
      "userId": 1,
      "User": {
        "id": 1,
        "username": "yemisi",
        "email": "yemisi@yahoo.com",
        "password_digest": "$2a$10$cBBuacSVltzzCjjHsxAKIOgs5.AApjdxltBTNqNtyJbDCn27uHGl2",
        "createdAt": "2017-03-29T19:54:35.398Z",
        "updatedAt": "2017-03-29T19:54:35.398Z",
        "roleId": 3
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
        "email": "sunday@andela.com",
        "password_digest": "$2a$10$HoMaRyIsPjD1YdQspNI38u7j/C5pLb00plIw5YChmgomU0CY5iUYi",
        "createdAt": "2017-03-31T14:25:06.761Z",
        "updatedAt": "2017-03-31T14:25:06.761Z",
        "roleId": 3
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
  "category": "technical"
}
```
#### Response
Body (application/json)
```
{
  "success": true,
  "message": "Role created Successfully",
  "createdRole": {
    "id": 14,
    "category": "technical",
    "updatedAt": "2017-04-06T22:28:20.167Z",
    "createdAt": "2017-04-06T22:28:20.167Z"
  }
}
```

## Get Roles
#### Request
  - Endpoint **GET** `/roles`
  - Requires `Authorization` header to be set

#### Response
Body (application/json)
```
{
  "success": true,
  "message": [
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
      "id": 7,
      "category": "another",
      "createdAt": "2017-04-05T14:17:59.919Z",
      "updatedAt": "2017-04-05T14:17:59.919Z"
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
    },
    {
      "id": 12,
      "category": "cgcvdgfds",
      "createdAt": "2017-04-05T14:48:50.672Z",
      "updatedAt": "2017-04-05T14:48:50.672Z"
    },
    {
      "id": 10,
      "category": "test2",
      "createdAt": "2017-04-05T14:39:10.388Z",
      "updatedAt": "2017-04-05T22:19:20.160Z"
    }
  ]
}
```

## Update Role
#### Request
  - Endpoint **POST** `/roles/:id`
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
  "success": true,
  "message": "Role Updated Successfully",
  "role": {
    "id": 14,
    "category": "tech",
    "createdAt": "2017-04-06T22:28:20.167Z",
    "updatedAt": "2017-04-06T22:29:29.938Z"
  }
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
  "success": true,
  "message": "Document added Successfully",
  "createdDocument": {
    "id": 59,
    "title": "test_Doccc",
    "content": "This is a test Document",
    "access": "Role",
    "userId": 3,
    "updatedAt": "2017-04-06T22:35:32.001Z",
    "createdAt": "2017-04-06T22:35:32.001Z"
  }
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
  "success": true,
  "message": [
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
        "email": "fisayomi.ojuri@andela.com",
        "password_digest": "$2a$10$FLmcv3/RXSeAuEjx92lpjevLCK6vpiJBWRDsSud/DFwdCsyIp92gy",
        "createdAt": "2017-03-30T14:53:44.355Z",
        "updatedAt": "2017-03-30T14:53:44.355Z",
        "roleId": 1
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
        "email": "yemisi@yahoo.com",
        "password_digest": "$2a$10$cBBuacSVltzzCjjHsxAKIOgs5.AApjdxltBTNqNtyJbDCn27uHGl2",
        "createdAt": "2017-03-29T19:54:35.398Z",
        "updatedAt": "2017-03-29T19:54:35.398Z",
        "roleId": 3
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
        "email": "yemisi@yahoo.com",
        "password_digest": "$2a$10$cBBuacSVltzzCjjHsxAKIOgs5.AApjdxltBTNqNtyJbDCn27uHGl2",
        "createdAt": "2017-03-29T19:54:35.398Z",
        "updatedAt": "2017-03-29T19:54:35.398Z",
        "roleId": 3
      }
    }
  ],
  "count": 3
}
```

## Find A Document
#### Request
  - Endpoint **GET** `/documents/:id` where id is the id of the document
  - Requires `Authorization` header to be set

##### Response
```
{
  "success": true,
  "message": {
    "id": 33,
    "title": "ljskhagfxjhgfjhgfnbv",
    "content": "<p>jkhgfdcfghjkjhgfdckjuhgkjhgf</p>",
    "access": "Public",
    "createdAt": "2017-04-01T09:41:16.502Z",
    "updatedAt": "2017-04-01T09:41:16.502Z",
    "userId": 1
  }
}
```

## Update Document
#### Request
  - Endpoint **PUT** `/documents/:id` id is the id of the document
  - Requires `Authorization` header to be set
```
{
  "content": "This is an updated test Document"
}
```
##### Response
```
{
  "success": true,
  "message": "Document updated Successfully",
  "document": {
    "id": 59,
    "title": "test_Doccc",
    "content": "This is an updated test Document",
    "access": "Role",
    "createdAt": "2017-04-06T22:35:32.001Z",
    "updatedAt": "2017-04-06T22:40:02.254Z",
    "userId": 3
  }
}
```

## Delete Document
#### Request
  - Endpoint **DELETE** `/documents/:id`id of the document
  - Requires `Authorization` header to be set
#### Response
```
{
  "success": true,
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
  "success": true,
  "message": [
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
  "success": true,
  "message": [
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
        "email": "fisayomi.ojuri@andela.com",
        "password_digest": "$2a$10$FLmcv3/RXSeAuEjx92lpjevLCK6vpiJBWRDsSud/DFwdCsyIp92gy",
        "createdAt": "2017-03-30T14:53:44.355Z",
        "updatedAt": "2017-03-30T14:53:44.355Z",
        "roleId": 1
      }
    }
  ],
  "count": 1
}
```