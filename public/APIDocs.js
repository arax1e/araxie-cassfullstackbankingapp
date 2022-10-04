function APIDocs(){

return (
    <>
    <div className="wrap" id="gap">
    <div className="left-frame">
      <div>
        <div className="panel-3"><span className="hop"></span></div>
        <div className="panel-4"><span className="hop"></span></div>
        <div className="panel-5"><span className="hop"></span></div>			
      </div>
    </div>
    <div className="right-frame">
      <div className="bar-panel">
        <div className="bar-6"></div>
        <div className="bar-7"></div>
        <div className="bar-8"></div>
        <div className="bar-9"><div className="bar-9-inside"></div></div>
        <div className="bar-10"></div>
      </div>
      <div className="runner">
        <div className="corner-bg">
          <div className="corner"></div>
        </div>
        <div className="block-2"></div>
        <div className="block-3"></div>
        <div className="block-4b">
          <div className="block-4-floatbar"></div>
        </div>
      </div>
      <div className="content">
        <h2>BadBank API Documentation</h2>
        <h3>Intro:</h3>
        <p>An API, or Application Programming Interface, is a structure that allows programs to communicate with each other across the internet. In the case of this app, it allows the app to send and recieve data to and from the authentication, application, and database.</p>
        <p>This API is in the format of a REST API, which means that ituses the HTTP protocol to send and recieve data from a predefined set of URLs.</p>
       <p>Since the authentication of this app is handled seperately, the API itself does not require any tokens or setup. You can simply acces the URLs through Postman or another interface, or in code.</p>
       <p>The app's routes are located in the "Routes" folder and provide pathways for creating users, deleting users, seeing user information, and updating users. </p>
       <h3>How to Access the API</h3>
       <p>The root url of the api is https://araxie-cassfullstackbankingapp.herokuapp.com/api/. All endpoints are added onto this route.</p>
       <p>You can access these routes and find templates for incorporating them into your code using Postman.</p>
       <h3>Creating a New User</h3>
       <p>In this API, you can create a new user using the /post endpoint. This is, as you would expect, a POST method. This method requires 4 parameters in the body of the request: Name (string), Email (string), Password (string), and Balance (number). As a response, the API should return the information of the user you created.</p>
        <p>The BadBank app uses this method whenever a new user is created to store the user information in the database. </p>
       <h3>See all Users</h3>
       <p>To see the information for all users in the database, you can use the /getAll endpoint. This is a GET method. This endpoint doesn't require anything in the body of the request, and should return a list of all users and their properties in JSON format. It is not in use in the app, but is still functional.</p>
       <h3>Get User by Email</h3>
       <p>This endopoint allows you to get a user's information using their email. This is also a GET method. It uses email rather than ID as it is communicating between Firebase and MongoDB, which assign each user a different ID.</p>
       <p>This endpoint doesn't require anything in the body, but it does require the email as part of the url. You can access it with the endpoint '/getOne/&lt;email&gt; and the API will filter the users to find the one with that email. The response should be the information of that user.</p>
       <p>This is used on the Account page to retrieve the current user's account information.</p>
       <h3>Update User information by Email</h3>
       <p>This endpoint is similar to the one for getting a user's information above. However, instead of just retrieving user information, it allows you to update user information in the database. Because of this, it is a PATCH, rather than GET method. It requires the email of the user you're updating in the endpoint, so it can be accessed at /update/&lt;email&gt;. You can then put the information you'd like to change in the body, and the response will return the user's updated information. </p>
       <p>This method is used to update the user's balance after deposits and withdrawals, and to change the user's password.</p>
       <h3>Delete a User</h3>
       <p>This DELETE method allows you to delete a user from the database. It does not require anything in the body, but it does require the user id in the url. You can access it at /delete/&lt;id&gt;. It should return a message saying "Document with [name] has been deleted. </p>
    </div>
    </div>
    </div>
    </>
)
}