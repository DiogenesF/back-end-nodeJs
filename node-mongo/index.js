const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboper = require("./operations");

const url = "mongodb://localhost:27017/";
const dbname = "confusion";

MongoClient.connect(url, { useUnifiedTopology: true } ).then((client) => {

    console.log("Connected correctly to the server");

    const db = client.db(dbname);

    dboper.insertDocument(db, { name: "Vadonut", description: "Test" }, "dishes")
        .then((result) => {

            console.log("Insert document:\n", result.ops);

            return dboper.findDocuments(db, "dishes")
        })
        .then((docs) => {
            console.log("Found documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test" }, "dishes")
        })
        .then((result) => {
            console.log("Updated document:\n", result.result);

            return dboper.findDocuments(db, "dishes")
        })
        .then((docs) => {
            console.log("Found documents:\n", docs);
            return db.dropCollection("dishes")
        })
        .then((result) => {
            console.log("Drop collection: ", result);
            return client.close();
        })
        .catch((err) => console.log(err));
})
    .catch((err) => console.log(err));