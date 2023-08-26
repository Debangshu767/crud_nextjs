"use client"
import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@components/Profile"

const MyProfile = () => {

  const router = useRouter()
    const {data : session} = useSession()
    const [posts, setPosts] = useState([])
    useEffect(() => {

        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        }
        if(session?.user.id)fetchPosts()
    
      },[session?.user.id])

      const handleDelete = async (post) => {
        console.log("inside handle delete")
        const hasConfirmed = confirm(
          "Are you sure you want to delete this prompt?"
        );
    
        if (hasConfirmed) {
          try {
            await fetch(`/api/prompt/${post._id.toString()}`, {
              method: "DELETE",
            });
    
            const filteredPosts = posts.filter((item) => item._id !== post._id);
            console.log(filteredPosts)
            setPosts(filteredPosts);
          } catch (error) {
            console.log(error);
          }
        }
      };

    const handleEdit = (post) => {

      router.push(`/update-prompt?id=${post._id}`)



    }


  return (
    <Profile
     name = "My"
     desc = "Welcome to your personalised dashboard page"
     data = {posts}
     handleEdit = {handleEdit}
     handleDelete = {handleDelete}
    />
  )
}

export default MyProfile