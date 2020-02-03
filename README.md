<h1>Fancy To-Do List API</h1>

<h3>All Routes</h3>
<ul>
    <li>GET /todos</li>
    <li>GET /todos/{id}</li>
    <li>POST /todos</li>
    <li>PUT /todos/{id}</li>
    <li>DELETE /todos/{id}</li>
</ul>

<h3>Success Status</h3>
<ul>
    <li>
    GET /todos : 
        <ul>
            <li>Status Code: 200</li>
            <li>Return Array of Objects</li>
            <li>ex: </li>
            <pre>
            [
                {
                    "id": 6,
                    "title": "Learn Node js",
                    "description": "Somethings",
                    "status": true,
                    "due_date": "2020-02-03T07:18:21.000Z",
                    "createdAt": "2020-02-03T07:22:39.255Z",
                    "updatedAt": "2020-02-03T07:22:39.255Z"
                },
                {
                    "id": 7,
                    "title": "Learn Node js",
                    "description": "Somethings",
                    "status": false,
                    "due_date": "2020-02-03T07:18:21.000Z",
                    "createdAt": "2020-02-03T07:22:43.321Z",
                    "updatedAt": "2020-02-03T07:22:43.321Z"
                },
                {
                    "id": 8,
                    "title": "Learn Node js 222",
                    "description": "Hehe",
                    "status": false,
                    "due_date": "2020-02-03T07:18:21.000Z",
                    "createdAt": "2020-02-03T08:22:04.980Z",
                    "updatedAt": "2020-02-03T08:22:04.980Z"
                },
                {
                    "id": 9,
                    "title": "asasc",
                    "description": "asncakv",
                    "status": false,
                    "due_date": "2020-02-03T07:18:21.000Z",
                    "createdAt": "2020-02-03T08:26:37.254Z",
                    "updatedAt": "2020-02-03T08:26:37.254Z"
                },
                {
                    "id": 1,
                    "title": "jvh",
                    "description": "asncakv",
                    "status": false,
                    "due_date": "2020-02-03T07:18:21.000Z",
                    "createdAt": "2020-02-03T07:18:10.572Z",
                    "updatedAt": "2020-02-03T09:34:20.004Z"
                }
            ]
            </pre>
        </ul>
    </li>
    <li>GET /todos/{id}</li>
    <li>POST /todos</li>
    <li>PUT /todos/{id}</li>
    <li>DELETE /todos/{id}</li>
</ul>
