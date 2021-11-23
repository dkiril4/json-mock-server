# json-mock-server

This is a mock server configured to serve static JSON files. It uses [json-server](https://www.npmjs.com/package/json-server) and builds upon it to make the development of new mock endpoints more seamless. The project assumes the following JSON file format.

```json
// GET-Task.json
{
  "GET-task-service__tasks__id": {
    "routeTo": "/GET/task-service/tasks/*",
    "response": {
      "status": 200,
      "payload": [
        {
          "id": 1,
          "name": "Example",
          ...
        }
      ]
    }
  }
}
```

Note the way the file is strucured.

|            Property             |                                                Method                                                 |     Example Values    |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |------------ |
| File Key           | The file should ALWAYS have one object. The top level property has to be a unique key. In the above example, that's `GET-task-service__tasks__id`. The name of that unique key should be prefixed with the `{METHOD}-` in order for the custom implementation of the json-server to pick it up accordingly. In the above example, that's `GET-` prefix.   | GET-task-service__tasks__id <br> POST-task-service__tasks      |
| routeTo     | This is the desired route that we want to map to. For example, if our API has an endpoint to retrieve a task: `/task-service/tasks/{id}`, and we have a JSON file with a key of `GET-task-service__tasks__id`, we want to serve that JSON file. The routeTo takes wildcards (`*`), so use those accordingly. | /GET/task-service/tasks/* <br> /POST/task-service/tasks |  
| response         | Thsi will contain the actual response we want the user to receive and information regarding it. This should always contain a `status` and a `payload` property. See below for those properties.    | N/A |
| status            | The status code of the response.    | 200 <br> 404 <br>500 <br>     |
| payload     | The actual response. This could be anything that's supported in a JSON format.    | { tasks: [ ... ]} <br> `"strings"` <br> [Array] |

**File Key:**



**Route To:**


## Example API - Task Service:
---

|            Task             |                                                Method                                                 |     Path    |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |------------ |
| Create a new task           | <span style="background: #5CB85C; color:#fff; padding: 0.25rem; border-radius: 0.25rem">POST</span>   | /tasks      |
| Delete an existing task     | <span style="background: #D9534F; color:#fff; padding: 0.25rem; border-radius: 0.25rem">DELETE</span> | /tasks/{id} |  
| Get a specific task         | <span style="background: #337AB7; color:#fff; padding: 0.25rem; border-radius: 0.25rem">GET</span>    | /tasks/{id} |
| Search for tasks            | <span style="background: #337AB7; color:#fff; padding: 0.25rem; border-radius: 0.25rem">GET</span>    | /tasks      |
| Update an existing task     | <span style="background: #F0AD4E; color:#fff; padding: 0.25rem; border-radius: 0.25rem">PUT</span>    | /tasks/{id} |