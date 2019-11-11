import "mocha";
import {ShoeRouter} from "../../src/routes/shoeRouter";
import { NextFunction, Request, Response, Router} from "express";
let chai = require('chai');
let should = chai.should();
let router = Router();
let sr = new ShoeRouter();
ShoeRouter.create(router);

var mocks = require('node-mocks-http');

let req:Request = mocks.createRequest();

let res:Response = mocks.createResponse();
res.statusCode = 500;

let next = function() {console.log('lala')};


describe ('test response codes ', () => {
    // id 110 does not exist
    req.params['id'] ="110";

    it('incorrect id should return 404 ', async () => {
        await sr.getAll(req,res,next);
        console.log(res.statusCode)
        chai.expect(res.statusCode).to.equal(404);
    }).timeout(5000);

    // id 1 exists
    req.params['id'] ="1";

    it('correct id should return 200 ', async () => {
        await sr.getAll(req,res,next);
        console.log(res.statusCode)
        chai.expect(res.statusCode).to.equal(200);
    }).timeout(5000);




});

