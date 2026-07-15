const SUPABASE_URL = "https://csffnyrhyxmlcfdzngfx.supabase.co/rest/v1/";
const SUPABASE_ANON_KEY = "sb_publishable_nTD-LDImtmgZvSgG2zPGoA_2UMo4Pn9";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);