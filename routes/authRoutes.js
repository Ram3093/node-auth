const { Router } =require('express');
const authControllers =require('../controllers/authControllers')
const routes=Router();

routes.get('/signup',authControllers.signup_get);
routes.post('/signup',authControllers.signup_post);
routes.get('/login',authControllers.login_get);
routes.post('/login',authControllers.login_post);
routes.get('/logout',authControllers.logout_get);

module.exports =routes