
import {config as dotenvconfig} from 'dotenv'
import { v2  } from 'cloudinary';
dotenvconfig({ path: '.env'});

export const ClaudinaryConfig = {

    provide: 'CLAUDINARY',
    useFactory: () => {
    return v2.config({ 
        cloud_name: process.env.CLAUDINARY_CLOUD_NAME, 
        api_key: process.env.CLAUDINARY_APY_KEY, 
        api_secret: process.env.CLAUDINARY_APY_SECRET
    });
  },
};

