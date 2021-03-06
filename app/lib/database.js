var mongoose = require('mongoose');

module.exports = {
    init: function(cfg) {

        mongoose.connect(process.env.DB_URI, { server: { auto_reconnect: true }});
        var db = mongoose.connection;

        mongoose.connection.on("opening", this.onOpening);
        db.on("open", this.onOpen);
        db.on("error", this.onError);
        db.on("reconnected", this.onReconnected);
        db.on("disconnected", this.onDisconnected);
    },

    onOpening: function() {
        console.log("[DB] Reconnexion en cours... %d", mongoose.connection.readyState);
    },
    onOpen: function() {
        console.log("[DB] Connexion à la base de donnée ouverte.");
    },
    onError: function(err) {
        console.error("[DB] Erreur avec la connexion de la base de donnée: %s", err);
    },
    onReconnected: function() {
        console.log("[DB] Base de données reconnecté!");
    },
    onDisconnected: function() {
        console.log("[DB] Base de données déconnectée!");
    }
};
