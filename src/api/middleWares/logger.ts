import express from 'express';

const logging = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    console.log(`${req.method}: ${req.url}`);
    next();
};

export default logging;
