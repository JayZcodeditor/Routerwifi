const mongodb = require("mongodb");

// Create a new MongoClient instance
const client = new mongodb.MongoClient("mongodb://localhost:27017");

// Connect to the database
client.connect((err, db) => {
    // Check for errors
    if (err) {
        console.error(err);
        return;
    }

    // Get the collection
    const collection = db.collection("products");

    // Insert a document
    collection.insertOne({
        name: "Product 1",
        description: "This is a product",
        price: 100,
    });

    // Find all documents
    collection.find().toArray((err, documents) => {
        // Check for errors
        if (err) {
            console.error(err);
            return;
        }

        // Print the documents
        documents.forEach(document => {
            console.log(document);
        });
    });
});