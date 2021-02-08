import { server } from 'rest-on-mongo';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const APP_PORT = process.env.APP_PORT || 8008;
const APP_HOST = process.env.APP_HOST || '0.0.0.0';
const API_BASE = process.env.BASE || '/api/v1';
const API_DOCS = process.env.DOCS || '/api-docs';

const app = express();
const routes = await server.routes();
const swaggerDocument = YAML.load('./swagger.yaml');
const options = {};

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(API_DOCS, function (req, res, next) {
    swaggerDocument.host = req.get('host');
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serve, swaggerUi.setup(null, options));
app.use(API_BASE, routes);
app.listen(APP_PORT, APP_HOST);

console.log(`api started`);
console.log(`running on: http://${APP_HOST}:${APP_PORT}`);
console.log(`api: ${API_BASE}`);
console.log(`doc: ${API_DOCS}`);
