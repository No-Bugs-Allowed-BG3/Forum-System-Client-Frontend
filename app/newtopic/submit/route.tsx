export const runtime = 'nodejs'; 
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
	const cookieStore = await cookies();	
	const token_cookie = cookieStore.get('access_token');
	if ( token_cookie ) {
		const formData = await request.formData();
		const topicTitle = formData.get("topicTitle");	
		const topicContents = formData.get("topicContents");
		const topicCategory = formData.get("topicCategories");
		if ( topicTitle.length > 0 && topicContents.length > 0 && topicCategory.length > 0) {
			const topicData = new URLSearchParams();
			topicData.append('topic_title',topicTitle);
			topicData.append('topic_contents',topicContents);
			const response = await fetch(`http://127.0.0.1:8000/topics/${topicCategory}`,{
				method:'POST',
				headers:{
					'Content-Type':'application/x-www-form-urlencoded',
					'Accept': 'application/json',
					'Authorization': 'Bearer '+token_cookie.value,
				},
				body:topicData.toString(),
			});
			const data = await response.json();
			if ( data["id"] ) {			
				return NextResponse.redirect(new URL(`/showtopic/?topic_id=${data["id"]}`,request.url));
			}
			else {
				return NextResponse.redirect(new URL("/newtopic",request.url));
			}
		}
		else {
				return NextResponse.redirect(new URL("/newtopic",request.url));
		}	
	}
	
		else {
				return NextResponse.redirect(new URL("/errors/unauthorized/",request.url));
		}	
}