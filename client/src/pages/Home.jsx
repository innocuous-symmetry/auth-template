import { useEffect, useState } from "react";
import API from "../util/API";

function Home({ user, handleLogout }) {
    const [items, setItems] = useState(null);
    console.log(user);

    useEffect(() => {
        if (user) {
            (async() => {
                const myItems = await API.getItems();

                setItems(myItems.map(each => <>{each.id}</>));
            })();
        } else {
            setItems(null);
        }

    }, [])

    async function getStatus() {
        const res = await API.validate();
        console.log(res);
    }

    return (
        <section>
            <h1>Testing user auth workflow with PERN stack</h1>
            <button onClick={getStatus}>Get status</button>

            { items }

            <button onClick={handleLogout}>Log Out</button>
        </section>
    )
}

export default Home