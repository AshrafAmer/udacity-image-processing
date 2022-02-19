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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProcessingValidate = void 0;
const ImageProcessingService_1 = require("./ImageProcessingService");
class ImageProcessingValidate {
    static validate(query) {
        if (!query.filename || !query.filename.length) {
            throw new Error('Filename is required');
        }
        if (!query.width || !query.width.length) {
            throw new Error('Width is required');
        }
        if (!query.height || !query.height.length) {
            throw new Error('Height is required');
        }
    }
    static validImageName(imageName) {
        return __awaiter(this, void 0, void 0, function* () {
            const images = yield ImageProcessingService_1.ImageProcessingService.imagesList();
            if (!images.includes(imageName)) {
                throw new Error('image name not valid');
            }
        });
    }
    static isExist(imageName) {
        return __awaiter(this, void 0, void 0, function* () {
            const images = yield ImageProcessingService_1.ImageProcessingService.outputImagesList();
            return images.includes(imageName);
        });
    }
    static mapQuery(req) {
        var _a, _b, _c;
        const result = {
            filename: ((_a = req.query.filename) === null || _a === void 0 ? void 0 : _a.toString()) || '',
            width: ((_b = req.query.width) === null || _b === void 0 ? void 0 : _b.toString()) || '',
            height: ((_c = req.query.height) === null || _c === void 0 ? void 0 : _c.toString()) || '',
        };
        return result;
    }
}
exports.ImageProcessingValidate = ImageProcessingValidate;
