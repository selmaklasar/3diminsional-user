process.loadEnvFile();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { createServer } = require('http');
const connectToDatabase = require('./libs/database');
const { setupSocketIo } = require('./libs/socket-io');
const logger = require('./libs/logger');
const apiRoutes = require('./routes');
const morganWinstonMiddleware = require('./middlewares/morgan-winston-middleware');
const responseFormatterMiddleware = require('./middlewares/response-formatter-middleware');
const errorHandlerMiddleware = require('./middlewares/error-handler-middleware');


const app = express();
const server = createServer(app);
const port = process.env.PORT || 3000;
const allowedOrigins = ['http://13.201.251.105', 'http://localhost:8080'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); 
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS')); 
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(helmet());

app.use((req, res, next) => {
  req.setTimeout(1000000); 
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToDatabase();
setupSocketIo(server);

app.use(morganWinstonMiddleware);
app.use(responseFormatterMiddleware);

app.use('/api', apiRoutes);
app.use(errorHandlerMiddleware(app));

server.listen(port, () => {
  logger.info(`Server is running on port ${port}! 😍`);
});

