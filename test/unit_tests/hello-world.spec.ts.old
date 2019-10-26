import { expect } from 'chai';
//import server from  "../../bin/www';
import 'mocha';
import Server from  "../../src/app";
import {agent as request} from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
chai.should();
import express, { NextFunction, Request, Response, Router} from "express";
import { ShoeRouter } from "../../src/routes/shoeRouter";
import {IndexRoute} from "../../src/routes";
let router: express.Router;
router = express.Router();


IndexRoute.create(router);



// let myServer = new Server.routes();

it("should get one shoe record", (done) => {
	chai.request(router)
		.get('/api/shoes')
		.end((err:any, res:any) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			done();
		});
});







/*
it("should get one shoe record", (done) => {
	chai.request('http://localhost:8080')
		.get('/api/shoes')
		.end((err:any, res:any) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			done();
		});
});

*/

/*

describe ('Hello function', () => {

	it('should return hello world', () => {
		const result = hello();
		expect(result).to.equal('Hello World!');
	});
});
*/