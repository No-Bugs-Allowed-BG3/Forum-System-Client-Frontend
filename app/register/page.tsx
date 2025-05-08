export default function Page() {
    return (
        <form action="/register/submit" method="post">
		  <label htmlFor="username">Потребителско име :</label>
            <input name="username" type="text"/><br/>
		  <label htmlFor="password">Парола :</label>
            <input name="password" type="password"/><br/>
		  <label htmlFor="email">Електронна поща :</label>
            <input name="email" type="email"/><br/>
            <button type="submit">Регистрация</button>
        </form>
    )
}