import { cookies } from 'next/headers'

export default async function Page({ searchParams }: { searchParams: Promise<{ topic_id: string }> }) {
	const { topic_id } =await searchParams;	
	const cookieStore = await cookies();
	const token_cookie = cookieStore.get('access_token');
	let data;
	if ( !token_cookie ) {
		data = await fetch(`http://127.0.0.1:8000/topics/${topic_id}`);
	}
	else {
		data = await fetch(`http://127.0.0.1:8000/topics/${topic_id}`,{
			method:'GET',
			headers:{
				'Accept': 'application/json',
				'Authorization': 'Bearer '+token_cookie.value,
			},
		});
	}
    const topic = await data.json();
	return (
		<div>
			<p className="childTitleDIV">{`Тема : ${topic.topic_title}`}</p>
			{token_cookie && (<p><a className="newreply_anchor" href={`/new-reply/?topic_id=${topic_id}`}>Нов отговор</a></p>)}
			<div className="topic_main_div">
				<div className="topic_contents_div">
					<div className="topic_author_div">
						<p className="topic_author_username">	
							<>Потребител :<br/></>
							<>{topic.topic_author}</>
						</p>
						<img className="user_avatar_img" src={topic.topic_author_avatar}/>
						<p className="topic_date">
							<>Създадена на:<br/></>
							<>{topic.topic_created_date}</>
						</p>
					</div>
					<div className="topic_contents_text_div">
						<p className="topic_contents">{topic.topic_contents}</p>
					</div>
				</div>
			</div>
            {topic.topic_replies?.map((reply, index) => (
                <div className="topic_main_div" key={index}>
					<div className="topic_contents_div">
						<div className="topic_author_div">
							<p className="topic_author_username">
								<>Отговор от :<br/></>
								<>{reply.from_username}</>
							</p>
							<img className="user_avatar_img" src={reply.from_username_avatar}/>
							<p className="topic_date">на {reply.created_date}
							</p>
						</div>
						<div className="topic_contents_text_div">
							<p className="topic_contents">{reply.reply_contents}</p>
						</div>
					</div>
					{reply.can_modify && (
						<p className="modify_reply">
							<a className="topic_link" href={`/edit-reply/?reply_id=${reply.uid}&topic_id=${topic_id}`}>Редактирай отговор</a><br/>
							<a className="topic_link" href={`/delete-reply/?reply_id=${reply.uid}&topic_id=${topic_id}`}>Изтрий отговор</a>
						</p>
					)}
                </div>
            ))}
			{token_cookie && (<p><a className="newreply_anchor" href={`/new-reply/?topic_id=${topic_id}`}>Нов отговор</a></p>)}
        </div>
    );
}