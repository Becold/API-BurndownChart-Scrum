var router = require('express').Router(),
    _ = require('lodash'),
    util = require('util'),
    apiHelper = require('../lib/apiHelper');

// Models
var Sprint = require('../models/sprint');
var Story = require('../models/story');
var HistoryPoints = require('../models/historyPoints');

// Routes

/**
 * GET /sprint/:id/getGraph - Récupère les données d'un sprint pour l'afficher dans un graph
 */
router.route('/sprint/:sprintid/getGraph')
  .get(function(req, res) {

      Sprint.findById(req.params.sprintid, function(err, sprint) {
          if (err) return apiHelper.jsonError(res, 'something_happened', err);

          if(!_.isUndefined(sprint)) {

              Story.find({_sprint: req.params.sprintid}).populate(Story.getPopulateFields()).exec(function(err, stories) {
                  if (err) return apiHelper.jsonError(res, 'something_happened', err);

                  if(!_.isUndefined(stories)) {

                      var series = dbdatasToGraphdata(sprint, stories);

                      res.json({series: series});
                  }
                  else
                      return apiHelper.jsonError(res, 'no_stories_at_this_sprint');

              });
          }
          else
              return apiHelper.jsonError(res, 'no_sprint');
      });

  })

// Utils
// Algorythme pour créer les courbes du graphique
function dbdatasToGraphdata (sprint, stories) {
    var series = [];
    var totalPoints = 0;

    // Calcul de la courbe idéal
    stories.forEach(function (story) {
        totalPoints += _.head(story.historyPoints).points;
    });

    series.push({
        name: 'Courbe idéal',
        data: [
            [(new Date(sprint.createdAt).getTime()), totalPoints],
            [(new Date(sprint.finishAt).getTime()), 0]
        ]
    });


    var dates = [];
    // Algorythme de la courbe réel
    stories.forEach(function (story) {
        for (var i in story.historyPoints) {
            if (i > 0) {
                var date = new Date(story.historyPoints[i].date).getTime();
                dates.push({
                    date: date,
                    points: ((dates[date] != null) ? dates[date].points : 0) + (story.historyPoints[i - 1].points - story.historyPoints[i].points)
                });
            }
        }
    });
    dates = _.sortBy(dates, 'date'); // Trie par date
    var data = [
        [(new Date(sprint.createdAt).getTime()), totalPoints] // Premier point de la courbe
    ];
    var current = totalPoints;
    dates.forEach(function (date) {
        data.push([date.date, (current -= date.points)]); // Les autres points
    });

    series.push({
        name: 'Courbe réel',
        data: data
    });

    return series; // On retourne les 2 courbes
}

module.exports = router;