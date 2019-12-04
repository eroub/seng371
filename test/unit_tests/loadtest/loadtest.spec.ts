var loadtest = require('loadtest');
var should = require('should');

//The system should not time out or make users wait over 0.75 seconds for the system to respond to their request.
describe("Reliability under heavy user load", function() {

    var noRequestPerHour = 10000;

    var avgRequestTime = 750;

    it("performance testing /heaving-ping", function(done) {
        this.timeout(1000 * 60);
        var options = {
            "url": 'http://localhost:7000/user/1/allShoes',
            // max seconds the test should run
            "maxSeconds": 30,
            // number of requests made at the same time
            "concurrency": 25,

            "statusCallback": statusCallback
        };
        let gLatency:any;

        function statusCallback(latency:any, result:any, error:any) {
            gLatency = latency;
        }
        let operation:any = loadtest.loadTest(options, function(error:any) {
            if (error) {
                console.error('Got an error: %s', error);
            } else if (operation.running == false) {
                console.info("\n==============================\n");
                console.info("Requests per hour: " + noRequestPerHour)
                console.info("Avg request time(Millis): " + avgRequestTime)
                console.info("\n==============================\n")
                console.info("Total Requests :", gLatency.totalRequests);
                console.info("Total Failures :", gLatency.totalErrors);
                console.info("Requests/Second :", gLatency.rps);
                console.info("Requests/Hour :", (gLatency.rps * 3600));
                console.info("Avg Request Time:",gLatency.meanLatencyMs);
                console.info("Min Request Time:",gLatency.minLatencyMs);
                console.info("Max Request Time:",gLatency.maxLatencyMs);
                console.info("Percentiles :", gLatency.percentiles)
                console.info("\n===============================\n")
                gLatency.totalErrors.should.equal(0);
                (gLatency.rps * 3600).should.be.greaterThan(noRequestPerHour);
                (gLatency.meanLatencyMs).should.be.below(avgRequestTime);
                done();
            }
        });
    });
});