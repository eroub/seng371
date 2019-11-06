[![BCH compliance](https://bettercodehub.com/edge/badge/seng350/seng350f19-project-2-3?branch=master&token=d44e8327fcddd173a59f492a77f358ea3719611a)](https://bettercodehub.com/)

## Team AES
#### Authored by: Evan Roubekas, Asim Ali, & Shaun Lyne

### Instructions:
`git clone https://github.com/seng350/seng350f19-project-2-3.git`  
`npm install`  
`npm start # build & start`  
`npm test # runs testing suite`  

### Written Docs:
All written documents can be found in /written_docs within their respective milestone folders.


### Git strategy 

Master should always be stable and good to go. 
 
Start with Develop branch being a copy of master. If you want to add a new feature create a branch based on develop. Make your changes and then merge to develop(create a pull request and if there are no conflicts you can merge from within the pull request). If there are any conflicts make changes to fix conflicts and merge to develop. 
Run tests to make sure develop is working fine. And then merge into master.
This way master will always remain stable. 
 
By making pull requests before pushing code into develop or master we can ensure that code is peer reviewed and also decrease 
 
