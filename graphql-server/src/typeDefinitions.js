const typeDefs =
`
  type Query {
    users(queryName: String, id: String): [User!]!
    posts(queryContent: String, id: String): [Post!]!
    comments(queryText: String, id: String): [Comment!]!
  }


  input AddPostInput {
    title: String!,
    body: String!,
    published: Boolean!,
    author: String!
  }

  input AddCommentInput {
    text: String!,
    author: String!,
    post: String!
  }

  input AddUserInput {
    name: String!,
    email: String!,
    age: Int
  }

  type Mutation {
    addPost(data: AddPostInput): Post!
    updatePost(id: String!, title: String!, body: String!, published: Boolean!, author: String!): Post!
    deletePost(id: String!): [Post!]!

    addComment(data: AddCommentInput): Comment!
    updateComment(id: String!, text: String!, author: String!, post: String!): Comment!
    deleteComment(id: String!): [Comment!]!

    addUser(data: AddUserInput): User!
    updateUser(id: String!, name: String!, email: String!, age: Int): User!
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