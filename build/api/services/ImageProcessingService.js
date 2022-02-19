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
exports.ImageProcessingService = void 0;
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
class ImageProcessingService {
    static imageSharp(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, sharp_1.default)(options.imageName)
                    .resize(options.width, options.height)
                    .toFormat('webp')
                    .toFile(options.outputFile);
            }
            catch (err) {
                console.log(`An error occurred during processing: ${err}`);
                throw new Error('An error occurred during processing');
            }
        });
    }
    static imagePath(imageName) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageLoc = `./../../../assets/images/full/${imageName}.jpg`;
            return path_1.default.resolve(__dirname, imageLoc);
        });
    }
    static outputImagePath(imageName) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageLoc = `./../../../assets/images/thumb/${imageName}.jpg`;
            return path_1.default.resolve(__dirname, imageLoc);
        });
    }
    static imagesList() {
        return __awaiter(this, void 0, void 0, function* () {
            const imagesPath = path_1.default.resolve(__dirname, './../../../assets/images/full');
            const images = yield fs_1.default.promises.readdir(imagesPath);
            const namesList = images.map((imageName) => imageName.split('.')[0]);
            return namesList;
        });
    }
    static outputImagesList() {
        return __awaiter(this, void 0, void 0, function* () {
            const imagesPath = path_1.default.resolve(__dirname, './../../../assets/images/thumb');
            const images = yield fs_1.default.promises.readdir(imagesPath);
            const namesList = images.map((imageName) => imageName.split('.')[0]);
            return namesList;
        });
    }
}
exports.ImageProcessingService = ImageProcessingService;
