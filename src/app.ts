import express from 'express';
import logging from './api/middleWares/logger';
import imageProcessingRouter from './api/controllers/ImageProcessingController';
const server = express();
const PORT = process.env.PORT || 3000;

// middlewares
server.use(logging);
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// endpoint controller
server.use('/images', imageProcessingRouter);

// up server
server.listen(PORT, () => {
    console.info(`Server running on port: ${PORT}, http://localhost:${PORT}`);
});

export default server;
