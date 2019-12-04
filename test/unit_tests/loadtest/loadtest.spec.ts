var loadtest = require('loadtest');
var should = require('should');
describe("Performance Test", function() {
    let noRequestPerHour = 100000;
    let avgRequestTime = 1000;

    it("should not crash with 1000 users making requests", function(done) {
        this.timeout(1000 * 60);

        const options = {
            url: 'http://localhost:7000',
            maxSeconds: 5,
            requestsPerSecond: 25,
            concurrency: 1000,
            statusCallback: statusCallback
        };

        let gLatency:any;
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
