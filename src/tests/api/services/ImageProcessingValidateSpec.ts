import { ImageProcessingValidate } from './../../../api/services/ImageProcessingValidate';

describe('Image Processing Validate', () => {
    it('isExist(encenadaport.jpg image) return false', async () => {
        const result = await ImageProcessingValidate.isExist('encenadaport');
        expect(result).toBeFalse();
    });
});
