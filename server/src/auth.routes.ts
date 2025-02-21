import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

import * as jwt from "node-jsonwebtoken";

export const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post("/register", async (req, res) => {
    try {
        const creds = req.body;
        console.log(creds.username);

        const existingUser = await collections?.users?.findOne({ username: creds.username });
        if (existingUser) {
            res.status(409).send("Username already exists.");
            return;
        } else {
            const result = await collections?.users?.insertOne(creds);

            if (result?.acknowledged) {
                res.status(201).send(`Created a new user ${result.insertedId}.`);
            } else {
                res.status(500).send("Failed to create a new user.");
            }
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});