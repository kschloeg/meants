'use strict';
import _ = require('lodash');
import request = require('request-promise');
import ProductController = require('../api/v1/product/ProductController');

module.exports = function(app) {

    // Give AWS load-balancer health checks something to check against
    app.get('/healthcheck', function(req, res) {
        res.sendStatus(200);
    });

    app.get('/v1/product/:id', ProductController.findById);
    app.post('/v1/product/:id', ProductController.create);
    app.put('/v1/product/:id', ProductController.update);

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|assets)/*')
        .get(function(req, res) {
            console.warn(" Bad route: " + req.url);
            res.status(404).json(404);
        });
};
