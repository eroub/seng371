
const {shoe_model} = require( '../../src/models/shoe_model')
require = require("esm")(module /*, options*/);



describe ('Hello function', () => {

	it('should return all shoes', () => {
		let test_arr = [{"1":300, "3":400,"5":500}]

		const SM = new shoe_model()
		const shoes =  SM.get_all_shoes(test_arr);

		console.log(shoes);
		//expect(result).to.equal('Hello World!');
	});
});
