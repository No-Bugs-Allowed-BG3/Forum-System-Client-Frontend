import { cookies } from 'next/headers'

export default async function Page({ searchParams }: { searchParams: Promise<{ category_id: string }> }) {
const { category_id } =await searchParams
    const data = await fetch(`http://127.0.0.1:8000/categories/${category_id}`)
	if ( data.ok ) {
		const topics = await data.json();
		return (
			<div>
				<a className="newtopic_link" href={`/newtopic/?category_id=${category_id}`}>Нова тема</a><br/>
				{topics.map((topic,index) => (
				<a key={topic.topic_id} className={index % 2 == 0 ? "topic_link_even" : "topic_link_odd"} href={`/showtopic/?topic_id=${topic.topic_id}`}><br/>
						{topic.topic_title}
					</a>
				))}
			</div>
		);
	}
	else {
		return (
			<div>
				<a href={`/newtopic/?category_id=${category_id}`}>Нова тема</a><br/>
				<p>Няма теми в тази категория!</p>
			</div>
		);
	}
}