const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.json({message:'Welcome on Youmuu API'});
});

module.exports = router;
