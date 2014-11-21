var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');
var htmlFetch = require('../workers/htmlfetcher.js');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, 'utf8', function(err,data) {
    if (err) { throw err }
    data = data.split("\n");
    callback(data);
  });
};

exports.isUrlInList = function(formURL){
  var listUrls = fs.readFileSync(this.paths.list, 'utf8');
  console.log(listUrls);
  data = listUrls.split("\n");
  for (var i = 0; i < data.length; i++) {
    if (formURL === data[i]) {
      return true;
    }
  }
  return false;
};

exports.isURLInList = function (formURL, callback) {
  exports.readListOfUrls(function(dataList) {
    callback(dataList.indexOf(formURL) !== -1);
  });
};


exports.addUrlToList = function(content){
  fs.appendFile(this.paths.list, content, function(err) {
    if (err) { throw err }
    console.log("URL has been added to txt file!")
  });
};

exports.isURLArchived = function(url, callback){
  fs.readdir(exports.paths.archivedSites, function(err,files) {
    if (err) { throw err; }
    callback(files.indexOf(url) !== -1, url);
  });
};

exports.downloadUrls = function(url){
  httpRequest.get({ "url": url }, this.paths.archivedSites + "/" + url, function(err,res) { console.log("Downloaded URLs")});
};
