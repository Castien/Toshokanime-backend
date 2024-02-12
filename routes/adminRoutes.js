const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ username: req.session.user.username });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;