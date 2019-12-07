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
  *Deploy*: Finally, if both the build and test stages were successful, travis build and deploys a docker image via our `DOCKERFILE`  
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

Like our continuous integration and pipeline, we took testing very seriously and were sure to test majority of our functionality thoroughly.

### Unit/Integration Testing
Keeping to a strict definition of *unit test*. Unfortunately, most of our app is unable to be tested as an isolated unit, save for the helper functions. However, we still used a unit test style of approach to testing our main functionality.

#### Example Test 
```
it('add_user: should return true', async () => {
        const UM = new CustomerModel();
        const newUser: any = await UM.add_user(777, 'hello');
        chai.expect(newUser).to.equal(true)
}).timeout(5000);
```  
As shown above. The test looks similar to a unit test, we are creating a model, using that model to create a new user (which returns true if it was successful), then asserting that the method did what it was supposed to.  

However, this test is technically an integration test in that the add_user() method needs to interface with the database, in order to create and store the data.  

This is true for majority of our testing, as we have very little functionality that doesn't interact with the database in some form or another (data creation, reading, updating, or deletion). 
