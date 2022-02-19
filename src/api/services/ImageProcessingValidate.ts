import express from 'express';
import { ValidateError } from '../errors/ValidateError';
import { APIQuery } from '../types/APIQuery';
import { ImageProcessingService } from './ImageProcessingService';

export class ImageProcessingValidate {
    public static validate(query: APIQuery): void {
        if (!query.filename || !query.filename.length) {
            throw new ValidateError('Filename is required');
        }

        if (!query.width || isNaN(parseInt(query.width))) {
            throw new ValidateError('Valid width is required');
        }

        if (!query.height || isNaN(parseInt(query.height))) {
            throw new ValidateError('Valid height is required');
        }
    }

    public static async validImageName(imageName: string): Promise<void> {
        const images = await ImageProcessingService.imagesList();
        if (!images.includes(imageName)) {
            throw new ValidateError('image name not valid');
        }
    }

    public static async isExist(imageName: string): Promise<boolean> {
        const images = await ImageProcessingService.outputImagesList();
        return images.includes(imageName);
    }

    public static mapQuery(req: express.Request): APIQuery {
        const result: APIQuery = {
            filename: req.query.filename?.toString() || '',
            width: req.query.width?.toString() || '',
            height: req.query.height?.toString() || '',
        };

        return result;
    }
}
