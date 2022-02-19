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
const path_1 = __importDefault(require("path"));
const ImageProcessingService_1 = require("../../../api/services/ImageProcessingService");
describe('Image Processing Services', () => {
    it('image path (encenadaport.jpg image)', () => __awaiter(void 0, void 0, void 0, function* () {
        const imagePath = path_1.default.resolve(__dirname, './../../../../assets/images/full/encenadaport.jpg');
        const result = yield ImageProcessingService_1.ImageProcessingService.imagePath('encenadaport');
        expect(result).toEqual(imagePath);
    }));
    it('image list read all images in full folder', () => __awaiter(void 0, void 0, void 0, function* () {
        const images = yield ImageProcessingService_1.ImageProcessingService.imagesList();
        expect(images.length).toEqual(5);
    }));
});
