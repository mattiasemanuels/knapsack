import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import socketIo from 'socket.io';
import express from 'express';
import redis from 'redis';
import routes from './routes';
import models, { connectDb } from './models';

const app = express();
const server = http.Server(app);
const io = socketIo(server);
const redisClient = redis.createClient(process.env.REDIS_URL);

redisClient.on('connect', () => {
  console.log(`connected to redis`);
});
redisClient.on('error', err => {
  console.log(`Error: ${err}`);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.context = {
    models,
    redisClient,
    currentUser: models.User.findByLogin('Mattias'),
  }
  next();
});
app.use('/users', routes.users);
app.use('/scenarios', routes.scenarios);


io.on('connection', (socket) => {
  console.log(`User '${socket.id}' connected to socket`);
  socket.on('scenario:optimize', (sid, fn) => {
    redisClient.rpush('scenario:optimize', sid)
    console.log(`Add sid=${sid} to queue`);
    fn(sid);
  });
});

connectDb().then(async () => {
  
  server.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});
