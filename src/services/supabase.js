import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://vlrkgbehrmwtkoyykgas.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZscmtnYmVocm13dGtveXlrZ2FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1MTQ5NDcsImV4cCI6MjAwOTA5MDk0N30.Xi1xu5LbIsqs0EaCutj2zo64FVe8d7VnilBFsCOQIXg";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
