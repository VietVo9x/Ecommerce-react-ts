import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Rating } from '@mui/material';
import React from 'react';
import { Res_Comment } from '../../types/response.type';
interface Props {
  comments: Res_Comment[];
}
function ListComment(props: Props) {
  return (
    <List>
      {props.comments.map((comment: any, index: number) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar alt="Avatar" src={comment.avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={<Rating name={`rating-${index}`} value={comment.rate} readOnly />}
            secondary={comment.comment}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default ListComment;
