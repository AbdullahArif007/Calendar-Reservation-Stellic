# Calendar-Reservation-Stellic

This is an implementation of calendar reservation system in which the frontend is implemented using AngularJS.

Clone the repository using the following command:
```
git clone https://github.com/AbdullahArif007/Calendar-Reservation-Stellic.git
```

After cloning the repository you will find two folders named **backend** and **frontend** in it.


## Backend
Using command line navigate to the **backend** folder and install package dependencies.<br>
Package dependencies can be installed by executing the following command:
```
npm install
```
Once the dependencies are installed, you can start the application server by running
```
npm start
```
In your terminal you will recieve a message "**API server listening at http://localhost:3000**" ensuring that your server is working.

### Changes made in the backend
```
app.get('/tenant',function(request, response){
    send(response,data)
});
```

This API was created to get all of the tenants along with their reserved time slots.


## Frontend
Open a different terminal and navigate to the **frontend** folder and install package dependencies.<br>
Package dependecies can be installed by executing the following command:
```
npm install
```
Once the dependencies are installed, you can start the application server by running
```
npm start
```
In your terminal you will recieve a message "
**Starting up http-server, serving ./app
Available on:
  http://localhost:8000**" ensuring that your frontend is working.<br>
 
 Using the url "http://localhost:8000" you will be able to access the application and make reservations.
 
 ## References
https://www.codementor.io/@chrisharrington/angularjs-tutorial-series-part-1-building-a-calendar-with-less-css-font-awesome-and-moment-8t6t6o9kx<br>
https://embed.plnkr.co/plunk/iUznrf<br>
https://www.tutorialsteacher.com/angularjs/angularjs-service-http<br>
https://synaptiklabs.com/posts/tying-angularjs-front-end-into-back-end-service/<br>
