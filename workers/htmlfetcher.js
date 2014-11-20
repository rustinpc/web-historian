var archive = require('../helpers/archive-helpers');
// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.



//go to the sites file
// for each url there check, whether it had been downloaded to the sites directory

archive.readListOfUrls (function (data) {
  for (var i = 0; i < data.length; i++) {
    if (archive.isUrlInList())

  }

})

// if not, go to the web and fetch it;
// put it to the sites directory;

