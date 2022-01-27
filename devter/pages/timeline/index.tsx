import React from "react";
import Link from "next/link";


export default function  Timeline ({ username})  {

    return (

        <>
            <h1>This is the timeline of {username}</h1>


            <Link href="/">
                <a> Go home</a>
            </Link>

        </>
    )
}


Timeline.getInitialProps = async () => {
    return {username: "@sebasmora"}
}