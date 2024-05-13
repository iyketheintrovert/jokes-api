
# Create a node js project following the instructions below

1. The Project should have just one file server.js. This doesn't include all the auto-created files like package.json etc.
2. The project should use nodemon command to run the server instead of the node command
3. The server should be able to receive POST and GET requests on the home/route
4. The Server should use a variable called db as it's database
5. When the server receives a POST request, it should add a joke to the db and return the entire joke db to the client
6. When the server receives a GET request, it should return all jokes to the client
7. The server should receive PATCH and DELETE requests on a route like so (/joke/1). Note: 1 as seen in the url here represents the id.
8. When the server receives a PATCH request, it should update a joke which matches the id provided in the url. The information for the update should be sent via the request body and the response sent to the client should be the updated joke only
9. When the server receives a DELETE request, it should delete the joke which matches the id provided in the url and return the deleted joke to the user as response.
