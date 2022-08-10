import { useCallback, useEffect, useState } from "react";
import { useParams, useLocation,  } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import CommentsList from "./CommentsList";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import LoadingSpinner from "../UI/LoadingSpinner";

const Comments = (props) => {
  const params = useParams();
  const location = useLocation();
  // const match = useRouteMatch();
  const [isAddingComment, setIsAddingComment] = useState(false);
  // const [comments, setComments] = useState(null);

  const {
    
    sendRequest,
    status,
    data: loadedComments,
    error,
  } = useHttp(getAllComments);

  const { quoteID } = useParams();

  useEffect(() => {
    console.log(quoteID);
    sendRequest(quoteID);
  }, [sendRequest, quoteID]);

  const startAddCommentHandler = () => {
    setIsAddingComment(!isAddingComment);
  };

  const addCommentHandler = useCallback(() => {
    console.log("Add Comment line 39");
    sendRequest(quoteID);
    
  }, [sendRequest, quoteID]);

  // const addCommentHandler = () => {
  //   sendRequest(quoteID);
  //   console.log("Add Comment line 39");
  // };

  let comments;

  if (status === "pending") {
    const temp = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
    comments = temp;
    // setComments(temp);
  }
  if (status === "completed" && error) {
    const temp = error;
    comments = temp;
    
    // setComments(temp);

  }
  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    const temp = <CommentsList comments={loadedComments} />;
    comments = temp;

    // setComments(temp);
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    const temp = <p>No Comments found!</p>;
    comments = temp;

    // setComments(temp);

  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm commentAdded={addCommentHandler} closeForm={startAddCommentHandler} quoteId={quoteID} />
      )}
      {comments}
      {/* <CommentsList comments={loadedComments}/> 
        i am not writing here this line because 
        at very first time evalution it will get executed 
        so that first of all it will considered as null....
      */}
    </section>
  );
};

export default Comments;
