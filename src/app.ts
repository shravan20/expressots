import express from "express";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "@providers/inversify/Container";

const expressServer = new InversifyExpressServer(container);

expressServer.setConfig((app: express.Application) => {
    app.use(compression());
    app.options('*', app.use(cors())); // Review: Specify the correct address for communication
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
});

const app = expressServer.build();

export { app };