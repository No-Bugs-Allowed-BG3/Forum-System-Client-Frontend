export const runtime = 'nodejs'; 
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page({ searchParams }: { searchParams: Promise<{ topic_id: string,reply_id :string}> }) {
	const {topic_id,reply_id} = await searchParams;
	const cookieStore = await cookies();	
	const token_cookie = cookieStore.get('access_token');
	if ( token_cookie ) {
		const reply_contents_req = await fetch(`http://127.0.0.1:8000/replies/individual/${reply_id}`,
			{
				method: 'GET',
				headers:{
				'Accept': 'application/json',
				'Authorization': 'Bearer '+token_cookie.value,
				},
			});
		const reply_contents = await reply_contents_req.json();
		if (!reply_contents) {
			redirect('/errors/404');
		}
		return (
			<form action="/edit-reply/submit" method="post">
				<label htmlFor="replyContents">Отговор :</label>
				<textarea name="replyContents" cols="40" rows="5" defaultValue={reply_contents.reply_contents}></textarea><br/>
				<input type="hidden" name="topic_id" value={topic_id}/>
				<input type="hidden" name="reply_id" value={reply_id}/>
				<button type="submit">Отговори</button>
			</form>
		)
	}
	else {
		redirect('/errors/unauthorized');
	}
}