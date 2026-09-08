import {
  createClient
} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


const supabaseUrl =
  "https://uumcsdpfggtdinhvhvqy.supabase.co";


const supabaseKey =
  "sb_publishable_Nlzh5xlBaD12RxYYkex3OQ_XtW7Emig";


export const usuariosSupabase =
  createClient(
    supabaseUrl,
    supabaseKey,
    {
      auth: {
        flowType: "pkce",
        persistSession: true,
        detectSessionInUrl: true
      }
    }
  );
