export const runtime = 'nodejs'; 
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
	const formData = await request.formData();
	const userName = formData.get("username");
	const passWord = formData.get("password");
	const prevURL = formData.get("prevURL");
	if ( userName.length > 0 && passWord.length > 0 ) {
		const loginData = new URLSearchParams();
		loginData.append('username',userName);
		loginData.append('password',passWord);
		const response = await fetch('http://127.0.0.1:8000/tokens/',{
			method:'POST',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: loginData.toString(),
		});
		const data = await response.json();
		if ( data["access_token"] ) {
			const cookieStore = await cookies();
			cookieStore.set('access_token', data["access_token"], {
				httpOnly: true,
				path: '/',
				maxAge: 60 * 60 * 0.25, // 1/4 hour
			});
		}
	}
	return NextResponse.redirect(new URL('/', request.nextUrl));
}