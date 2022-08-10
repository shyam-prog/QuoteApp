import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import classes from './QuoteItem.module.css';
import { deleteQuote } from '../../lib/api';
// import DeleteIcon from '@mui/icons-material/Delete';

const QuoteItem = (props) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.authSlice.token);

  const deleteHandler = () => {
    deleteQuote(props.id);
    
  }

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      { token && <Link className='btn' to={`${props.id}`}>View Fullscreen</Link> }
      {console.log(props.isCreatedByYou)}
      { props.isCreatedByYou  && <button className='btn' onClick={deleteHandler}>Delete</button> }
    </li>
  );
};

export default QuoteItem;
