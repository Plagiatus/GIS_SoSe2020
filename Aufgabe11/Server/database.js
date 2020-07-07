"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongo = require("mongodb");
var A11Database;
(function (A11Database) {
    let mongoClient;
    let collection;
    async function connectToDB(_url) {
        mongoClient = new Mongo.MongoClient(_url, { useNewUrlParser: true, useUnifiedTopology: true });
        await mongoClient.connect();
        collection = mongoClient.db("dbname").collection("collname");
        console.log("Database connection", collection != undefined);
    }
    A11Database.connectToDB = connectToDB;
    async function findAll() {
        console.log("findAll");
        let cursor = await collection.find();
        return await cursor.toArray();
    }
    A11Database.findAll = findAll;
    // tslint:disable-next-line: no-any
    async function insert(_fb) {
        console.log("insert " + _fb.name + "'s feedback.");
        return await collection.insertOne(_fb);
    }
    A11Database.insert = insert;
    async function removeOne(_query) {
        let id = _query["id"];
        let objID = new Mongo.ObjectId(id);
        console.log("remove", id);
        return await collection.deleteOne({ "_id": objID });
    }
    A11Database.removeOne = removeOne;
})(A11Database = exports.A11Database || (exports.A11Database = {}));
//# sourceMappingURL=database.js.map