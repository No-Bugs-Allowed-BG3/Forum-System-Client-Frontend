import { cookies } from 'next/headers'

export default async function Page({searchParams}) {
	const category_id = searchParams?.category_id
	const categories_result = await fetch('http://127.0.0.1:8000/categories/')
	const categories = await categories_result.json();
	if (!categories) {
		return (
		<p>No categories found!</p>
	)
	}
	else 
	{
		return (
		<div>
			<form action="/newtopic/submit" method="post">
				<label htmlFor="topicTitle">Тема :</label>
				<input name="topicTitle" type="text"/><br/><br/>
				<label htmlFor="topicContents">Съдържание :</label><br/>
				<textarea name="topicContents" rows="10" cols="50"/><br/><br/>
				<label htmlFor="topicCategories">Категория :</label><br/>
				<select name="topicCategories" defaultValue={category_id}>
				{categories?.map(({id,categoryName}) => (
							<option key={id} value={id}>
								{categoryName}
							</option>
				))}
				</select><br/><br/>
				<button type="submit">Публикувай</button>
			</form>
		</div>
		)
	}
}