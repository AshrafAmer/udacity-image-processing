import express from 'express';
import { ImageProcessingService } from '../services/ImageProcessingService';
import { ImageProcessingValidate } from '../services/ImageProcessingValidate';
const imageProcessingRouter = express.Router();

imageProcessingRouter.get(
    '/',
    async (req: express.Request, res: express.Response) => {
        try {
            // validate url queries
            const params = ImageProcessingValidate.mapQuery(req);
            ImageProcessingValidate.validate(params);

            // validate image existance
            await ImageProcessingValidate.validImageName(params.filename);
            const outputImageName = `${params.filename}_${params.width}_${params.height}`;
            // check folder thumb existance
            await ImageProcessingService.checkOutputThumbExistance();
            const outputImage = await ImageProcessingService.outputImagePath(
                outputImageName
            );
            const image = await ImageProcessingService.imagePath(
                params.filename
            );

            // validate not created before
            const isExist = await ImageProcessingValidate.isExist(
                outputImageName
            );
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
        } catch (err: unknown) {
            console.log(`error: ${err}`);
            res.status(400).send(`error occured: ${err}`);
        }
    }
);

export default imageProcessingRouter;
