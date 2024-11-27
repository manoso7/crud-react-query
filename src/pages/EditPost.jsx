import React from 'react'
import PostForm from '../components/PostForm'
import { fetchPost } from '../api/posts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePost } from '../api/posts';

const EditPost =() =>{

    const queryClient = useQueryClient ();
    const navigate =useNavigate();
    const {id} = useParams();
    const {isLoading,isError,data: post ,error} =useQuery ({
        queryKey: ["posts", id],
        queryFn: () => fetchPost(id)
    });

    const updatePostMutation = useMutation({
        mutationFn: updatePost,
        onSuccess:() =>{
            queryClient.invalidateQueries({queryKey:['posts']});
            navigate("/");
        }
        

    })

    if(isLoading) return 'loading...';
    if(isError) return `Error: ${error.message}`; 
    
    const handleSubmit =(updatedPost)=>{
        updatePostMutation.mutate({id,...updatedPost})
    }

    return (
        <div>
            <PostForm onSubmit={handleSubmit} initialValue={post}/>       
        </div>
    )
}

export default EditPost