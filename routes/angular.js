var path = require('path');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var angularBuildPath = path.resolve(__dirname, '../dist');

var angularIndexFile = cheerio.load(
    fs.readFileSync(
        path.join(angularBuildPath, 'index.html'),
        {encoding: 'utf8'}
    )
);
router.use(express.static(angularBuildPath));

router.get('*', (req, res, next) => {
    if (req.url.startsWith('/api')) return next();
    var locale = req.get('Accept-Language').split(',')[0];
    angularIndexFile('head script').html('document.locale = "' + locale +  '"');
    res.send(angularIndexFile.html());
});

module.exports = router;