import { resolve } from 'path';
import { config } from 'dotenv';

// Load environment variables from .env.local (fallback to .env)
const envLocalPath = resolve(process.cwd(), '.env.local');
const envPath = resolve(process.cwd(), '.env');

// Try .env.local first, then fallback to .env
const result = config({ path: envLocalPath });
if (result.error) {
  config({ path: envPath });
}
