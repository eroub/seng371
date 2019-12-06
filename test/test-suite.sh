#!/bin/sh

echo "***********************"
echo "**** TESTING SUITE ****"
echo "***********************" 

echo "Running through unit tests via mocha ... "
# istanbul cover --reporter=html --reporter=text mocha --require source-map-support/register --require ts-node/register --exit **/**/*.spec.ts
# istanbul cover mocha --exit
#mocha -r ts-node/register --exit **/**/*.spec.ts
mocha -r ts-node/register --exit **/**/loadTestForloop.spec.ts
#mocha -r ts-node/register --exit **/**/customer.spec.ts


echo "Running through static analysis via TSLint ... "
tslint -c tslint/tslint.json '../src/**/*.ts'

echo "Success ! "
