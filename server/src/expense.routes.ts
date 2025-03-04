import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const expenseRouter = express.Router();
expenseRouter.use(express.json());

expenseRouter.get("/", async (req, res) => {
    try {
        const userId = req.query.userId;
        const query = { userId: userId };
        const expenses = await collections?.expenses?.find(query).toArray();
        res.status(200).send(expenses);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

expenseRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const expense = await collections?.expenses?.findOne(query);

        if (expense) {
            res.status(200).send(expense);
        } else {
            res.status(404).send(`Failed to find an expense: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an expense: ID ${req?.params?.id}`);
    }
});

expenseRouter.post("/", async (req, res) => {
    try {
        const expense = req.body;
        const result = await collections?.expenses?.insertOne(expense);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new expense: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new expense.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

expenseRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const expense = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.expenses?.updateOne(query, { $set: expense });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an expense: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find an expense: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an expense: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

expenseRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.expenses?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an expense: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an expense: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an expense: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});