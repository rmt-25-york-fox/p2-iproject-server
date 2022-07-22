const router = require('express').Router();

const userController = require('../controllers/userController');
const merchantController = require('../controllers/merchantController');
const authentication = require('../middlewares/authentication');

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json({
      msg: 'cihuy!',
    });
  } catch (err) {
    next(err);
  }
});
-
router.post('/register', userController.register);
router.post('/login', userController.login);
router.use(authentication);

router.get('/merchants', merchantController.getJunctionTable);

module.exports = router;