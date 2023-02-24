import { RedisClientType, createClient } from 'redis';
import { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';

const redisMethod = (req: Request, res: Response, next: NextFunction) => {
    let cache: RedisClientType;
    Logging.info('Redis Method called');
    cache = createClient({
        url: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD
    });

    cache.on('connect', () => {
        Logging.info(`Redis connection established`);
    });

    cache.on('error', (error: string) => {
        Logging.error(`Redis error, service degraded: ${error}`);
    });
};

// import { Request, Response, NextFunction } from 'express';
// import { createClient } from 'redis';
// import Logging from '../library/Logging';

// const redisMethod = (req: Request, res:Response, next: NextFunction) => {
//     Logging.info('Redis Connecting!');
//     const client = createClient(
//         {
//         password: 'DoiEhMf9sakdrMbZWEh44AvHck4lYlgZ',
//         socket: {
//             host: 'redis-16504.c56.east-us.azure.cloud.redislabs.com',
//             port: 16504
//         }
//     }
//     );

//     client.on('connect', ()=>{
//         Logging.info('Redis Connected!');
//     });
// };

export default { redisMethod };
