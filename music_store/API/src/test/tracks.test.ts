import { request } from "http";
import {Express} from 'express-serve-static-core'
import controller from "../controllers/Tracks";

let server: Express
beforeAll(async () => {
    server = await createServer()
  })

describe("add track", () => {    

    it("should be successful", () => {
        const res= request().post("/create").send({"albumGenre":"Gazal", "albumName": "Latest Hits", "albumYear": "2023", "artistName": "Jagjit Singh", "trackName": "life 2", "trackPrice":"70" });
        expect("test the test").toBe("test");
    });
});


//"albumGenre", "albumName", "albumYear", "artistName", "trackName", "trackPrice"