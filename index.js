#!/usr/bin/env node --harmony
var co = require('co');
var prompt = require('co-prompt');
var program = require('commander');
var chalk = require('chalk');
var shell = require('./shellHelper');

// hell.exec('./path_to_ur_file')

function makeid() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

program
  .action(function() {
   co(function *() {
     var projectName = yield prompt(chalk.cyan('Project name: '));
     var projectTitle = yield prompt(chalk.blue('Project title: ') + chalk.italic.green(projectName + ' '));
     var dbName = yield prompt(chalk.blue('Data base name: ') + chalk.italic.green(projectName + ' '));
     var dbUser = yield prompt(chalk.blue('Data base user: ') + chalk.italic.green('root '));
     var dbPass = yield prompt(chalk.blue('Data base pass: ') + chalk.italic.green('root '));
     if(projectTitle === "") {
      projectTitle = projectName
     }

     if(dbName === "") {
      dbName = projectName
     }

     if(dbUser === "") {
      dbUser = 'root'
     }

     if(dbPass === "") {
      dbPass = 'root'
     }

     let commande1 = 'wp core download --locale=fr_FR --force'
     let commande2 = 'wp core version'
     let commande3 = 'wp core config --dbname=' + dbName + ' --dbuser=' + dbUser + ' --dbpass=' + dbPass + ' --dbprefix='+ makeid() +'_'
     let commande4 = 'wp db create'
     let commande41 = 'rm -rf wp-content/themes/twentynineteen'
     let commande42 = 'rm -rf wp-content/themes/twentyseventeen'
     let commande43 = 'rm -rf wp-content/themes/twentysixteen'
     let commande5 = 'git clone https://github.com/flinked/wp-boilerplate.git'
     let commande6 = 'rm -rf wp-boilerplate/.git'
     let commande7 = 'mv wp-boilerplate wp-content/themes'
     let commande8 = 'mv wp-content/themes/wp-boilerplate wp-content/themes/flinked'
     let commande9 = 'git clone https://github.com/flinked/wp-continious-integration.git'
     let commande10 = 'rm -rf wp-continious-integration/.git'
     let commande11 = 'mv wp-continious-integration sh'
     let commande12 = 'mv sh/.gitignore .gitignore'

     shell.series([
      commande1,
      commande2,
      commande3,
      commande4,
      commande41,
      commande42,
      commande43,
      commande5,
      commande6,
      commande7,
      commande8,
      commande9,
      commande10,
      commande11,
      commande12
      ], function(err){
        console.log(chalk.red('executed many commands in a row'));
      });

   });
  })
  .parse(process.argv);