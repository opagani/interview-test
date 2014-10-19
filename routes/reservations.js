var mongoose = require('mongoose');
var reservationSchema = require('../models/reservations');
var Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = {

  create: function (req, res) {
    var reservation = req.body;
    var reserve = new Reservation(reservation);
    reserve.save(function (err, reserve) {
      if (err) return console.error(err);
      res.json(201, reserve);
    });
  },

  readAll: function (req, res) {

    // If querying for a startdate
    if (req.query.startDate) {
      
      // and an end date, return only reservations in the date range
      if (req.query.endDate) {
        Reservation.find({ date: { $gte: req.query.startDate, $lte: req.query.endDate} }, function (err, reservations) {
          if (err) return console.error(err);
          return res.json(200, reservations);
        });
      } else {
        // Find reservations after the start date
        Reservation.find({ date: { $gte: req.query.startDate } }, function (err, reservations) {
          if (err) return console.error(err);
          return res.json(200, reservations);
        });
      }
    } else if (req.query.endDate) {
      Reservation.find({ date: {$lte: req.query.endDate} }, function (err, reservations) {
        if (err) return console.error(err);
        return res.json(200, reservations);
      });
    } else {

      // If there are no query params, get all reservations
      Reservation.find(function (err, reservations) {
        if (err) return console.error(err);
        return res.json(200, reservations);
      });

    }

  },

  readOne: function (req, res) {
    Reservation.findById(req.params._id, function (err, reservation) {
      if (err) return console.error(err);
      res.json(reservation);
    });
  },

  updateOne: function (req, res) {
    Reservation.findById(req.params._id, function (err, reservation) {
      if (err) return console.error(err);

      // Update MongoDB record with data from request
      reservation.first_name = req.body.first_name;
      reservation.last_name = req.body.last_name;
      reservation.first_name = req.body.first_name;
      reservation.date = req.body.date;
      reservation.time = req.body.time;
      reservation.party_size = req.body.party_size;
      reservation.comments = req.body.comments;

      // Save to DB
      reservation.save(function (err, updatedReservation) {
        if (err) return console.error(err);
        res.json(updatedReservation);
      });
    });
  },

  removeOne: function (req, res) {
    Reservation.findById(req.params._id, function (err, reservation) {
      if (err) return console.error(err);

      reservation.remove(function (err, product) {
        if (err) return handleError(err);
        res.send(204);
      });
    });
  }

};
