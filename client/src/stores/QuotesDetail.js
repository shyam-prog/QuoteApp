import {
  Link,
  Outlet,
  Route,
  Routes,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { Fragment, useEffect } from "react";
import useHttp from "../hooks/use-http";
// import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
// import { match } from "assert";

const DUMMY_DATA = [
  { id: "q1", author: "Shyam", text: "Begin with end in Mind!" },
  {
    id: "q2",
    author: "Shyam",
    text: "Don't wait for right time, make it right!",
  },
];

const QuotesDetail = () => {
  // const match = useRouteMatch();
  const params = useParams();
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);
  // const quote = DUMMY_DATA.find((quote) => quote.id === params.quoteID);

  const { quoteID } = params;

  useEffect(() => {
    // console.log(match.params);
    sendRequest(quoteID);
  }, [sendRequest, quoteID]);

  if (error) {
    return <div className="centered">{error}</div>;
  }

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Outlet />
    </Fragment>
  );
};

export default QuotesDetail;
