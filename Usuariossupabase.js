import {
  createClient
} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


const supabaseUrl =
  "URL_DEL_NUEVO_PROYECTO";


const supabaseKey =
  "PUBLISHABLE_KEY_DEL_NUEVO_PROYECTO";


export const usuariosSupabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );