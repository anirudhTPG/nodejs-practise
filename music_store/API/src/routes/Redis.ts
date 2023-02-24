import express from 'express';
import controller from './../controllers/Redis';

const router = express.Router();

router.get('/test', controller.redisMethod);

export = router;
