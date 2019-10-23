import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const UPDATE_COMMENT = gql`
  mutation updateComment($id: ID!, $text: String!) {
    updateComment(
      id: $id,
      data: {
        text: $text
      }
    ) {
      id
    }
  }
`;

const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $text: String!) {
    updatePost(
      id: $id,
      data: {
        body: $text
      }
    ) {
      id
    }
  }
`;

const useUpdate = (id, text, value) => {
  const [updatePost] = useMutation(UPDATE_POST);
  const [updateComment] = useMutation(UPDATE_COMMENT);
  const gqlVariable = { variables: { id, text: value } };
  return () => text === 'Post' ? updatePost(gqlVariable) : updateComment(gqlVariable);
};

useUpdate.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default useUpdate;
