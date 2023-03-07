import { RedisClientType, createClient } from 'redis';
import { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';

const redisMethod = async (req: Request, res: Response, next: NextFunction) => {
    let cache: RedisClientType;
    Logging.info('Redis Method called');
    cache = createClient({
        url: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD
    });

    await cache.connect();
    await cache.set('city', 'Lucknow');
    const value = await cache.get('city');
    Logging.info(`My city is: ${value}`);
};

export default { redisMethod };
