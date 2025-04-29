import { useGetPostByIdQuery, useGetPostsQuery } from "../../redux/features/api/baseApi"

 

const Feed = () => {
  const {data: posts, isLoading, isError} = useGetPostsQuery();
  const {data: post} = useGetPostByIdQuery(1);

console.log(post)
   if(isLoading) return <div className="text-center text-2xl">Loading...</div>;
   if(!isLoading && isError) return <div className="text-center text-2xl">Something went wrong  </div>;
  return (
    <div>
      {
        posts?.map((post) => (
          <div key={post.id} className="bg-gray-200 p-4 m-2 w-1/2 mx-auto rounded-md">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))
      }
    </div>
  )
}

export default Feed