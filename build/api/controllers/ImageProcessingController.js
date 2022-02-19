"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ImageProcessingService_1 = require("../services/ImageProcessingService");
const ImageProcessingValidate_1 = require("../services/ImageProcessingValidate");
const imageProcessingRouter = express_1.default.Router();
imageProcessingRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // validate url queries
    const params = ImageProcessingValidate_1.ImageProcessingValidate.mapQuery(req);
    ImageProcessingValidate_1.ImageProcessingValidate.validate(params);
    // validate image existance
    yield ImageProcessingValidate_1.ImageProcessingValidate.validImageName(params.filename);
    const outputImageName = `${params.filename}_${params.width}_${params.height}`;
    const outputImage = yield ImageProcessingService_1.ImageProcessingService.outputImagePath(outputImageName);
    const image = yield ImageProcessingService_1.ImageProcessingService.imagePath(params.filename);
    // validate not created before
    const isExist = yield ImageProcessingValidate_1.ImageProcessingValidate.isExist(outputImageName);
    if (isExist) {
        return res.status(200).sendFile(outputImage);
    }
    // resize image
    yield ImageProcessingService_1.ImageProcessingService.imageSharp({
        imageName: image,
        width: Number(params.width),
        height: Number(params.height),
        outputFile: outputImage,
    });
    res.status(200).sendFile(outputImage);
}));
exports.default = imageProcessingRouter;
