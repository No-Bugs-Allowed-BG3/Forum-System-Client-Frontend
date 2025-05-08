export const runtime = 'nodejs'; 
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page({ searchParams }: { searchParams: Promise<{ topic_id: string }> }) {
	const cookieStore = await cookies();	
	const topic_id = searchParams?.topic_id;
	const token_cookie = cookieStore.get('access_token');
	if ( token_cookie ) {
		return (
			<form action="/new-reply/submit" method="post">
				<label htmlFor="replyContents">Отговор :</label>
				<textarea name="replyContents" cols="40" rows="5"></textarea><br/>
				<input type="hidden" name="topic_id" value={topic_id}/>
				<button type="submit">Отговори</button>
			</form>
		)
	}
	else {
		redirect('/errors/unauthorized');
	}
}