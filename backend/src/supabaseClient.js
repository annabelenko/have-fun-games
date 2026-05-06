import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// ADD THIS TEMPORARILY
console.log('ENV PATH:', path.resolve(__dirname, '../../.env'));
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('ALL ENV KEYS:', Object.keys(process.env).filter(k => k.includes('SUPA')));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);