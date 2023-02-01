export default function Page({ classes = "", children = <></> }) {
    return (
        <main className={`page ${classes}`}>
            { children }
        </main>
    )
}