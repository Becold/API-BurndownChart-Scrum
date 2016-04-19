var router = require('express').Router(),
    _ = require('lodash');

// Models
var Story = require('../models/story');

/** Story
 * Route: GET /story - Récupère tous les storys
 * Route: POST /story - {idsprint:0, name: "", points:0} - Insère un nouveau story
 */
router.route('/story')

  // Récupérer tous les story de la db
  .get(function(req, res) {
      Story.find(function(err, storys) {
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
      var story = new Story();
      story._sprint = req.body.idsprint;
      story.name = req.body.name;
      story.currentPoint = parseInt(req.body.points);

      if (_.isEmpty(story._sprint) || _.isEmpty(story.name) || !_.isNumber(story.currentPoint)) {
          res.status(400);
          res.json({success: false, data: req.body, message: 'Le champs "idpsrint" ou "name" ou "points" est manquant'});
          return;
      }

      story.save(function (err) {
          if (err) {
              res.status(400);
              res.json({success: false, message: 'Impossible d\'enregistrer le story', error: err});
          }
          res.json({success: true, message: 'Story crée!'});
      });

  })
;

/** Story
 * Route: GET /story/:id - Récupère un story
 * Route: PUT /story/:idsprint - {points:0} - Modifie les points restant d'une story
 * Route: DELETE /story/:id - Supprime un story
 */
router.route('/story/:storyid')

  // Récupère un story en particulier (avec l'id)
  .get(function(req, res) {
      Story.findById(req.params.storyid, function(err, story) {
          if (err) {
              res.status(400);
              res.json({success: false, message: 'Une erreur s\'est produite', error: err});
              return;
          }
          res.json(story);
      });
  })

  // Mets à jour la storypoint d'une story en particulier (avec l'id)
  .put(function(req, res) {
      Story.findById(req.params.storyid, function(err, story) {
          if (err) {
              res.status(400);
              res.json({success: false, message: 'Une erreur s\'est produite', error: err});
              return;
          }

          var newStory = new Story();
          newStory._sprint = story._sprint;
          newStory.name = story.name;
          newStory.currentPoint = parseInt(req.body.points) || story.currentPoint;

          // save the story
          newStory.save(function(err) {
              if (err) {
                  res.status(400);
                  res.json({success: false, message: 'Une erreur s\'est produite', error: err});
                  return;
              }

              res.json({success: true, message: 'Story mis à jour!' });
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