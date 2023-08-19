
import { createClient } from '@supabase/supabase-js'

const supaUrl = process.env.VUE_APP_SUPABASE_URL
const supaKey = process.env.VUE_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supaUrl, supaKey)