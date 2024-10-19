const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
let users = []; // Array to store users in memory
let currentId = 1; // A simple counter for generating unique IDs

app.post('/users', (req, res) => { //Creates a new user
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Missing required fields' }); //Checks if there's name and email of the user
    const id = currentId++; //New ID for uniqueness
    const newUser = { id, name, email };
    users.push(newUser); //Adds the user to the array made at line 11
    res.status(201).json(newUser); //Sends 201 if successfully added details
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users/:id', (req, res) => { //Gets the user details with the input id
    const userId = parseInt(req.params.id, 10); //Converts the id to a base 10 integer (decimal)
    const user = users.find(user => user.id === userId); //Tries to find the user by the extracted id
    if (!user) return res.status(404).json({ message: 'User not found' }); //If user not found, return 404
    res.status(200).json(user); //If above statement doesnt get executed, meaning user found
});

app.put('/users/:id', (req, res) => { //Updates information for any ids specified
    const userId = parseInt(req.params.id, 10); //Converts the id to a base 10 integer (decimal)
    const { name, email } = req.body; //Extracts the name and email of the user
    const user = users.find(user => user.id === userId); //Tries to find the user by the extracted id
    if (!user) return res.status(404).json({ message: 'User not found' }); //If user not found, return 404
    //Updates the details extracted in line 36
    if (name) user.name = name;
    if (email) user.email = email;
    res.status(200).json(user); //Sends indication that update has been succesful if id found
});

app.delete('/users/:id', (req, res) => { //Deletes user information with given id
    const userId = parseInt(req.params.id, 10); //Converts the id to a base 10 integer (decimal)
    const userIndex = users.findIndex(user => user.id === userId); //Tries to find the user by the extracted id
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' }); //If user not found, return 404
    users.splice(userIndex, 1); //The syntax of this method is splice(index, count) where index is the location of item to be removed and count is how many items need to be removed after the index
    res.status(204).send(); //Sends 204 if succesfully deleted user details
});


// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing