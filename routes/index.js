var express = require('express');

module.exports = function(app) {
    var reservations = require('./reservations');
    app.get('/reservations', reservations.readAll);
    app.post('/reservations', reservations.create);
    app.get('/reservations/:_id', reservations.readOne);
    app.put('/reservations/:_id', reservations.updateOne);
    app.delete('/reservations/:_id', reservations.removeOne);
};