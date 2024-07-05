import { v2 as cloudinary } from 'cloudinary';
import { config as dotenvConfig} from 'dotenv';
dotenvConfig({path:'.env'});

dotenvConfig({ path: '.development.env' });

export const CloudinaryConfig = {
	provide: 'CLOUDINARY',
	useFactory: () => {
		return cloudinary.config({
			cloud_name: process.env.CLOUDINATY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINATY_API_SECRET,
		});
	},
};