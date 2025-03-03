import * as mongodb from "mongodb";
import { Expense } from "./expense";
import { User } from "./user";

export const collections: {
    expenses?: mongodb.Collection<Expense>;
    users?: mongodb.Collection<User>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db();
    await applySchemaValidation(db);

    const expensesCollection = db.collection<Expense>("expenses");
    const usersCollection = db.collection<User>("users");
    collections.expenses = expensesCollection;
    collections.users = usersCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
    const expenseJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["userId", "category", "description", "amount", "date"],
            additionalProperties: false,
            properties: {
                _id: {},
                userId: {
                    bsonType: "string",
                    description: "'userId' is required and is a string",
                },
                category: {
                    bsonType: "string",
                    description: "'category' is required and is a string",
                },
                description: {
                    bsonType: "string",
                    description: "'description' is required and is a string",
                },
                amount: {
                    bsonType: "number",
                    description: "'amount' is required and is a number",
                },
                date: {
                    bsonType: "string",
                    description: "'date' is required and is a string",
                },
            },
        },
    };
    const userJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "email", "password"],
            additionalProperties: false,
            properties: {
                _id: {},
                username: {
                    bsonType: "string",
                    description: "'username' is required and is a string",
                },
                email: {
                    bsonType: "string",
                    description: "'email' is required and is a string",
                },
                password: {
                    bsonType: "string",
                    description: "'password' is required and is a string",
                }
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it 
    await db.command({
        collMod: "expenses",
        validator: expenseJsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("expenses", { validator: expenseJsonSchema });
        }
    });
    await db.command({
        collMod: "users",
        validator: userJsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("users", { validator: userJsonSchema });
        }
    });
}