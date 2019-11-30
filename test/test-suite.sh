#!/bin/sh

echo "***********************"
echo "**** TESTING SUITE ****"
echo "***********************" 

echo "Running through unit tests via mocha ... "
nyc --reporter=html --reporter=text  mocha --exit **/*/*.spec.ts
# c8 mocha --require ts-node/register --exit **/**/*.spec.ts

echo "Running through static analysis via TSLint ... "
tslint -c tslint/tslint.json '../src/**/*.ts'

echo "Success ! "
