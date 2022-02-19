import path from 'path';
import { ImageProcessingService } from '../../../api/services/ImageProcessingService';

describe('Image Processing Services', () => {
    it('image path (encenadaport.jpg image)', async () => {
        const imagePath = path.resolve(
            __dirname,
            './../../../../assets/images/full/encenadaport.jpg'
        );
        const result = await ImageProcessingService.imagePath('encenadaport');
        expect(result).toEqual(imagePath);
    });

    it('image list read all images in full folder', async () => {
        const images = await ImageProcessingService.imagesList();
        expect(images.length).toEqual(5);
    });
});
