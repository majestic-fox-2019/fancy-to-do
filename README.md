# fancy-to-do

an App to keep track of your todo lists

Base url : `http://localhost:3000`

## User auth
- url : `/user/`

    - #### Login
        Type : `POST`
        url : `/user/login` 
        Body : 
        ````
        {
            email : String,
            password : String
        }
        ````  
        Response : 
        ```
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb3ZpQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMDgkS3ZVbkdjb01RdjBsMDhna0toSnhJZWN2eXpJbzF3Unp3b0RJSnh3L01kOHlYSHBGcFpMUm0iLCJpYXQiOjE1ODIxMjAxNDB9.-kmgjkJiVQL-e7lwoJXa8IOn8INkNo7ZWh8yJGNAHZ8"
        ```
        On Fail : 
        - Unregistered email : 
        ````
        {
            "msg": "user not found"
        }
        ````
        - Wrong password : 
        ````
        {
            "msg": "invalid password"
        }
        ````
    - #### Register
        Type : `POST`
        url : `/user/register` 
        Body : 
        ````
        {
            email : String,
            password : String
        }
        ````  
        Response : 
        ```
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb3ZpQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMDgkS3ZVbkdjb01RdjBsMDhna0toSnhJZWN2eXpJbzF3Unp3b0RJSnh3L01kOHlYSHBGcFpMUm0iLCJpYXQiOjE1ODIxMjAxNDB9.-kmgjkJiVQL-e7lwoJXa8IOn8INkNo7ZWh8yJGNAHZ8"
        ```
        On Fail : 
        - Null email : 
        ````
        {
            "msg": "User.email cannot be null"
        }
        ````
        - Null password : 
        ````
        {
            "msg": "User.password cannot be null"
        }
        ````
## Todo 
- url : `/todo/`
- headers : { token : `STRING` }

- ##### Token required
    response body if token is not provided in the headers : 
    ```
    {
        "msg" : "invalid token"
    }
    ```

    - #### Add new todo
        Type : `POST`
        url : `/todo/` 
        Body : 
        ````
        {
            title : String,
            desc : String,
            due_date : String,
        }
        ````  
        Response : 
        ```
        {
            "status": 0,
            "id": 22,
            "title": "test",
            "desc": "ini test todo di dalam project",
            "due_date": null,
            "UserId": 1,
            "updatedAt": "2020-02-19T14:38:52.952Z",
            "createdAt": "2020-02-19T14:38:52.952Z",
            "ProjectId": null
        }
        ```
        On Fail : 
        - Contains profanity : 
        ````
        {
            "msg": "words contain profanity"
        }
        ````
        - Null title : 
        ````
        {
            "msg": "Todo.title cannot be null"
        }
        ````
        - Null description : 
        ````
        {
            "msg": "Todo.desc cannot be null"
        }
        ````
    - #### Delete a todo
        Type : `DELETE`
        url : `/todo/:id` 
        Response : 
        ```
        {
            1
        }
        ```
        On Fail : 
        - Todo doesn't exist : 
        ````
        {
            "msg": "todo not found"
        }
        ````
        - Todo doesn't belong to the user token : 
        ````
        {
            "msg": "Unauthorized"
        }
        ````
    - #### Edit a todo
        Type : `PUT`
        url : `/todo/:id` 
        Body : 
        ````
        {
            title : String,
            desc : String,
            due_date : String,
        }
        ````  
        Response : 
        ```
        {
            1
        }
        ```
        On Fail : 
        - Contains profanity : 
        ````
        {
            "msg": "words contain profanity"
        }
        ````
        - Null title : 
        ````
        {
            "msg": "Todo.title cannot be null"
        }
        ````
        - Null description : 
        ````
        {
            "msg": "Todo.desc cannot be null"
        }
        ````
        - Todo doesn't exist : 
        ````
        {
            "msg": "todo not found"
        }
        ````
        - Todo doesn't belong to the user token : 
        ````
        {
            "msg": "Unauthorized"
        }
        ````
    - #### Read all user's todo
        Type : `GET`
        url : `/todo/` 
        Response : 
        ```
        {
            [
                {
                    "id": 18,
                    "title": "projectan nih",
                    "desc": "projectt",
                    "due_date": "2020-02-21 00:00:00.000 +00:00",
                    "status": 0,
                    "UserId": 1,
                    "ProjectId": 5,
                    "createdAt": "2020-02-19T10:29:52.595Z",
                    "updatedAt": "2020-02-19T10:29:52.595Z",
                    "User": {
                        "email": "jovi@mail.com"
                    }
                },
                {
                    "id": 20,
                    "title": "fuck it",
                    "desc": "ini test todo di dalam project",
                    "due_date": null,
                    "status": 0,
                    "UserId": 1,
                    "ProjectId": null,
                    "createdAt": "2020-02-19T14:37:49.904Z",
                    "updatedAt": "2020-02-19T14:37:49.904Z",
                    "User": {
                        "email": "jovi@mail.com"
                    }
                },
                {
                    "id": 21,
                    "title": "fuck it",
                    "desc": "ini test todo di dalam project",
                    "due_date": null,
                    "status": 0,
                    "UserId": 1,
                    "ProjectId": null,
                    "createdAt": "2020-02-19T14:38:13.041Z",
                    "updatedAt": "2020-02-19T14:38:13.041Z",
                    "User": {
                        "email": "jovi@mail.com"
                    }
                },
                {
                    "id": 22,
                    "title": "test",
                    "desc": "ini test todo di dalam project",
                    "due_date": null,
                    "status": 0,
                    "UserId": 1,
                    "ProjectId": null,
                    "createdAt": "2020-02-19T14:38:52.952Z",
                    "updatedAt": "2020-02-19T14:38:52.952Z",
                    "User": {
                        "email": "jovi@mail.com"
                    }
                }
            ]
        }
        ```
    - #### Read one of user's todo
        Type : `GET`
        url : `/todo/:id` 
        Response : 
        ```
        {
            "id": 18,
            "title": "projectan nih",
            "desc": "projectt",
            "due_date": "2020-02-21 00:00:00.000 +00:00",
            "status": 0,
            "UserId": 1,
            "ProjectId": 5,
            "createdAt": "2020-02-19T10:29:52.595Z",
            "updatedAt": "2020-02-19T10:29:52.595Z",
            "User": {
                "email": "jovi@mail.com"
        }
        ```
    
    ## Project 
    - url : `/project/`
    - headers : { token : `STRING` }

    - ##### Token required
        response body if token is not provided in the headers : 
        ```
        {
            "msg" : "invalid token"
        }
        ```

        - #### Add new project
            Type : `POST`
            url : `/project/` 
            Body : 
            ````
            {
                title : String,
                desc : String,
                due_date : String,
            }
            ````  
            Response : 
            ```
            {
                "status": 0,
                "id": 22,
                "title": "test",
                "desc": "ini test todo di dalam project",
                "due_date": null,
                "UserId": 1,
                "AuthorId" : 2,
                "updatedAt": "2020-02-19T14:38:52.952Z",
                "createdAt": "2020-02-19T14:38:52.952Z",
                "ProjectId": null
            }
            ```
            On Fail : 
            - Contains profanity : 
            ````
            {
                "msg": "words contain profanity"
            }
            ````
            - Null title : 
            ````
            {
                "msg": "Project.title cannot be null"
            }
            ````
            - Null description : 
            ````
            {
                "msg": "Project.desc cannot be null"
            }
            ````
    
    - #### Register
        Type : `POST`
        url : `/user/register` 
        Body : 
        ````
        {
            email : String,
            password : String
        }
        ````  
        Response : 
        ```
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb3ZpQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMDgkS3ZVbkdjb01RdjBsMDhna0toSnhJZWN2eXpJbzF3Unp3b0RJSnh3L01kOHlYSHBGcFpMUm0iLCJpYXQiOjE1ODIxMjAxNDB9.-kmgjkJiVQL-e7lwoJXa8IOn8INkNo7ZWh8yJGNAHZ8"
        ```
        On Fail : 
        - Null email : 
        ````
        {
            "msg": "User.email cannot be null"
        }
        ````
        - Null password : 
        ````
        {
            "msg": "User.password cannot be null"
        }
        ````