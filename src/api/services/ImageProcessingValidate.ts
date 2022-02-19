import express from 'express';
import { APIQuery } from '../types/APIQuery';
import { ImageProcessingService } from './ImageProcessingService';

export class ImageProcessingValidate {
    public static validate(query: APIQuery): void {
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

    public static async validImageName(imageName: string): Promise<void> {
        const images = await ImageProcessingService.imagesList();
        if (!images.includes(imageName)) {
            throw new Error('image name not valid');
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
