import express from 'express';
const router = express.Router();
import homeController from '../controllers/home';
import userController from '../controllers/user';
import apiController from '../controllers/api';

/* API */
/* Dummy API */
router.get('/dummy', apiController.getDummy);

/* POST Login */
/* params: {username:String, password:String} */
router.post('/api/login', apiController.postLogin);

/* POST Signup */
/* params: {email:String, username:String, password: String, passwordConf: String} */
router.post('/api/signup', apiController.postSignup);



/* GET index page. */
router.get('/', homeController.index);

/* GET Signup page. */
router.get('/signup', userController.getSignup);

/* POST Signup page. */
router.post('/signup', userController.postSignup);

/* GET Login page. */
router.get('/login', userController.getLogin);

/* POST Login page. */
router.post('/login', userController.postLogin);

export default router;
