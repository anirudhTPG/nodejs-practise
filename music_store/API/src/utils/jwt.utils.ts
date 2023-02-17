import {sign, SignOptions, verify, VerifyOptions} from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import Logging from '../library/Logging';

/**
 * generates JWT used for local testing
 */

export function generateToken(username: string, accessTypes: string[]){
    //information to be encoded in the JWT
    const payload ={
        name:username,
        userId: 123,
        accessTypes:accessTypes //['getTrack','addTracks', 'updateTracks', 'deleteTracks']
    };

    //read private key value
    const privateKey = fs.readFileSync(path.join(__dirname,'./../../private.key'), 'utf8');

    const signInOptions: SignOptions ={
        // RS256 uses a public/private key pair. The API provides the private key 
        // to generate the JWT. The client gets a public key to validate the signature
        algorithm: 'RS256',
        expiresIn: '24h'
    };

    //generate JWT
    return sign(payload, privateKey, signInOptions);
}

interface TokenPayload{exp:number; accessTypes: string[]; name: string; userId: string}
/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */

export function validateToken(token: string):Promise<TokenPayload>{
    const publicKey = fs.readFileSync(path.join(__dirname,'./../../public.key'), 'utf8');

    const verifyOptions: VerifyOptions={
        algorithms:['RS256']
    }

    return new Promise((resolve, reject) =>{
        verify(token, publicKey, verifyOptions, (error, decoded)=>{
            if(error)
                return reject(error);

            resolve(decoded as TokenPayload);
        })
    });


}


