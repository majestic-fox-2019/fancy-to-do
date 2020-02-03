<h1>Fancy To-Do List API</h1>

<h3>All Routes</h3>
<ul>
    <li>GET /todos</li>
    <li>GET /todos/{id}</li>
    <li>POST /todos</li>
    <li>PUT /todos/{id}</li>
    <li>DELETE /todos/{id}</li>
</ul>

<h3>All Request</h3>
<ul>
    <li>GET /todos      : No Request</li>
    <li>GET /todos/{id} : Param Name: "id" | Param Type: Integer</li>
    <li>
    POST /todos/{id} : 
    <pre>
        Body Name: "name"       | Body Type: String
        Body Name: "title"      | Body Type: String
        Body Name: "status"     | Body Type: Boolean
        Body Name: "due_time"   | Body Type: Date
    </pre>
    </li>
    <li>
    PUT /todos/{id} : 
    <pre>
        Param Name  : "id"          | Param Type: Integer
        Body Name   : "name"        | Body Type: String
        Body Name   : "title"       | Body Type: String
        Body Name   : "status"      | Body Type: Boolean
        Body Name   : "due_time"    | Body Type: Date
    </pre>
    </li>
    <li>DELETE /todos/{id} : Param Name: "id" | Param Type: Integer</li>
</ul>

<h3>Success Status</h3>
<ul>
    <li>
    GET /todos : 
        <ul>
            <li>Status Code: 200</li>
            <li>Return Array of Objects</li>
            <li>Example: </li>
            <pre>
            [
                {
                    "id": 1,
                    "title": "Todo's Title",                 ==> type: String
                    "description": "Todo's Description",     ==> type: String
                    "status": false,                         ==> type: Boolean
                    "due_date": "2020-02-03T07:18:21.000Z",  ==> type: Date
                    "createdAt": "2020-02-03T07:22:39.255Z", ==> type: Date
                    "updatedAt": "2020-02-03T07:22:39.255Z"  ==> type: Date
                },
                {
                    "id": 2,
                    "title": "Todo's Title",                
                    "description": "Todo's Description",    
                    "status": false,                        
                    "due_date": "2020-02-03T07:18:21.000Z", 
                    "createdAt": "2020-02-03T07:22:39.255Z",
                    "updatedAt": "2020-02-03T07:22:39.255Z" 
                },
                ...
            ]
            </pre>
        </ul>
    </li>
    <li>
    GET /todos/{id} : 
        <ul>
            <li>Status Code: 200</li>
            <li>Return an Objects</li>
            <li>Example: </li>
            <pre>
            {
                    "id": 1,
                    "title": "Todo's Title",                 ==> type: String
                    "description": "Todo's Description",     ==> type: String
                    "status": false,                         ==> type: Boolean
                    "due_date": "2020-02-03T07:18:21.000Z",  ==> type: Date
                    "createdAt": "2020-02-03T07:22:39.255Z", ==> type: Date
                    "updatedAt": "2020-02-03T07:22:39.255Z"  ==> type: Date
            }
            </pre>
        </ul>
    </li>
    <li>
    POST /todos/{id} : 
        <ul>
            <li>Status Code: 201</li>
            <li>Return an Objects</li>
            <li>Example: </li>
            <pre>
            {
                    "id": 1,
                    "title": "Todo's Title",                 ==> type: String
                    "description": "Todo's Description",     ==> type: String
                    "status": false,                         ==> type: Boolean
                    "due_date": "2020-02-03T07:18:21.000Z",  ==> type: Date
                    "createdAt": "2020-02-03T07:22:39.255Z", ==> type: Date
                    "updatedAt": "2020-02-03T07:22:39.255Z"  ==> type: Date
            }
            </pre>
        </ul>
    </li>
    <li>
    PUT /todos/{id} : 
        <ul>
            <li>Status Code: 200</li>
            <li>Return an Objects</li>
            <li>Example: </li>
            <pre>
            {
                    "id": 1,
                    "title": "Todo's Title",                 ==> type: String
                    "description": "Todo's Description",     ==> type: String
                    "status": false,                         ==> type: Boolean
                    "due_date": "2020-02-03T07:18:21.000Z",  ==> type: Date
                    "createdAt": "2020-02-03T07:22:39.255Z", ==> type: Date
                    "updatedAt": "2020-02-03T07:22:39.255Z"  ==> type: Date
            }
            </pre>
        </ul>
    </li>
    <li>
    DELETE /todos/{id} : 
        <ul>
            <li>Status Code: 200</li>
            <li>Return an Objects</li>
            <li>Example: </li>
            <pre>
            {
                    "id": 1,
                    "title": "Todo's Title",                 ==> type: String
                    "description": "Todo's Description",     ==> type: String
                    "status": false,                         ==> type: Boolean
                    "due_date": "2020-02-03T07:18:21.000Z",  ==> type: Date
                    "createdAt": "2020-02-03T07:22:39.255Z", ==> type: Date
                    "updatedAt": "2020-02-03T07:22:39.255Z"  ==> type: Date
            }
            </pre>
        </ul>
    </li>
</ul>
