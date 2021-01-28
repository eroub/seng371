[![BCH compliance](https://bettercodehub.com/edge/badge/seng350/seng350f19-project-2-3?branch=master&token=d44e8327fcddd173a59f492a77f358ea3719611a)](https://bettercodehub.com/)
[![Build Status](https://travis-ci.com/seng350/seng350f19-project-2-3.svg?token=pqsMuNR5Bvw3zLAy57V9&branch=master)](https://travis-ci.com/seng350/seng350f19-project-2-3)  

## This repo is being repurposed for SENG371 where the majority of work is being done to re-engineer the CI/CD process.

## Team AES
#### Authored by: Evan Roubekas, Asim Ali, & Shaun Lyne

### The live app can be accessed [here](https://seng371.roubekas.com)
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

### Written Docs:
All written documents can be found in /written_docs within their respective milestone folders.
**This will also be the location of the post-mortem document `retro.md`**