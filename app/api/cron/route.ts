import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase'; // Senin mevcut supabase bağlantın

export async function GET(request: Request) {
    // Güvenlik kontrolü: Vercel'den gelip gelmediğini doğrular
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        // Veritabanına çok küçük bir dokunuş yapıyoruz
        const { data, error } = await supabase
            .from('technical_posts')
            .select('id')
            .limit(1);

        if (error) throw error;

        return NextResponse.json({
            success: true,
            message: 'Supabase is pinged!',
            timestamp: new Date().toISOString()
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}