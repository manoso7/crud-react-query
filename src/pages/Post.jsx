import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost } from "../api/posts";
import { useQuery } from "@tanstack/react-query";

const Post =() => {
    const navigate=useNavigate();
    const {id} = useParams();
    const {isLoading,isError,data: post ,error} =useQuery ({
        queryKey: ["posts", id],
        queryFn: () => fetchPost(id)
    });

    if(isLoading) return 'loading...';
    if(isError) return `Error: ${error.message}`;

    return(
        <div>
            <button onClick={()=> navigate("/")}>back to post list</button>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    )
}

export default Post