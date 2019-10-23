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
  const [deletePost] = useMutation(DELETE_POST);
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const gqlVariable = { variables: { id } };
  return () => text === 'Post' ? deletePost(gqlVariable) : deleteComment(gqlVariable);
};

useDelete.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  text: PropTypes.string.isRequired,
};

export default useDelete;

