

export default async function Page() {
    const data = await fetch('http://127.0.0.1:8000/categories/')
    const categories = await data.json()
    return (
        <div>
			<p className="childTitleDIV">Категории</p>
            {categories.map((category,index) => (<a key={category.id} className={index % 2 == 0 ? "category_link_even" : "category_link_odd"}
					href={`/showcategory/?category_id=${category.id}`}><br/>
                    {category.categoryName}
                </a>
            ))}
        </div>
    );
}