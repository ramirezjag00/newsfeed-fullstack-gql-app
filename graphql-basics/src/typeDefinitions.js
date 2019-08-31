const typeDefs =
`
  type Query {
    users(queryName: String, id: String): [User!]!
    posts(queryContent: String, id: String): [Post!]!
    comments(queryText: String, id: String): [Comment!]!
  }

  type Mutation {
    addPost(title: String!, body: String!, published: Boolean!, authorId: String!): Post!
    updatePost(postId: String!, title: String!, body: String!, published: Boolean!, authorId: String!): Post!
    deletePost(id: String!): [Post!]!

    addComment(text: String!, authorId: String!, postId: String!): Comment!
    updateComment(commentId: String!, text: String!, authorId: String!, postId: String!): Comment!
    deleteComment(id: String!): [Comment!]!

    addUser(name: String!, email: String!, age: Int): User!
    updateUser(userId: String!, name: String!, email: String!, age: Int): User!
    deleteUser(id: String!): [User!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

export default typeDefs;