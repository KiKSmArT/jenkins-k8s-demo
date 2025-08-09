const express = require('express');
const app = express();

// Unique pod identifier (can be POD_NAME env var or generated UUID)
const podId = process.env.POD_NAME || `not running through a POD`;

app.get('/', (req, res) => {
    console.log(`Request served by ${podId}`);
    res.send(`Hello from Jenkins + Kubernetes! Served by ${podId}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}, podId=${podId}`);
});