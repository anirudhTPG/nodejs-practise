import mongoose from "mongoose";
import request from "supertest";
import { config } from "../config/config";
import router from "../server";

const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJ1c2VySWQiOjEyMywiYWNjZXNzVHlwZXMiOlsiZ2V0VHJhY2siLCJhZGRUcmFja3MiLCJ1cGRhdGVUcmFja3MiLCJkZWxldGVUcmFja3MiXSwiaWF0IjoxNjc3NzQwMjU1LCJleHAiOjE2Nzc4MjY2NTV9.wOCsMvzdRcof0UznsqkqA1He6XTX1jFII2CT4q5eVOjPU5fcOq0OjuAlRvP1NaME8vVoGtbTid1PuYYsYkdJBenF4WBj6H7LGHJ-usGCPqgEAZHwy2dhuLz4OZr_wGqCV51PMOnCQkoj-RUaSJ5eXNjbwU3Rkv6u210s1gfHEZVvTCIRcbCSAcrSdOeLL5bRZSDRCIGhbh72z4HWoBrYptDpzJx6WGkqeNOB42SAMUTMlTPMRHyTNbQCrj5CQdAZlMGV2npuH2P04_QkTGdCkcfSFftyBz41Ayn0mrODcA2h-6bYO5EuohGpiLzJSJPjhBszENxt3mMzYlGQ8shjTA";

describe("track unit tests", () => {    
    beforeEach(async () => {
        const db = await mongoose.connect(config.mongo.url);
    });

    it("create should be successful", async () => {
        const res=await request(router)
                    .post("/tracks/create")
                    .set({ "Authorization": token })
                    .send({"albumGenre":"Gazal", "albumName": "Latest Hits", "albumYear": "2023", "artistName": "Jagjit Singh", "trackName": "life 2", "trackPrice":"770" });
        
        expect(res).not.toBeNull();
        expect(res.status).toEqual(201);
    });

    it("get should be successful", async () => {
        const res= await request(router)
                    .get("/tracks/get")
                    .set({ "Authorization": token });

        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);
    });

    it("delete should be successful", async () => {
        const res= await request(router)
                    .delete('/tracks/delete/64004bd75fb7a6fe4d920320')
                    .set({ "Authorization": token });

        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);        
    });
});