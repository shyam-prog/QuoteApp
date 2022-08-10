import QuoteForm from "../components/quotes/QuoteForm";
import { useNavigate} from "react-router-dom";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
import { useEffect } from "react";

const NewQuote = () => {
    // const history = useHistory();
    const navigate = useNavigate();
    const { sendRequest, status } = useHttp(addQuote);
    useEffect(()=>{
        if(status === 'completed'){
           navigate('/quotes'); 
        }
    },[navigate, status]);
    const addNewQuoteHandler = (data) => {
        // console.log(data);
        sendRequest(data);

    }
    return <QuoteForm isLoading={status === 'pending'} onAddQuote={addNewQuoteHandler}/>
}

export default NewQuote;