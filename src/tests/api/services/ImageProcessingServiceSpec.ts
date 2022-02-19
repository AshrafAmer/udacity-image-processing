import path from 'path';
import { ImageProcessingService } from '../../../api/services/ImageProcessingService';
import { ImageProcessingValidate } from '../../../api/services/ImageProcessingValidate';
import { ImageProcessingOptions } from '../../../api/types/ImageProcessingOptions';

describe('Image Processing Services', () => {
    it('image path (encenadaport.jpg image)', async (): Promise<void> => {
        const imagePath = path.resolve(
            __dirname,
            './../../../../assets/images/full/encenadaport.jpg'
        );
        const result = await ImageProcessingService.imagePath('encenadaport');
        expect(result).toEqual(imagePath);
    });

    it('image list read all images in full folder', async (): Promise<void> => {
        const images = await ImageProcessingService.imagesList();
        expect(images.length).toEqual(5);
    });

    it('image sharp worked', async (): Promise<void> => {
        const outputImageName = 'fjord_400_200';
        const options: ImageProcessingOptions = {
            imageName: await ImageProcessingService.imagePath('fjord'),
            outputFile: await ImageProcessingService.outputImagePath(
                outputImageName
            ),
            width: 400,
            height: 200,
        };

        await ImageProcessingService.imageSharp(options);
        const isCreated = await ImageProcessingValidate.isExist(
            outputImageName
        );
        expect(isCreated).toBeTrue();
    });
});
