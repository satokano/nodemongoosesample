const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
	//_id: Schema.Types.ObjectId,
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	somearray: [{ type: String, required: true, minlength: 3 }],
	cart: {
		items: [
			{
				productId: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: true
				},
				quantity: {
					type: Number,
					required: true
				}
			}
		]
	}
});

module.exports = mongoose.model('User', userSchema);

