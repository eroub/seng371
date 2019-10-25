echo "This is where we will run all our tests"

echo "Running through unit tests via mocha ... "
mocha -r ts-node/register **/*.spec.ts

echo "Running through static analysis via TSLint ... "
tslint -c tslint/tslint.json '../src/**/*.ts'


