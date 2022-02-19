import express from 'express';
import { ImageProcessingService } from '../services/ImageProcessingService';
import { ImageProcessingValidate } from '../services/ImageProcessingValidate';
const imageProcessingRouter = express.Router();

imageProcessingRouter.get(
    '/',
    async (req: express.Request, res: express.Response) => {
        // validate url queries
        const params = ImageProcessingValidate.mapQuery(req);
        try {
            ImageProcessingValidate.validate(params);
        } catch (err: unknown) {
            res.status(400).send(`${err}`);
        }

        // validate image existance
        try {
            await ImageProcessingValidate.validImageName(params.filename);
        } catch (err: unknown) {
            console.log(`error: ${err}`);
            res.status(400).send(`error occured: ${err}`);
        }

        const outputImageName = `${params.filename}_${params.width}_${params.height}`;
        // check folder thumb existance
        await ImageProcessingService.checkOutputThumbExistance();
        const outputImage = await ImageProcessingService.outputImagePath(
            outputImageName
        );
        const image = await ImageProcessingService.imagePath(params.filename);

        // validate not created before (cached images)
        const isExist = await ImageProcessingValidate.isExist(outputImageName);
        if (isExist) {
            return res.status(200).sendFile(outputImage);
        }

        try {
            // resize image
            await ImageProcessingService.imageSharp({
                imageName: image,
                width: Number(params.width),
                height: Number(params.height),
                outputFile: outputImage,
            });
        } catch (err: unknown) {
            console.log(`error: ${err}`);
            res.status(400).send(`error occured: ${err}`);
        }

        res.status(200).sendFile(outputImage);
    }
);

export default imageProcessingRouter;
