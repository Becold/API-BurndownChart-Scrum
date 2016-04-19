var router = require('express').Router(),
    _ = require('lodash');

// Models
var Sprint = require('../models/sprint');
var Story = require('../models/story');

// Routes
router.route('/')
  .get(function(req, res) {
    res.send('Hello World');
  });

/** Sprint
 * Route: GET /sprint - Récupère tous les sprints
 * Route: POST /sprint - {name: ""} - Insère un nouveau sprint
 */
router.route('/sprint')

  // Récupérer tous les sprint de la db
  .get(function(req, res) {
      Sprint.find(function(err, sprints) {
          if (err) {
              res.status(400);
              res.json({success: false, message: 'Une erreur s\'est produite', error: err});
              return;
          }

          res.json({success: true, data: sprints});
      });
  })

  // Ajouter un nouveau sprint à la DB
  .post(function(req, res) {
      var sprint = new Sprint();
      sprint.name = req.body.name;

      if (_.isEmpty(sprint.name)) {
          res.status(400);
          res.json({success: false, message: 'Le champs "nom" est manquant'});
          return;
      }

      sprint.save(function (err) {
          if (err) {
              res.status(400);
              res.json({success: false, message: 'Impossible d\'enregistrer le sprint'});
          }
          res.json({success: true, message: 'Sprint crée!'});
      });

  })
;


/** Sprint
 * Route: GET /sprint/:id - Récupère un sprint
 * Route: PUT /sprint/:id - {name: ""} - Modifie un sprint
 * Route: DELETE /sprint/:id - Supprime un sprint
 */
router.route('/sprint/:sprintid')

  // Récupère un sprint en particulier (avec l'id)
  .get(function(req, res) {
      Sprint.findById(req.params.sprintid, function(err, sprint) {
          if (err) {
              res.status(400);
              res.json({success: false, message: 'Une erreur s\'est produite', error: err});
              return;
          }
          res.json(sprint);
      });
  })

  // Mets à jour un sprint en particulier (avec l'id)
  .put(function(req, res) {
      Sprint.findById(req.params.sprintid, function(err, sprint) {
          if (err) {
              res.status(400);
              res.json({success: false, message: 'Une erreur s\'est produite', error: err});
              return;
          }

          sprint.name = req.body.name;

          // save the sprint
          sprint.save(function(err) {
              if (err) {
                  res.status(400);
                  res.json({success: false, message: 'Une erreur s\'est produite', error: err});
                  return;
              }

              res.json({success: true, message: 'Sprint mis à jour!' });
          });
      });
  })

  // Supprime un sprint en particulier (avec l'id)
  .delete(function(req, res) {
      Sprint.remove({
          _id: req.params.sprintid
      }, function(err) {
          if (err) {
              res.status(400);
              res.json({success: false, message: 'Une erreur s\'est produite', error: err});
              return;
          }

          res.json({success: true, message: 'Sprint supprimé' });
      });
  })
;

module.exports = router;