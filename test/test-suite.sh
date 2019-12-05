#!/bin/sh

echo "***********************"
echo "**** TESTING SUITE ****"
echo "***********************" 

echo "Running through unit tests via mocha ... "
# istanbul cover --reporter=html --reporter=text mocha --require source-map-support/register --require ts-node/register --exit **/**/*.spec.ts
# istanbul cover mocha --exit
#mocha -r ts-node/register --exit **/**/*.spec.ts
<<<<<<< HEAD
mocha -r ts-node/register --exit **/**/loadtest.spec.ts
=======
mocha -r ts-node/register --exit **/**/customer.spec.ts
>>>>>>> 7c3b3edb05bfc92a492b9ae1ea634fa4947c0235


echo "Running through static analysis via TSLint ... "
tslint -c tslint/tslint.json '../src/**/*.ts'

echo "Success ! "
