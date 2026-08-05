
import {
  createClient
} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


const supabaseUrl =
  "https://qexgbswdbwlpydolpcll.supabase.co";


const supabaseKey =
  "sb_publishable_3Vo6VOuDzVbN5355c9HeDA_1YwQPR6l";


export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );

