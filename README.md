# fancy-todo

### - Port : 3000

## - Routes :

### 1. User :

#### 1. Login :

- #### method : POST
- #### URL : http://localhost:3000/users/login
- #### body :

```
 {
    email: String,
    password: String
 }
```

- #### success :

```
status: 200,
result:
 {
    token: <access token>
 }
```

- #### fail :

```
status: 401,
result: "Invalid email or password"
```

#### 2. Register :

- #### method : POST
- #### URL : http://localhost:3000/users/register
- #### body :

  ```
   {
       email: String,
       password: String
   }
  ```

- #### success :

  ```
  {
     "_id": "5e1badb60312410893d356a9",
     "email": "<email>",
     "password":<hashed password>,
     "createdAt": "2020-01-12T17:00:00.000Z",
  }
  ```

- #### fail :
  ```
  status: 400
  result: "email must be unique"
  ```

```
status : 400
result:
[
  "User.email cannot be null",
  "User.password cannot be null"
]
```

### 2. Todo :

```
Seluruh akses di pada endpoint /todos menggunakan authorizasi

Authorization:
token: <login token>

Failed Authorization : "Invalid access token"
```

#### 1. Get all user's todos :

- #### method : GET
- #### URL : http://localhost:3000/todos/
- #### body : Null
- #### success :
  > ```
  > [
  >  {
  >     "_id": "5e1bb3d399f1020f41dcbf74",
  >      "todoname": "example",
  >      "description": "example todo",
  >      "due_date": "2020-01-13T00:01:02.355Z",
  >      "userId": "5e1badb60312410893d356a9",
  >      "status": false,
  >      "created_at": "2020-01-13T00:03:31.504Z"
  >  },
  >  ... or more
  > ]
  > ```

#### 2. Create Todo :

> Seluruh akses create di todo memiliki hooks :
>
> 1.  Jika todoname kosong maka akan menjadi = '(No Title)'
> 2.  Default status ketika create adalah **false**
> 3.  Default createdAt atau timestamp nya adalah waktu todo itu dibuat
> 4.  Jika due_date tidak diisi maka default menjadi tanggal todo dibuat

- #### method : POST
- #### URL : http://localhost:3000/todos/add
- #### body :

  > due_date menggunakan format isoString
  >
  > ```
  > {
  > "todoname" : "example",
  > "description" : "example todo",
  > "due_date" : "2020-01-13T00:01:02.355Z"
  > }
  > ```

- #### success :

  > ```
  > {
  >  "msg": "Todo's Added",
  >  "result": {
  >      "_id": "5e1bb3d399f1020f41dcbf74",
  >      "todoname": "example",
  >      "description": "example todo",
  >      "due_date": "2020-01-13T00:01:02.355Z",
  >      "userId": "5e1badb60312410893d356a9",
  >      "status": false,
  >      "created_at": "2020-01-13T00:03:31.504Z",
  >      "__v": 0
  >  }
  > }
  > ```

- ### fail :
  > Jika description tidak di isi
  >
  > > ```
  > > {
  > >  "status": 400,
  > >  "msg": {
  > >      "description": {
  > >          "message": "Description must not empty",
  > >          "name": "ValidatorError",
  > >          "properties": {
  > >              "message": "Description must not empty",
  > >              "type": "required",
  > >              "path": "description"
  > >          },
  > >          "kind": "required",
  > >          "path": "description"
  > >      }
  > >  }
  > > }
  > > ```

#### 3. Update :

- #### method : PUT
  > params menggunakan id todo
- #### URL : http://localhost:3000/todos/update/:id
- #### body :

  > ```
  > {
  > "todoname" : "example update",
  > "description" : "example todo update",
  > "due_date" : ""
  > }
  > ```

- #### success :

  > ```
  > {
  >  "msg": "Todo has been updated"
  > }
  > ```

- #### fail :
  > Jika todo id salah
  >
  > ```
  > {
  > "stringValue": "\"5e1bb76e974fa4151df0108\"",
  > "kind": "ObjectId",
  > "value": "5e1bb76e974fa4151df0108",
  > "path": "_id",
  > "reason": {},
  > "message": "Cast to ObjectId failed for value \"5e1bb76e974fa4151df0108\" at path \"_id\" for model \"Todo\"",
  > "name": "CastError"
  > }
  > ```

#### 4. Delete :

- #### method : DELETE
  > params menggunakan id todo
- #### URL : http://localhost:3000/todos/delete/:id
- #### body : Null
- #### success :
  > ```
  > {
  >  "msg": "Todo has been deleted",
  >  "result": {
  >      "_id": "5e1bb3d399f1020f41dcbf74",
  >      "todoname": "example",
  >      "description": "example todo",
  >      "due_date": "2020-01-13T00:01:02.355Z",
  >      "userId": "5e1badb60312410893d356a9",
  >      "status": false,
  >      "created_at": "2020-01-13T00:03:31.504Z",
  >      "__v": 0
  >  }
  > }
  > ```
- #### fail :
  > Jika todo id salah :
  >
  > ```
  > {
  > "stringValue": "\"5e1bb76e974fa4151df0108\"",
  > "kind": "ObjectId",
  > "value": "5e1bb76e974fa4151df0108",
  > "path": "_id",
  > "reason": {},
  > "message": "Cast to ObjectId failed for value \"5e1bb76e974fa4151df0108\" at path \"_id\" for model \"Todo\"",
  > "name": "CastError"
  > }
  > ```
