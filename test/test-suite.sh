#!/bin/sh

echo "***********************"
echo "**** TESTING SUITE ****"
echo "***********************" 

echo "Running through unit tests via mocha ... "
# mocha --exit -r ts-node/register **/*.spec.ts
ts-mocha --exit -p ../tsconfig.json **/*.spec.ts

echo "Running through static analysis via TSLint ... "
tslint -c tslint/tslint.json '../src/**/*.ts'

echo "Success ! "
