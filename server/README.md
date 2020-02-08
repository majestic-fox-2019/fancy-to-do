# Fancy To-Do List



## Routes

- ### router**.**get("/",todoController.getAll)

  to get all todo list in database

  - #### Path Parameters

    - ##### NO Parameter required

  - #### Responses

    - ##### 201

      ​	

      ```
    {
      
      			"message": "success",
      
      			"result": [
      
    ​    			{
      
    ​    	  			"id": 5,
      
    ​      				"Title": "excercise",
      
    ​      				"Description": "walk 10 minutes",
      
    ​     				 "Status": true,
      
    ​      				"Due_date": "2000-12-31T17:00:00.000Z",
      
    ​      				"createdAt": "2020-02-03T08:04:02.352Z",
      
    ​      				"updatedAt": "2020-02-03T08:53:50.952Z"
      
    ​    			},
      
    ​    			{
      
    ​      				"id": 7,
      
    ​      				"Title": "read a book",
      
    ​      				"Description": "1 month 1 book",
      
    ​      				"Status": false,
      
    ​      				"Due_date": "2000-12-31T17:00:00.000Z",
      
    ​     				"createdAt": "2020-02-03T09:38:27.682Z",
      
    ​      				"updatedAt": "2020-02-03T09:38:27.682Z"
      
       			 }
      
    ​				]		
      
    }
      ```

      

    - ##### 500

      ```
    {
      
      	"errorStatus": 500,
      
      	"message": "Internal Server Error"
      
      }
      ```
      
      

- ### router**.**post("/",todoController.createOne)

  to create file and post it to database

  - #### Path Parameter

    - Title					 		:      String 	               From Body
    - Description                :      String                    From Body
    - Status                         :      Boolean                From Body
    - Due_date                   :      Date                      From Body

  - #### Response

    - ##### 201

      ```
    {
      
     			"message": "success",
      
    ​			"data": {
      
       		"Title": "Get some sleep",
      
    ​    		"Description": "minimun 6 hours a day",
      
    ​    		"Status": "false",
      
    ​    		"Due_date": "1"
      
     			 }
      
    }
      ```

      

    - ##### 400

      "Validation error: Title must be filled"

    - ##### 505

      ```
  {
      
      		"errorStatus": 500,
      
      		"message": "Internal Server Error"
      
      }
      ```
      
      

- ### router**.**put("/:id",todoController.updates)

  update one data and store it back to database

  - #### Path Parameters

    - ID								:  	Integer     			  From Params 

  - #### Response

    - ##### 200

      ```
    [
      
    ​	{
      
    ​    	"id": 8,
      
    ​    	"Title": "Talk to Other",
      
    ​    	"Description": "find new person to talk",
      
    ​    	"Status": true,
      
    ​    	"Due_date": "2000-12-31T17:00:00.000Z",
      
    ​    	"createdAt": "2020-02-03T09:39:54.583Z",
      
    ​    	"updatedAt": "2020-02-03T11:58:14.307Z"
      
      }
      
    ]
      ```

      

    - ##### 404

      ```
    {
      
      "statusError": 404,
      
      "message": "error not found"
      
    }
      ```

      

    - ##### 400

    - ##### 500

      ```
    {
      
      "errorStatus": 500,
      
      "message": "Internal Server Error"
      
    }
      ```
      
      

- ### router**.**get("/:id",todoController.findOne)

  - #### Path Parameters

    - ID								:  	Integer     			  From Params 

  - #### Response 

    - ##### 200

      ```
    {
      
      "data": {
      
    ​    "id": 5,
      
    ​    "Title": "excercise",
      
    ​    "Description": "walk 10 minutes",
      
    ​    "Status": true,
      
    ​    "Due_date": "2000-12-31T17:00:00.000Z",
      
    ​    "createdAt": "2020-02-03T08:04:02.352Z",
      
    ​    "updatedAt": "2020-02-03T08:53:50.952Z"
      
      }
      
    }
      ```

      

    - ##### 404

      {

        "statusError": 404,

        "message": "error not found"
    
      }
    
      

- ### router**.**delete("/:id",todoController.delete)

  - #### Path Parameters

    - ID								:  	Integer     			  From Params 

  - #### Response

    - ##### 200

      {

        "data": {

      ​    "id": 5,

      ​    "Title": "excercise",

      ​    "Description": "walk 10 minutes",

      ​    "Status": true,

      ​    "Due_date": "2000-12-31T17:00:00.000Z",

      ​    "createdAt": "2020-02-03T08:04:02.352Z",

      ​    "updatedAt": "2020-02-03T08:53:50.952Z"

        }

      }

    - ##### 404

      {

        "statusError": 404,

        "message": "error not found"

      }




