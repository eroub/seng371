#!/bin/sh
echo "***********************"
echo "**** TESTING SUITE ****"
echo "***********************" 
echo "Running through unit tests via mocha ... "
nyc --reporter=html --reporter=text mocha --require source-map-support/register --require ts-node/register --exit **/**/*.spec.ts
# istanbul cover mocha --exit
<<<<<<< HEAD
# mocha -r ts-node/register --exit **/**/*.spec.ts
=======
#mocha -r ts-node/register --exit **/**/*.spec.ts
#mocha -r ts-node/register --exit **/**/loadTestForloop.spec.ts
#tsmocha -r ts-node/register --exit **/**/product.spec.ts
#mocha -r ts-node/register --exit **/**/leaderboard.spec.ts
#mocha -r ts-node/register --exit **/**/notification.spec.ts

mocha -r ts-node/register --exit **/**/loadTestForloop.spec.ts



>>>>>>> e248b85941cd9ab4b21be3d581e64b5cd6fd7551
echo "Running through static analysis via TSLint ... "
tslint -c tslint/tslint.json '../src/**/*.ts'
echo "Success ! "
