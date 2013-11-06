'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var DigiGenerator = module.exports = function DigiGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(DigiGenerator, yeoman.generators.Base);

DigiGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'confirm',
    name: 'isDrupal',
    message: 'Is this a Drupal project?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.isDrupal = props.isDrupal;

    cb();
  }.bind(this));
};

DigiGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

DigiGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
