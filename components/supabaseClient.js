import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jnpsnozkagkuyokplsba.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpucHNub3prYWdrdXlva3Bsc2JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjI0NjY0MzcsImV4cCI6MTk3ODA0MjQzN30.YlVqC8-mODAma79hHiLMvvsGv62vTXheQmfwptJcQgs';

const _supabaseClient = createClient(SUPABASE_URL, supabaseKey);

export default _supabaseClient;
