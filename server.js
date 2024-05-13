
const { createServer } = require('http');
let db = [
    {
        "id": 1,
        "comedian": "Dave Chappelle",
        "title": "They say love is more important than money. Bitch, have you tried paying your bills with a hug?",
        "year": 2024
    }
];

// Function to read request body
async function readBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            resolve(body);
        });
        req.on('error', err => {
            reject(err);
        });
    });
}

// JSON Response
const sendJsonResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
}

// Send Error Messages
const sendErrorResponse = (res, statusCode, message) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify({ error: message }));
}

// Create Server
const server = createServer(async (req, res) => {
    const { url, method } = req;

    switch (method) {
        case 'GET':
            if (url === '/') {
                sendJsonResponse(res, 200, db);
            }
            break;
        case 'POST':
            if (url === '/') {
                try {
                    const body = await readBody(req);
                    const { id, comedian, title, year } = JSON.parse(body);
                    const newJoke = { id, comedian, title, year };
                    db.push(newJoke);
                    sendJsonResponse(res, 200, db);
                } catch (error) {
                    sendErrorResponse(res, 400, 'Invalid JSON');
                }
            }
            break;
        case 'PATCH':
            if (url.startsWith('/joke/')) {
                const id = parseInt(url.split('/').pop(), 10);
                try {
                    const body = await readBody(req);
                    const { joke } = JSON.parse(body);
                    if (db[id]) {
                        db[id].joke = joke;
                        sendJsonResponse(res, 200, db[id]);
                    } else {
                        sendErrorResponse(res, 404, 'Joke not found');
                    }
                } catch (error) {
                    sendErrorResponse(res, 400, 'Invalid JSON');
                }
            }
            break;
            case 'DELETE':
                if (url.startsWith('/joke/')) {
                    const id = parseInt(url.split('/').pop(), 10);
                    if (db[id]) {
                        const deletedJoke = db.splice(id, 1)[0];
                        sendJsonResponse(res, 200, deletedJoke);
                    } else {
                        sendErrorResponse(res, 404, 'Joke not found');
                    }
                }
                break;
            default:
                sendErrorResponse(res, 400, 'Route not found');
                break;
    }
});


// Start Server
server.listen(3000, () => {
    console.log("Server is running");
});