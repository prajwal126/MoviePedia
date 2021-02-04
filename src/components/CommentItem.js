import React from 'react';
import { logOut } from "../firebase";
import { Redirect,useHistory } from 'react-router-dom';
function CommentItem(props){
    return(
        <div className="comment">
            <a className="avatar">
            <img src={props.pic}/>
            </a>
            <div className="content">
                <a className="author" style={{color:'whitesmoke'}}>{props.email}</a>
                <div className="metadata">
                    <span className="date" style={{color:'whitesmoke'}}>{props.timestamp}</span>
                </div>
                <div className="text" style={{color:'whitesmoke'}}>
                {props.comment}
                </div>
            </div>
        </div>
    );

}

export default CommentItem;