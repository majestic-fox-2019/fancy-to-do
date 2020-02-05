<h1>Fancy To-Do List API</h1>

<h2 style="text-decoration:underline">All Routes</h2>
<ul>
    <li><span style="font-weight:850">GET</span>  /todos</li>
    <li><span style="font-weight:850">GET</span>  /todos/{ id }</li>
    <li><span style="font-weight:850">POST</span>  /todos</li>
    <li><span style="font-weight:850">PUT</span>  /todos/{ id }</li>
    <li><span style="font-weight:850">DELETE</span>  /todos/{ id }</li>
</ul>

<br><br>
<h2 style="text-decoration:underline">All Request</h2>
<ul>
    <li>
    <span style="font-weight:850">GET</span> /todos
    <pre>No Request</pre>
    </li>
    <li>
    <span style="font-weight:850">GET</span> /todos/{ id }
    <pre>Params Name: "id" | Params Type: Integer</pre>
    </li>
    <li>
    <span style="font-weight:850">POST</span> /todos/{ id }
    <pre>
        Body Name: "name"       | Body Type: String
        Body Name: "title"      | Body Type: String
        Body Name: "status"     | Body Type: Boolean
        Body Name: "due_time"   | Body Type: Date
    </pre>
    </li>
    <li>
    <span style="font-weight:850">PUT</span> /todos/{ id }
    <pre>
        Params Name : "id"          | Params Type: Integer
        Body Name   : "name"        | Body Type: String
        Body Name   : "title"       | Body Type: String
        Body Name   : "status"      | Body Type: Boolean
        Body Name   : "due_time"    | Body Type: Date
    </pre>
    </li>
    <li>
    <span style="font-weight:850">DELETE</span> /todos/{ id }
    <pre>Params Name: "id" | Params Type: Integer</pre>
    </li>
</ul>

<br><br>
<h2 style="text-decoration:underline">Success Status</h2>
<ul>
    <li>
    GET /todos
        <ul>
            <li>Status Code <span style="color:green">200<span></li>
            <li>Returning Array of Objects</li>
            <li>Example :</li>
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
    GET /todos/{ id }
        <ul>
            <li>Status Code <span style="color:green">200<span></li>
            <li>Returning an Objects</li>
            <li>Example :</li>
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
    POST /todos/{ id }
        <ul>
            <li>Status Code <span style="color:green">201<span></li>
            <li>Returning an Objects</li>
            <li>Example :</li>
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
    PUT /todos/{ id }
        <ul>
            <li>Status Code <span style="color:green">200<span></li>
            <li>Returning an Objects</li>
            <li>Example :</li>
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
    DELETE /todos/{ id }
        <ul>
            <li>Status Code <span style="color:green">200<span></li>
            <li>Returning an Objects</li>
            <li>Example :</li>
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

<br><br>
<h2 style="text-decoration:underline">Error Status</h2>
<ul>
    <li><span style="color:red">400</span> : Data is not valid. This can be caused by not entering data in certain fields.</li>
    <li><span style="color:red">404</span> : Data is not found. This can be caused by entering params that do not match the params type, or the data that matches the params is not found</li>
    <li><span style="color:red">500</span> : Internal Server Error. This could be due to a technical error in the server, and report if this problem arises.</li>
</ul>
