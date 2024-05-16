import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  addInitialPost:()=>{},
});

const postListReducer = (currPostList, action) => {

  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  }
  else if(action.type==="ADD_POST"){
    newPostList=[action.payload,...currPostList]
  }
  else if(action.type==="ADD_INI_POST"){
    newPostList=action.payload.posts;
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,[]
  );
  const addPost = (userId,postTitle,postContent,reactions,hashtags) => {
    dispatchPostList({
      type:"ADD_POST",
      payload:{
        id: Date.now(),
        title: postTitle,
        body: postContent,
        reactions: reactions,
        userId: reactions,
        tags: hashtags,
      }
    })

  };
  const addInitialPost = (posts) => {
    dispatchPostList({
      type:"ADD_INI_POST",
      payload:{
        posts,
      }
    })

  };

  const deletePost = (postId) => {
   
    dispatchPostList({
      type: "DELETE_POST",
      payload: { postId },
    });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost,addInitialPost }}>
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POSTLIST_VALUE = [
  {
    id: "1",
    title: "Going To Australia",
    body: "Hello friends.. I am going to Australia baby.. ",
    reactions: 10,
    userId: "user-1",
    tags: ["vacation", "australia"],
  },
  {
    id: "2",
    title: "Going To Gym",
    body: "Stay Healthy , Stay Safe,Keep Grinding",
    reactions: 20,
    userId: "user-5",
    tags: ["Gym", "australia"],
  },
];

export default PostListProvider;
