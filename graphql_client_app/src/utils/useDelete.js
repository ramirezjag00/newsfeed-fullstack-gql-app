import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(
      id: $id,
    ) {
      id
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(
      id: $id,
    ) {
      id
    }
  }
`;

const useDelete = (id, text) => {
  const [deletePost, { data: postData }] = useMutation(DELETE_POST);
  const [deleteComment, { data: commentData }] = useMutation(DELETE_COMMENT);
  const gqlVariable = { variables: { id } };
  return text === 'Post' ? [() => deletePost(gqlVariable), postData] : [() => deleteComment(gqlVariable), commentData];
};

useDelete.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  text: PropTypes.string.isRequired,
};

export default useDelete;

