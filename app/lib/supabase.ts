import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Post = {
    id: number
    title: string
    slug: string
    content: string | null
    excerpt: string | null
    cover_image_url: string | null
    cover_image_alt: string | null
    published: boolean
    published_at: string | null
    author: string
    tags: string | null
    reading_time: number | null
    created_at: string
}