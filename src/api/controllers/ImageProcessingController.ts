import express from 'express';
import { ImageProcessingService } from '../services/ImageProcessingService';
import { ImageProcessingValidate } from '../services/ImageProcessingValidate';
const imageProcessingRouter = express.Router();
imageProcessingRouter.get('/', async (req, res) => {
    // validate url queries
    const params = ImageProcessingValidate.mapQuery(req);
    ImageProcessingValidate.validate(params);

    // validate image existance
    await ImageProcessingValidate.validImageName(params.filename);
    const outputImageName = `${params.filename}_${params.width}_${params.height}`;
    const outputImage = await ImageProcessingService.outputImagePath(
        outputImageName
    );
    const image = await ImageProcessingService.imagePath(params.filename);

    // validate not created before
    const isExist = await ImageProcessingValidate.isExist(outputImageName);
    if (isExist) {
        return res.status(200).sendFile(outputImage);
    }

    // resize image
    await ImageProcessingService.imageSharp({
        imageName: image,
        width: Number(params.width),
        height: Number(params.height),
        outputFile: outputImage,
    });

    res.status(200).sendFile(outputImage);
});

export default imageProcessingRouter;
