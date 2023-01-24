var express = require('express');
var router = express.Router();

/* GET logout.
 * This route is used to log out the user.
 */

router.get('/', function (req, res) {
  req.logout(function(err) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
