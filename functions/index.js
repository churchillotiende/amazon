const functions = require("firebase-functions");

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51KZ9OELCAo7YWPSS0iS5MeIbzCleFIxaQPOQY90IiApIhslCi2L7PTfw4lKd1vOothKEjIraalNrwdbE80pNfDMN00KQjYiafn')

//App config

const app = express();

//Middlewares

app.use(cors({ origin:true }))
app.use(express.json());

//Api routes

app.get('/' , (request , response) => response.status(200).send('Hello World'))
app.post('/payments/create' , async(request ,response) =>{
	const total = request.query.total;
	console.log('Payment request received' , total)

	const paymentIntent = await stripe.paymentIntents.create({
	amount:total,
	currency:'usd'
	})

	//Ok creted
	response.status(201).send({
		clientSecret:paymentIntent.clientSecret,
	})
})

// - Listen command
exports.api = functions.https.onRequest(app);
