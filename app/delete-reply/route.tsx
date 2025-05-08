export const runtime = 'nodejs'; 
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


export async function GET(request:Request) {
	const {searchParams} = new URL(request.url);
	const topic_id = searchParams.get('topic_id');
	const reply_id = searchParams.get('reply_id');
	console.log(topic_id);
	console.log(reply_id);
	const cookieStore = await cookies();
	const token_cookie = cookieStore.get('access_token');
	if ( !token_cookie ) {
		return NextResponse.redirect(new URL("/errors/unauthorized/",request.nextUrl));
	}
	else {
		const data = await fetch(`http://127.0.0.1:8000/replies/${reply_id}`,{
			method:'DELETE',
			headers: {
				'Accept': 'application/json',
				'Authorization': 'Bearer '+token_cookie.value,
			},
		});
		const deletion_result = await data.json();
		console.log(deletion_result);
		return NextResponse.redirect(new URL(`/showtopic/?topic_id=${topic_id}`,request.nextUrl));
	}