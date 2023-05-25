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
    const collection = db.collection("users");

    // Check if the form has been submitted
    if (document.getElementById("name").value && document.getElementById("email").value) {
        // Check if the username and password are correct
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        // Find the user in the database
        const query = {
            name: name,
            email: email,
        };
        const cursor = collection.find(query);

        // Check if the user was found
        let user;
        cursor.next((err, doc) => {
            if (err) {
                console.error(err);
                return;
            }
            user = doc;
        });

        // If the user was found, log them in
        if (user) {
            // Set the session variables
            sessionStorage.setItem("name", user.name);
            sessionStorage.setItem("email", user.email);

            // Redirect the user to the home page
            window.location.href = "index.html";
        } else {
            // The user was not found, show an error message
            alert("Invalid name or email address.");
        }
    }
});