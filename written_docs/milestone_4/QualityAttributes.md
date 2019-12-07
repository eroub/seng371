## Automatic Testing of Quality Attributes:

To provide context. A CRON job is running concurrently with the live app that updates the database with mock data every minute.  

### 1. Data Reliability/Integrity (issue #14):
**Stimulus**:  
Mock Data update to the mongodb
**Reponse**:  
Data update reflected on app in real time  
**Response Measure**:  
Data that is retrieved through our apps routing, is consistent with the live data that on the mongodb  

Automatic testing of this quality attribute was tricky, but ultimately it was achieved through a CRON job. 

### 2. Availability (issue #9):
**Stimulus**:  
Normal user usage  
**Reponse**:  
User should successfully be able to navigate the app as well as create, update, read, and delete data as needed  
**Response Measure**:  
99% of uptime users should be able to do exactly that, with downtime being used as an opportunity to update and patch the system that otherwise can’t be made live  
