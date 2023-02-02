import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import API from "../../util/API";

function SingleItem() {
    const [content, setContent] = useState(<p>Loading...</p>);
    const { id } = useParams();

    useEffect(() => {
        (async() => {
            try {
                const data = await API.getOneItem(id);
                console.log(data);
                setContent(
                    <>
                    <h1>{data.name}</h1>
                    <p>{data.description}</p>
                    </>
                )
            } catch (e) {
                setContent(
                    <div>
                        <h2>Access Forbidden</h2>
                        <p>{e.message}</p>
                    </div>
                )
            }
        })();
    }, []);

    return (
        <div>
            <div>
                <a href="/">Home     </a>
                <a href="/item">Back</a>
            </div>
            { content }
        </div>
    )
}

export default SingleItem