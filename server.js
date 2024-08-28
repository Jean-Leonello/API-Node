const http = require('http');
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, 'data', 'users.json');
const docsFilePath = path.join(__dirname, 'data', 'docs.json');

const readJSONFile = (filePath) => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
        console.error(`Erro ao ler o arquivo ${filePath}: ${err.message}`);
        return null;
    }
};

const usersData = readJSONFile(usersFilePath);
const docsData = readJSONFile(docsFilePath);

const handleRequest = (request, response) => { 
    switch (request.url) {
        case '/api/users':
            if (usersData) {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(usersData);
            } else {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Erro ao carregar dados dos usuários.');
            }
            break;
        case '/api/docs':
            if (docsData) {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(docsData);
            } else {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Erro ao carregar dados dos documentos.');
            }
            break;
        default:
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('404 Página não encontrada');
    }
};

const server = http.createServer(handleRequest);

const port = 3000;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
