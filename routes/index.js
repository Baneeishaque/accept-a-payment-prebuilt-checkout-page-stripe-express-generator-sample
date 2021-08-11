var express = require('express');

require('dotenv').config()

// noinspection JSValidateTypes
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
});

var router = express.Router();

router.get('/', function (req, res) {
    res.render('index');
});

router.post('/create-checkout-session', async function (req, res) {
    var domainURL = process.env.DOMAIN;
    var session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
            price: process.env.PRICE,
            quantity: 1
        }],
        success_url: domainURL + '/success.html?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: domainURL + '/canceled.html'
    });
    return res.redirect(303, session.url);
});

router.get('/checkout-session', async function (req, res) {
    var sessionId = req.query.sessionId;
    console.log(sessionId);
    var session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send(session);
});

module.exports = router;
