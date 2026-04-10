import { supabase } from '../config/supabase';
import path from 'path';

const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME || 'thai-nilam';

/**
 * Uploads a file buffer to Supabase Storage and returns the public URL.
 * 
 * @param file The multer file object containing the buffer
 * @param folder The folder in the bucket (e.g., 'images', 'pdfs')
 */
export const uploadFile = async (file: Express.Multer.File, folder: string): Promise<string> => {
  if (!file || !file.buffer) return '';

  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const ext = path.extname(file.originalname);
  const fileName = `${folder}/${file.fieldname}-${uniqueSuffix}${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });

  if (error) {
    throw new Error(`Supabase upload error: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
};
