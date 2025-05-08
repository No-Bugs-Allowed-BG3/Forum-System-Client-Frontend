export const runtime = 'nodejs'; 
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
	const cookieStore = await cookies();
	const token_cookie = cookieStore.get('access_token');
	if (!token_cookie) {
		return NextResponse.redirect(new URL('/errors/unauthorized/',request.nextUrl));
	}
	const formData = await request.formData();
	const replyContents = formData.get("replyContents");
	const topic_id = formData.get("topic_id");
	if ( replyContents.length > 0 && topic_id.length > 0 ) {
		const replyData = new URLSearchParams();
		replyData.append('reply_contents',replyContents);
		const response = await fetch(`http://127.0.0.1:8000/replies/${topic_id}`,{
			method:'POST',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Bearer '+token_cookie.value,
			},
			body: replyData.toString(),
		});
		const data = await response.json();
		console.log(data);
	}
  return NextResponse.redirect(new URL(`/showtopic/?topic_id=${topic_id}`,request.nextUrl));
}