var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var httpHelpers = require('./http-helpers');
var fs = require('fs');

// require more modules/folders here!

var routes = {
               "/": './public/index.html',
               "/styles.css": './public/styles.css',
               "/loading.html": './public/loading.html',
               "/www.google.com": '../archives/sites/www.google.com'
             };

exports.handleRequest = function (req, res) {
  if (req.method === "POST") {
    var content = "";
    req.on("data", function (chunk) {
      content += chunk;
    });

    req.on("end", function(){
      var contentUrl = "/" + content.slice(4);
      var contentForFile = content.slice(4);
      content = content.slice(4) + "\n";
      res.writeHead(302);
      archive.isURLInList(contentForFile,function(result) {
        if (result) {
          archive.isURLArchived(contentForFile, function (exists) {
            if (exists) {
              httpHelpers.serveAssets(res, "../archives/sites" + contentUrl, res.end.bind(res));
            } else {
              httpHelpers.serveAssets(res, './public/loading.html', res.end.bind(res));
            }
          } );
        } else {
          archive.addUrlToList(content);
          httpHelpers.serveAssets(res, './public/loading.html', res.end.bind(res));
        }
      });
    });
  } else {
    var route = url.parse(req.url).pathname;
    if (routes[route]) {
      res.writeHead(200, httpHelpers.headers);
      httpHelpers.serveAssets(res, routes[route], res.end.bind(res));
    } else {
      res.writeHead(404);
      res.end("");
    }
  }
};
