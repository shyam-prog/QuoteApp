import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";
import jwt_decode from "jwt-decode";


const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const yourQuotes = (quotes, Id, yes) => {
  return quotes.filter((quote) => {
    if (yes) {
      return quote.creatorId == Id;
    } else {
      return quote.creatorId != "";
    }
  })

}

const QuoteList = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.authSlice.token);
  let decoded = null;
  // const history = useHistory();
  let creatorId = null;
    if(token){
      decoded = jwt_decode(token);
      creatorId = decoded.email;
    }
  const queryParams = new URLSearchParams(location.search); // /quotes?sort=asc...this returns{ sort: asc }

  let isSortingAscending = queryParams.get("sort") === "asc";

  let isCreatedByYou = queryParams.get('yourQuote') === 'yes';

  let sortedArray = sortQuotes(props.quotes, isSortingAscending);

  sortedArray = yourQuotes(props.quotes, creatorId, isCreatedByYou);

  const sortOrderHandling = () => {
    navigate("/quotes?sort=" + (isSortingAscending ? "desc" : "asc"));
  };

  const creatorHandler = () => {
    sortedArray = yourQuotes(props.quotes, isCreatedByYou);

    navigate("/quotes?yourQuote=" + (isCreatedByYou ? "no" : 'yes'))

  }

  return (
    <Fragment>

      <div className={classes.sorting}>
        <button onClick={sortOrderHandling}>
          Sort {isSortingAscending ? "Decending" : "Ascending"}
        </button>
        {token && (
          <button onClick={creatorHandler}>
            {isCreatedByYou ? "All Quotes" : "Created By You"}
          </button>
        )}

      </div>


      <ul className={classes.list}>
        {sortedArray.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
            isCreatedByYou={isCreatedByYou}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
