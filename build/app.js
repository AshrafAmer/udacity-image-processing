"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./api/middleWares/logger"));
const ImageProcessingController_1 = __importDefault(require("./api/controllers/ImageProcessingController"));
const server = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// middlewares
server.use(logger_1.default);
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: false }));
// endpoint controller
server.use('/images', ImageProcessingController_1.default);
// up server
server.listen(PORT, () => {
    console.info(`Server running on port: ${PORT}, http://localhost:${PORT}`);
});
exports.default = server;
