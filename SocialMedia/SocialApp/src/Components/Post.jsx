import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostList } from "../store/post-list-store";
function Post({ post }) {
  const {deletePost}=useContext(PostList)
  return (
    <div className="card post-card  " style={{ width: "22rem" }}>
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            <MdDelete 
            onClick={()=>deletePost(post.id)}
            />
            <span className="visually-hidden">unread messages</span>
          </span>
        </h5>
        <p className="card-text">{post.body}.</p>
        {post.tags.map((tags) => (
          <span key={tags} className="badge text-bg-info hashtags">{tags}</span>
        ))}
        <div className="alert alert-success reactions" role="alert">
         This Post is reacted by {post.reactions} people.
        </div>
      </div>
    </div>
  );
}

export default Post;
