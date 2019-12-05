var loadtest = require('loadtest');
var should = require('should');

/*

QAS response measure: The system should not time out or make users wait over 0.75 seconds
                        for the system to respond to their reques
 */


describe("Performance Test", function() {

    let noRequestPerHour = 100000;
    let avgRequestTime = 750;

    it("should not crash with 1000 users making requests", function(done) {
        // run for 600 seconds
        this.timeout(100000 * 60);

        const options = {
            url: 'http://localhost:7000',
            maxRequests:1000,
            requestsPerSecond: 0.5,
            concurrency: 1,
            statusCallback: statusCallback
        };

        function statusCallback(error: any, result: any, latency: any) {
            console.log('Current latency %j, result %j, error %j', latency, result, error);
        }

        let operation = loadtest.loadTest(options, function(error:any,result:any) {
            if (error) {
                console.error('Got an error: %s', error)
            } else if (operation.running == false) {

                console.info("Requests/Second :", result.rps);

                result.totalErrors.should.equal(0);
                result.meanLatencyMs.should.be.lessThan(avgRequestTime);

                done();
            }
        });
    });
});
