const http = require('http');
const database = require('./config/dbConnect');

database.initDB();

const app = require('./app/app');

const server = http.createServer(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

