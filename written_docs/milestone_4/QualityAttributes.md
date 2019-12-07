## Automatic Testing of Quality Attributes:

To provide context. A CRON job is running concurrently with the live app that updates the database with mock data every minute.  

### 1. Data Reliability/Integrity (issue #14):
**Stimulus**:  
Mock Data update to the mongodb  
**Reponse**:  
Data update reflected on app in real time  
**Response Measure**:  
Data that is retrieved through our apps routing, is consistent with the live data that on the mongodb  

Automatic testing of this quality attribute was tricky, but ultimately it was achieved through a CRON job. At the beginning of every hour the cron service creates its own connection to the database, and retrieves the most current object array of shoes. It then waits just over a minute and repeats that action. It then compares the two shoe arrays to verify that the are different, this is to verify that the data is indeed updating every minute, as the two arrays should not be the same. Once the cron job passes that test, it uses the apps routing to grab that same array of shoes (this is a very common use case). It then compares this array grabbed from the app, with the recently updated shoe array that was grabbed from the mongo database. If these objects are verified to be the same, the automatic test for verifying data reliability/integrity has passed.  

If at any point the test fails, it is logged with the date to an integrity.log found in `logs/integrity.log`. If passed, the passed test is also logged.

### 2. Availability (issue #9):
**Stimulus**:  
Normal user usage  
**Reponse**:  
User should successfully be able to navigate the app as well as create, update, read, and delete data as needed  
**Response Measure**:  
99% of uptime users should be able to do exactly that, with downtime being used as an opportunity to update and patch the system that otherwise can’t be made live  

Availability testing is done every every 15 minutes, and also runs on a cron job. This test is much more simple. It makes a request to https://seng350.roubekas.com where the live app is being served. If the request returns with anything other than a `statusCode: 200` the test is considered to have failed and is logged, this failure also shuts down all other cron processes. If a status code of 200 is returned the app is considered to be available and the success is logged. We can safely assume that the rest of the app is available if the index page can be reached, as there are no obvious cases to the developers where the index page is accessible but the rest of the app would not be (unless in the case of corrupted data).  

If at any point the test failed, it is logged with the date to an availability.log found in `logs/availability.log`. If passed, the passed test is also logged.


### 3. Reliability (issue #9):
**Stimulus**:  
Spike in amount of requests 
**Reponse**:  
User should successfully be able to navigate the app as well as create, update, read, and delete data without without smoothly without disruption.   
**Response Measure**:  
No requests should drop and each request should be responed to within 0.75 seconds. 

Reliability testing is within the app. The test file, named loadtest and located under the unittests directory tests a data heavy route, /user/1/allShoes. This route renders the shoeList view and contains a list of all the shoes in the db. A benifit of using this route to test the reliability is because it is the route that contains all the shoes and if this route conforms to the reliability goals then so should all the other routes. 
