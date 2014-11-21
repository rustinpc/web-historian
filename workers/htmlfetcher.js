var archive = require('../helpers/archive-helpers.js');
// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

exports.workerDownload = function() {
  archive.readListOfUrls(function (data) {
    for (var i = 0; i < data.length - 1; i++) {
      archive.isURLArchived(data[i], function (exists, url) {
        if (!exists) {
          archive.downloadUrls (url);
        }
      });
    }
  });
};

setTimeout(this.workerDownload, 5000);
