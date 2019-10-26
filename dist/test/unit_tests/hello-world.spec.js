"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hello_world_1 = require("./hello-world");
var chai_1 = require("chai");
require("mocha");
describe('Hello function', function () {
    it('should return hello world', function () {
        var result = hello_world_1.hello();
        chai_1.expect(result).to.equal('Hello World!');
    });
});
//# sourceMappingURL=hello-world.spec.js.map