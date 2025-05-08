export const runtime = 'nodejs'; 
import { cookies } from 'next/headers';

export default async function LoginInfo() {
	const cookieStore = await cookies();
	const token_cookie = cookieStore.get('access_token');
	if ( !token_cookie ) {
		return (
		<div className="logindiv">
			<form action="/login/submit" method="post" name="loginform">
				<label htmlFor="username">Потребителско име :</label>
				<input name="username" type="text"/>
				<label htmlFor="password">Парола :</label>
				<input name="password" type="password"/>
				<button type="submit">Вход</button>
			</form>
		</div>
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
				<div className="logindiv">Влезли сте като : {logged_username} <a href="/logout"> Изход</a></div>
			)
		}
		else {
			return (
				<div className="logindiv">
					"Error"
				</div>
			)
		}
	}
}