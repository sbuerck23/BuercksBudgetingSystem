import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

import * as jwt from "node-jsonwebtoken";

export const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post("/register", async (req, res) => {
    try {
        const creds = req.body;

        const existingUsername = await collections?.users?.findOne({ username: creds.username });
        const existingEmail = await collections?.users?.findOne({ email: creds.email });
        if (existingUsername) {
            res.status(409).send("Username already exists.");
            return;
        } else if (existingEmail) {
            res.status(409).send("Email already exists.");
            return;
        } else {
            const result = await collections?.users?.insertOne(creds);

            if (result?.acknowledged) {
                res.status(201).json({ messege: `Created a new user ${result.insertedId}.`, userId: result.insertedId });
            } else {
                res.status(500).send("Failed to create a new user.");
            }
        }
    } catch (error) {
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const creds = req.body;

        const foundUser = await collections?.users?.findOne({ username: creds.username });
        const foundEmail = await collections?.users?.findOne({ email: creds.username });

        if (!foundUser && !foundEmail) {
            res.status(409).send("Invalid credentials.");
            return;
        }
        if (foundUser) {
            if (creds.password != foundUser.password) {
                res.status(409).send("Invalid credentials.");
                return;
            } else {
                res.status(201).json({ messege: "Successfully logged in.", userId: foundUser._id });
                return;
            }
        }
        if (foundEmail) {
            if (creds.password != foundEmail.password) {
                res.status(409).send("Invalid credentials.");
                return;
            } else {
                res.status(201).json({ messege: "Successfully logged in.", userId: foundEmail._id });
                return;
            }
        }

    } catch (error) {
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});