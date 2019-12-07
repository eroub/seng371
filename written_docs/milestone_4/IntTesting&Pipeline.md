## Pipeline

We took a very wholistic approach with our continuous integration and pipeline. With almost every aspect of the process automated.  

### Workflow  
For the development of a feature. Our groups workflow was usually as follows.  

1. Work on the feature on either a feature branch (to be deleted after the feature was completed) or on the general "Develop" branch.  
2. When the feature is done, push the final feature commit to github.  
3. The main author of the feature creates a pull request to merge master and Develop.  
4. In the pull request travis will do a pipeline build following the config setup in `.travis.yml`  
  For our project the build was quite simple and only had three stages. Build, test, and deploy.  
  *Build*: In this stage travis merely installs the apps dependencies via `npm i` as well as builds the app  
  *Test*: For this stage travis utilizes our test-suite which is ran via script through the use of `npm test` (expanded on later)  
  *Deploy*: Finally, if both the build and test stages were successful, travis build and deploys a docker image via our DOCKERFILE  
5. When we get the check mark from travis, we will then proceed to finish the pull request with master.  
6. Lastly, when merged, a group member would also push master to a live DigitalOcean droplet server which is used to serve our app.  
  This is done through a post-receive githook running on a bare repository on the server.
  
  ```
#!/bin/bash
echo ‘post-receive: Triggered.’
cd /root/seng350/seng350f19-project-2-3
echo ‘post-receive: git check out…’

git --git-dir=/root/seng350/seng350f19-project-2-3.git --work-tree=/root/seng350/seng350f19-project-2-3 checkout master -f

echo ‘post-receive: npm install…’
npm install \
&& echo ‘post-receive: building…’ \
&& npm run build \
&& echo ‘post-receive: → done.’ \
&& (pm2 delete seng350 || true) \
&& pm2 start npm --name seng350 -- start \
&& echo ‘post-receive: app started successfully with pm2.‘
```

When that is completed we should see the new feature [live!](https://seng350.roubekas.com)

## Testing
