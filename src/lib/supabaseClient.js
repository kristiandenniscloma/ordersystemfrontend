import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://pkeedobeetbmwnmvfnbq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZWVkb2JlZXRibXdubXZmbmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUzNjk4OTUsImV4cCI6MjAxMDk0NTg5NX0.K6tmXn42oPJX8NR4S_vLliAfb2p-zWbGzEcNqhZ29YA')