var loadtest = require('loadtest');
var should = require('should');

//The system should not time out or make users wait over 0.75 seconds for the system to respond to their request.
describe("Reliability under heavy user load", function() {
 let avgRequestTime:any = 7500;

    it("performance testing", function(done) {

        const options = {
            url: 'http://localhost:7000/user/1/allShoes',
            maxSeconds : 30,
            requestsPerSecond:100,
            concurrency:50,
            maxRequests: 1000,
        };
        loadtest.loadTest(options, function(error:any, result:any)
        {
            if (error)
            {
                return consogle.error('Got an error: %s', error);
            }
            console.log('Load test run successfully');
            result.totalErrors.should.equal(0);
            result.meanLatencyMs.should.be.below(avgRequestTime);
            done();

        });

    });
});
