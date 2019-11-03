"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = __importDefault(require("chai"));
var chai_http_1 = __importDefault(require("chai-http"));
chai_1.default.use(chai_http_1.default);
chai_1.default.should();
var shoe_model_1 = __importDefault(require("../../src/models/shoe_model"));
describe('Hello function', function () {
    it('should return all shoes', function () {
        var test_arr = [{ "1": 300, "3": 400, "5": 500 }];
        var SM = new shoe_model_1.default();
        var shoes = SM.get_all_shoes(test_arr);
        console.log(shoes);
        //expect(result).to.equal('Hello World!');
    });
});
//# sourceMappingURL=hello-world.spec.js.map