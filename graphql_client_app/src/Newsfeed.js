import React from 'react';
import { View, Text, Flatlist } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_POSTS = gql`
  query Post(
    $queryContent: String,
    $id: String,
    ) {
    posts(queryContent: $queryContent, id: $id) {
      id
      title
      body
      published
      author {
        id
        name
        email
      }
      comments {
        id
        text
      }
    }
  }
`;

const Newsfeed = () => {
const { loading, error, data } = useQuery(GET_POSTS);
if (loading) return null;
if (error) console.log(error);
if (!loading && !error) {
  console.log(data)
}
  return (
    <View>
      <Text>
        Hello
      </Text>
    </View>
  );
};

export default Newsfeed;