import { expect } from 'chai';
import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
chai.should();

import shoe_model from '../../src/models/shoe_model'



describe ('Hello function', () => {

	it('should return all shoes', () => {
		let test_arr = [{"1":300, "3":400,"5":500}]

		const SM = new shoe_model()
		const shoes =  SM.get_all_shoes(test_arr);

		console.log(shoes);
		//expect(result).to.equal('Hello World!');
	});
});
