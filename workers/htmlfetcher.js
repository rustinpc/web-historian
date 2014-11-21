var archive = require('../helpers/archive-helpers.js');
// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.



//go to the sites file
// for each url there check, whether it had been downloaded to the sites directory

var isElementInList = function (elem, list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i] === elem) {return true;}
  }
  return false;
};

exports.workerDownload = function() {
archive.readListOfUrls(function (data) {
  for (var i = 0; i < data.length - 1; i++) {
    archive.isURLArchived(data[i], function (urlData, fileArray) {
      if (!isElementInList(urlData, fileArray)) {
        archive.downloadUrls (urlData);
      }
    }.bind(archive));
  }

}.bind(archive));
};

setTimeout(this.workerDownload, 5000);

// if not, go to the web and fetch it;
// put it to the sites directory;



