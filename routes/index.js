import express from 'express';
import apiController from '../controllers/api';
const router = express.Router();


/* API */
/* Dummy API */
// router.get('/dummy', apiController.getDummy);

router.get('/api/get', apiController.getLogin);

/* POST Login */
/* params: {username:String, password:String} */
router.post('/api/login', apiController.postLogin);

/* POST Signup */
/* params: {email:String, username:String, password: String, passwordConf: String} */
router.post('/api/signup', apiController.postSignup);


export default router;
