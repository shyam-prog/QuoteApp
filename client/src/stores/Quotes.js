import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

// const DUMMY_DATA = [
//   { id: "q1", author: "Shyam", text: "Begin with end in Mind!" },
//   {
//     id: "q2",
//     author: "Shyam",
//     text: "Don't wait for right time, make it right!",
//   },
// ];
const Quotes = () => {
  const { sendRequest, status, data: loadedQuote, error: errOccured } = useHttp(getAllQuotes, true);
  useEffect(()=>{
    sendRequest();
    

  },[sendRequest]);

  if(errOccured){
    return <div className="centered focus">
      {errOccured}
    </div>
  }
  
  if(status === 'pending'){
    return <div className="centered">
      <LoadingSpinner />
    </div>
  }
  
  if(status === 'completed' && (loadedQuote.length === 0)){
    return <NoQuotesFound />
  }
  

  return <QuoteList quotes={loadedQuote} />;
};

export default Quotes;
