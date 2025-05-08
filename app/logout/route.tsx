export const runtime = 'nodejs'; 
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
			const cookieStore = await cookies();
			const access_token = cookieStore.get('access_token')
			if (!access_token) {
				return NextResponse.redirect(new URL("/",request.url));
			}
			else {
				cookieStore.delete('access_token');
				return NextResponse.redirect(new URL("/",request.url));	
			}
}