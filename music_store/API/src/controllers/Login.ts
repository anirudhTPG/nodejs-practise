import { Response, Request } from "express";
import mongoose from "mongoose";
import Logging from '../library/Logging';
import Users from '../models/Users';
import { generateToken } from "../utils/jwt.utils";

const login = (req: Request, res: Response) =>{
    const {username, password} = req.body;

        return Users.findOne({username: username, password: password})
        .then((usr: any) => {
            Logging.info(`Result : ${usr}`);

            if(usr){
                let apiAccessTypes: string[];
                //generate jwt token
                if(usr.role == 'administrator'){
                    apiAccessTypes = ['getTrack','addTracks', 'updateTracks', 'deleteTracks']
                }else{
                    apiAccessTypes = ['getTrack']
                }

                const jwtToken = generateToken(usr.username, apiAccessTypes);
                Logging.info(`JWT token: ${jwtToken}`);

                res.status(201).json({ username: `${usr.username}`,role: `${usr.role}`,token: `${jwtToken}` })
            }
        })
        .catch((error) => res.status(500).json({ error }));
            
    }

export default {login}