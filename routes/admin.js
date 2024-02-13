import express from 'express';

const adminRoutes = express.Router();

adminRoutes.get('/profile', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ username: req.session.user.username });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

export default adminRoutes;
