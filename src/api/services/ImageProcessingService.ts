import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import { ImageProcessingOptions } from './../types/ImageProcessingOptions';
import { ValidateError } from '../errors/ValidateError';

export class ImageProcessingService {
    public static async imageSharp(
        options: ImageProcessingOptions
    ): Promise<void> {
        try {
            await sharp(options.imageName)
                .resize(options.width, options.height)
                .toFormat('webp')
                .toFile(options.outputFile);
        } catch (err: unknown) {
            console.log(`An error occurred during processing: ${err}`);
            throw new ValidateError('An error occurred during processing');
        }
    }

    public static async imagePath(imageName: string): Promise<string> {
        const imageLoc = `./../../../assets/images/full/${imageName}.jpg`;
        return path.resolve(__dirname, imageLoc);
    }

    public static async outputImagePath(imageName: string): Promise<string> {
        const imageLoc = `./../../../assets/images/thumb/${imageName}.jpg`;
        return path.resolve(__dirname, imageLoc);
    }

    public static async imagesList(): Promise<string[]> {
        const imagesPath = path.resolve(
            __dirname,
            './../../../assets/images/full'
        );
        const images = await fs.promises.readdir(imagesPath);
        const namesList = images.map(
            (imageName: string): string => imageName.split('.')[0]
        );
        return namesList;
    }

    public static async outputImagesList(): Promise<string[]> {
        const imagesPath = path.resolve(
            __dirname,
            './../../../assets/images/thumb'
        );
        const images = await fs.promises.readdir(imagesPath);
        const namesList = images.map(
            (imageName: string): string => imageName.split('.')[0]
        );
        return namesList;
    }

    public static async checkOutputThumbExistance(): Promise<void> {
        const outputFolder = path.resolve(
            __dirname,
            './../../../assets/images/thumb'
        );
        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder);
        }
    }
}
