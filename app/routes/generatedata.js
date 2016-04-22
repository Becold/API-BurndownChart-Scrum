var router = require('express').Router(),
  _ = require('lodash');

// Models
var Sprint = require('../models/sprint');
var Story = require('../models/story');
var HistoryPoints = require('../models/historyPoints');

function addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
}

router.route('/gd')

  // Récupérer tous les story de la db
  .get(function(req, res) {

        // Sprint : faire l'api
        var sprint1 = new Sprint();
        sprint1.name = "Faire l'api";
        sprint1.finishAt = addDays(Date.now(), 7);
          sprint1.createdAt = Date.now();
        sprint1.save();

        // Story 1 : Express
        var story1 = new Story();
        story1._sprint = sprint1._id;
        story1.name = "Express";
        story1.save();

        var historyPoints1 = new HistoryPoints();
        historyPoints1._story = story1._id;
        historyPoints1.points = parseInt(10);
        historyPoints1.date = Date.now();
        historyPoints1.save();

        var historyPoints2 = new HistoryPoints();
        historyPoints2._story = story1._id;
        historyPoints2.points = parseInt(5);
        historyPoints2.date = addDays(Date.now(), 2);
        historyPoints2.save();

        var historyPoints3 = new HistoryPoints();
        historyPoints3._story = story1._id;
        historyPoints3.points = parseInt(1);
        historyPoints3.date = addDays(Date.now(), 3);
        historyPoints3.save();

        var historyPoints4 = new HistoryPoints();
        historyPoints4._story = story1._id;
        historyPoints4.points = parseInt(0);
        historyPoints4.date = addDays(Date.now(), 5);
        historyPoints4.save();

        story1.historyPoints.push(historyPoints1);
        story1.historyPoints.push(historyPoints2);
        story1.historyPoints.push(historyPoints3);
        story1.historyPoints.push(historyPoints4);
        story1.save();

        // Story 2 : Mongodb
        var story2 = new Story();
        story2._sprint = sprint1._id;
        story2.name = "Mongodb"
        story2.save();

        var historyPoints1 = new HistoryPoints();
        historyPoints1._story = story2._id;
        historyPoints1.points = parseInt(2);
          historyPoints1.date = Date.now();
        historyPoints1.save();

        var historyPoints2 = new HistoryPoints();
        historyPoints2._story = story2._id;
        historyPoints2.points = parseInt(0);
        historyPoints2.date = addDays(Date.now(), 1);
        historyPoints2.save();

        story2.historyPoints.push(historyPoints1);
        story2.historyPoints.push(historyPoints2);
        story2.save();

        // Story 3 : Routes
        var story3 = new Story();
        story3._sprint = sprint1._id;
        story3.name = "Routes"
        story3.save();

        var historyPoints1 = new HistoryPoints();
        historyPoints1._story = story3._id;
        historyPoints1.points = parseInt(12);
          historyPoints1.date = Date.now();
        historyPoints1.save();

        var historyPoints2 = new HistoryPoints();
        historyPoints2._story = story3._id;
        historyPoints2.points = parseInt(5);
        historyPoints2.date = addDays(Date.now(), 4);
        historyPoints2.save();

        var historyPoints3 = new HistoryPoints();
        historyPoints3._story = story3._id;
        historyPoints3.points = parseInt(3);
        historyPoints3.date = addDays(Date.now(), 5);
        historyPoints3.save();

        var historyPoints4 = new HistoryPoints();
        historyPoints4._story = story3._id;
        historyPoints4.points = parseInt(0);
        historyPoints4.date = addDays(Date.now(), 6);
        historyPoints4.save();

        story3.historyPoints.push(historyPoints1);
        story3.historyPoints.push(historyPoints2);
        story3.historyPoints.push(historyPoints3);
        story3.historyPoints.push(historyPoints4);
        story3.save();

        res.json({success: true});
  });


router.route('/dd')

  // Récupérer tous les story de la db
  .delete(function(req, res) {

        Sprint.remove({}, function(err) {
                if (err) {
                        console.log(err)
                } else {
                        res.end('success');
                }
        });
        Story.remove({}, function(err) {
                if (err) {
                        console.log(err)
                } else {
                        res.end('success');
                }
        });
        HistoryPoints.remove({}, function(err) {
                if (err) {
                        console.log(err)
                } else {
                        res.end('success');
                }
        });

        res.json({success: true});
  });

module.exports = router;