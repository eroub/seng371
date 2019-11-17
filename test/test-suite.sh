#!/bin/sh

echo "***********************"
echo "**** TESTING SUITE ****"
echo "***********************" 

echo "Running through unit tests via mocha ... "
nyc --reporter=html --reporter=text  mocha --exit **/*.spec.ts
# ts-mocha --exit -p ../tsconfig.json **/*.spec.ts

echo "Running through static analysis via TSLint ... "
tslint -c tslint/tslint.json '../src/**/*.ts'

echo "Success ! "
