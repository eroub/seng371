[![BCH compliance](https://bettercodehub.com/edge/badge/seng350/seng350f19-project-2-3?branch=master&token=d44e8327fcddd173a59f492a77f358ea3719611a)](https://bettercodehub.com/)
[![Build Status](https://travis-ci.com/seng350/seng350f19-project-2-3.svg?token=pqsMuNR5Bvw3zLAy57V9&branch=master)](https://travis-ci.com/seng350/seng350f19-project-2-3)  

## Team AES
#### Authored by: Evan Roubekas, Asim Ali, & Shaun Lyne

### The live app can be accessed [here](https://seng350.roubekas.com)
Note: The app may not be available 100% of the time

### Instructions:

#### 1. Local Copy
`git clone https://github.com/seng350/seng350f19-project-2-3.git`  
`npm install`  
`npm run-script build # build`  
`npm start # start`   
`npm test # testing suite`  

#### 2. Docker
*Prerequisites: Docker installed on your computer and basic knowledge of running docker containers*  
[The Docker Image can be found here](https://hub.docker.com/r/eroubekas/seng350)  
`docker pull eroubekas/seng350 # Pull the docker image to a local repository`  
`docker ps -l # Verify that the image seng350 exists`  
`docker run -p 7000:7000 seng350 # To start the node instance in the container`  
You should now be able to access the app from your [localhost on port 7000](http://localhost:7000)  

#### 3. User Stories/Functionality
The 7 user stories covered in this app are as follows:

1. User should be able to see all their shoes
2. User should be able to sort all their shoes by highest to lowest current price
3. User should be able to see all the shoes currently available, and sort by cheapest to most expensive
4. User should be able to see when a certain shoe falls below a certain threshold
5. User should be able to compare themselves to other users on a leaderboard.
6. User should be able to add shoes to their portfolio
7. User should be able to see the net gain/loss for a particular shoe.

The first two user stories are covered by the overview page (/user/<id\>/shoes) where each user can view and sort all their shoes. The third and sixth user stories are covered in the "Add Shoes/Notifications" module, where users can see all the shoes in the database and sort them accordingly by a variety of filters. The fourth user story is covered by the "Notifications" module, where users can see if the shoes they've added notifications for have gone above or below a certain price threshold. The fifth user story is covered by the "Leaderboard" module, where users can see where they rank against other users and sort the leaderboard by a variety of filters. The last user story is covered in the overview page, where users can click on any of their shoes and see the net gain/loss for that particular shoe.

In addition to these 7 user stories, there is also additional functionality such as being able to see total net gain/loss, sort lists by additional filters, edit username, and see the number of shoes the user owns.

There is also an admin module where an admininstrator can CRUD users and shoes.

#### 4. Adherence to Design Document

Admin: Making a product inactive functionality was removed (admin can simply remove shoes from the database now).

Customer: request product functionality was removed (would be done by email or the customer would just have to wait until the product is added), leaderboard functions were removed (get_rank(), update_leaderboard_ranking()) since the rank calculations are now done when the user navigates to /leaderboard in order to keep the leaderboard as up to date as possible, functions for calculating total net gain/loss, total sunk cost, and number of shoes were combined and moved to the helper functions.

Leaderboard: update_user was removed (calculated on navigation to /leaderboard), print_up_to_rank() was removed, get_user_rank() was handled in the view engine (highlights the current user in bold text).

Notifications: Functionality to get info for a single notification was removed since there is not enough information in a notification to warrant it.

Products: Sort by brand/model was removed in favor of sorting by price difference/alphabetical order. Under retail filter was added to show users shoes that are currently going for under retail price. search_for_product() was removed since it was not part of any user story. 

User: update password/email was removed since user authentication was not a requirement, and updating the email address of a user was not part of any user story. Email was removed from user model.


### Written Docs:
All written documents can be found in /written_docs within their respective milestone folders.


### Git strategy 

Master should always be stable and good to go. 
 
Start with Develop branch being a copy of master. If you want to add a new feature create a branch based on develop. Make your changes and then merge to develop(create a pull request and if there are no conflicts you can merge from within the pull request). If there are any conflicts make changes to fix conflicts and merge to develop. 
Run tests to make sure develop is working fine. And then merge into master.
This way master will always remain stable. 
 
By making pull requests before pushing code into develop or master we can ensure that code is peer reviewed and also decrease 
 
