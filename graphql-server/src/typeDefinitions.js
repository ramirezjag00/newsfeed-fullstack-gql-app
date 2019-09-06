const typeDefs =
`
  type Query {
    users(queryName: String, id: String): [User!]!
    posts(queryContent: String, id: String): [Post!]!
    comments(queryText: String, id: String): [Comment!]!
  }

  type Mutation {
    addPost(data: addPostInput): Post!
    updatePost(id: String!, title: String!, body: String!, published: Boolean!, author: String!): Post!
    deletePost(id: String!): [Post!]!

    addComment(text: String!, author: String!, post: String!): Comment!
    updateComment(id: String!, text: String!, author: String!, post: String!): Comment!
    deleteComment(id: String!): [Comment!]!

    addUser(name: String!, email: String!, age: Int): User!
    updateUser(id: String!, name: String!, email: String!, age: Int): User!
    deleteUser(id: String!): [User!]!
  }

  input addPostInput {
    title: String!,
    body: String!,
    published: Boolean!,
    author: String!
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