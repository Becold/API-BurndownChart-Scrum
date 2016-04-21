var router = require('express').Router(),
    _ = require('lodash');

// Models
var Story = require('../models/story');
var HistoryPoints = require('../models/historyPoints');

/** Story
 * Route: GET /story - Récupère tous les storys
 * Route: POST /story - {idstory:0, name: "", points:0} - Insère un nouveau story
 */
router.route('/story')

  // Récupérer tous les story de la db
  .get(function(req, res) {
      Story.find().populate('historyPoints').exec(function(err, storys) {
          if (err) {
              res.status(400);
              res.json({success: false, message: 'Une erreur s\'est produite', error: err});
              return;
          }

          res.json({success: true, data: storys});
      });
  })

  // Ajouter un nouveau story à la DB
  .post(function(req, res) {

      if (_.isEmpty(req.body.idsprint) || _.isEmpty(req.body.name) || !_.isNumber(parseInt(req.body.points))) {
          res.status(400);
          res.json({success: false, data: req.body, message: 'Le champs "idpsrint" ou "name" ou "points" est manquant'});
          return;
      }

      var story = new Story();
      story._sprint = req.body.idsprint;
      story.name = req.body.name;

      var historyPoints = new HistoryPoints();
      historyPoints._story = story._id;
      historyPoints.points = parseInt(req.body.points);

      story.historyPoints.push(historyPoints);

      story.save(function (err) {
          if (err) {
              res.status(400);
              res.json({success: false, message: 'Impossible d\'enregistrer le story', error: err});
              return;
          }

          historyPoints.save(function (err) {
              if (err) {
                  res.status(400);
                  res.json({success: false, message: 'Impossible d\'enregistrer le story', error: err});
                  return;
              }

              res.json({success: true, message: 'Story crée!'});
          });

      });

  })
;

/** Story
 * Route: GET /story/:id - Récupère un story
 * Route: PUT /story/:idstory - {points:0} - Modifie une story
 * Route: DELETE /story/:id - Supprime un story
 */
router.route('/story/:storyid')

  // Récupère un story en particulier (avec l'id)
  .get(function(req, res) {
      Story.findById(req.params.storyid).populate('historyPoints').exec(function(err, story) {
          if (err) {
              res.status(400);
              res.json({success: false, message: 'Une erreur s\'est produite', error: err});
              return;
          }
          res.json(story);
      });
  })

  // Mets à jour une story en particulier (avec l'id)
  // Si "points" est rempli, on ajoute une nouvelle etape dans historyPoints
  .put(function(req, res) {
      Story.findById(req.params.storyid, function(err, story) {
          if (err) {
              res.status(400);
              res.json({success: false, message: 'Une erreur s\'est produite', error: err});
              return;
          }

          story.name = req.body.name;

          if (!_.isNaN(parseInt(req.body.points))) {
              var historyPoints = new HistoryPoints();
              historyPoints._story = story._id;
              historyPoints.points = parseInt(req.body.points);

              story.historyPoints.push(historyPoints);
              historyPoints.save(function (err) {
                  if (err) {
                      res.status(400);
                      res.json({success: false, message: 'Impossible d\'enregistrer le story', error: err});
                      return;
                  }

                  console.log("Points mis à jour");
              });
          }

          // save the story
          story.save(function(err) {
              if (err) {
                  res.status(400);
                  res.json({success: false, message: 'Une erreur s\'est produite', error: err});
                  return;
              }

              res.json({success: true, message: 'Story mis à jour!'});
          });
      });
  })

  // Supprime un story en particulier (avec l'id)
  .delete(function(req, res) {
      Story.remove({
          _id: req.params.storyid
      }, function(err) {
          if (err) {
              res.status(400);
              res.json({success: false, message: 'Une erreur s\'est produite', error: err});
              return;
          }

          res.json({success: true, message: 'Story supprimé' });
      });
  })
;

module.exports = router;