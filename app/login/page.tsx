export const runtime = 'nodejs'; 
import { cookies } from 'next/headers';

export default async function Page() {
	const cookieStore = await cookies();
	const token_cookie = cookieStore.get('access_token');
	if ( !token_cookie ) {
		return (
			<form action="/login/submit" method="post">
				<label htmlFor="username">Потребителско име :</label>
				<input name="username" type="text"/><br/>
				<label htmlFor="password">Парола :</label>
				<input name="password" type="password"/><br/>
				<button type="submit">Вход</button>
			</form>
		)
	}
	else {
		const response = await fetch('http://127.0.0.1:8000/users/',{
			method:'GET',
			headers:{
				'Accept': 'application/json',
				'Authorization': 'Bearer '+token_cookie.value,
			},
		});
		const data = await response.json();
		if ( data["username"] ) {
			const logged_username = data["username"];
			return (
				"Влезли сте като : "+logged_username
			)
		}
		else {
			return (
			"Error"
			)
		}
	}
}