import { createClient } from '@supabase/supabase-js'

if (!import.meta.env.VITE_SUPABASE_URL) throw new Error('SUPABASE_URL is required')
if (!import.meta.env.VITE_SUPABASE_ANON_KEY) throw new Error('SUPABASE_ANON_KEY is required')

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
) 