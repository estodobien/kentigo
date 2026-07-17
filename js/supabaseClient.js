const SUPABASE_URL = "https://csffnyrhyxmlcfdzngfx.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_nTD-LDImtmgZvSgG2zPGoA_2UMo4Pn9";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);