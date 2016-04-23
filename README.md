# API-BurndownChart-Scrum
API NodeJS Application (avec mongodb). Le front-end se trouve [à cette adresse](https://github.com/Becold/Front-BurndownChart-Scrum).

## Installation
Importer les données dans mongodb ( les fichiers se trouvent dans le dossier dbimport/ ) :  
```
> mongoimport --db scrub --collection sprints --file sprints.json
> mongoimport --db scrub --collection stories --file stories.json
> mongoimport --db scrub --collection historypoints --file historypoints.json
```

Lancer l'api :
```
> npm install  
> nodemon  
ou  
> node app.js  
```
