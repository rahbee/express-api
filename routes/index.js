import express from 'express';
const router = express.Router();
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


export default router;
