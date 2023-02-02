import { useState, useEffect } from "react";
import API from "../../util/API";
import { v4 } from "uuid";

function Items() {
    const [items, setItems] = useState(<p>Loading...</p>);
    const [content, setContent] = useState();

    useEffect(() => {
        (async() => {
            try {
                const data = await API.getItems();
                setItems(data.map(item => (
                    <div className="item" key={v4()}>
                        <a href={`/item/${item.id}`}>{item.name}</a>
                        <p>{item.description}</p>
                    </div>
                )))
            } catch(e) {
                setItems(
                    <div>
                        <h2>Access Forbidden</h2>
                        <p>{e.message}</p>
                    </div>
                )
            }
        })();
    }, [])

    return (
        <main>
            <a href="/">Home</a>
            <h1>List of items!</h1>

            { items }
        </main>
    )
}

export default Items