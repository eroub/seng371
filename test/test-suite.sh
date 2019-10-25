echo "This is where we will run all our tests"
mocha -r ts-node/register **/*.spec.ts
