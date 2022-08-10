import { useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
import classes from './CommentItem.module.css';
import { deleteComment } from '../../lib/api';
// import DeleteIcon from '@mui/icons-material';


const CommentItem = (props) => {
  const token = useSelector((state) => state.authSlice.token);

  const decoded = jwt_decode(token);
  console.log(decoded);

  const deleteHandler = () => {
    deleteComment(props.quoteId);
  }

  return (
    <li className={classes.item}>
      <p>{props.text} - {props.creatorName}</p>
      { decoded.name == props.creatorName && <button className='btn' onClick={deleteHandler}>Delete</button> }
      
    </li>
  );
};

export default CommentItem;
