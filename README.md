# Marionette.js Sample App

Marionette.js / RequireJS / Bootstrap/ Handlebars sample application with Grunt.js build task

![Alt text](http://jster.net/uploads/repository/MarionetteJS-1351535894.png "MarioneteJS")

### Getting Started

An example Tweet search app based on:

* RequireJS
* Backbone.js 
* Marionette.js
* Handlebars
* jQuery
* Grunt.js
* SASS, COMPASS

### Requirements

 * Node.js **(>= 0.8.0)**
 * Grunt.js **(0.4.x)**
 * Twitter Bower **(last)**

### Install

* [Node.js installation](http://nodejs.org/download/)
* [Twitter Bower installation](https://github.com/bower/bower)
* [Grunt.js installation](http://gruntjs.com/getting-started)

Download node packages required to build the application

	npm install

Install **bower** dependencies

	bower install

### Development

This mode run [internal server](http://expressjs.com/) with livereload, compass, jhint in your browser ready to ready to be debugged.

	grunt dev
	
Once the process ended **load in your browser** this link

[http://localhost:3001/](http://localhost:3001/)

### Production Build

This build minimize the code (html, js, css), optimize images and prepare the application ready to production.

	grunt 
	grunt dist

Once the process ended **load in your browser** this link

[http://localhost:3001/](http://localhost:3002/)

