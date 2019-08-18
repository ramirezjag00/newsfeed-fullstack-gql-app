import { GraphQLServer } from 'graphql-yoga'

const typeDefs =
`
  type Query {
    hello(pangalan: String): User!
    add(a: Int, b: Int): Int!
    substract(numbers: [Int!]!): Int!
  }

  type User {
    name: String!
    age: Int!
    job: String!
  }
`

const resolvers = {
  Query: {
    hello: (_, { pangalan }) => (
      {
        name: `Hello ${pangalan || 'World'}!`,
        age: pangalan ? 26 : null,
        job: pangalan ? 'Software Engineer' : null
      }
    ),
    // hello(parent, args, ctx, info) {
    //   return {
    //     name: `Hello ${args.pangalan || 'World'}`,
    //     age: args.pangalan ? 26 : null,
    //     job: args.pangalan ? 'Software Engineer' : null
    //   }
    // },
    add: (_, { a, b }) => a + b,
    substract: (_, { numbers }) => numbers.reduce((accumulator, currentValue) => accumulator - currentValue)
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log('Server is running on localhost:4000'))