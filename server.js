import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  schema {
    query: Query
  }

  type Query {
    greeting: String
    movies: [Movie!]
    movie(id: ID!): Movie!
    productionCompanies: [ProductionCompany]
  }

  type Movie {
    id: ID
    title: String
    productionCompany: ProductionCompany
  }

  type ProductionCompany {
    id: ID
    name: String
  }
`;

class Movie {
  constructor(id, title, productionCompanyId) {
    this.id = id;
    this.title = title;
    this.productionCompanyId = productionCompanyId;
  }
}

class ProductionCompany {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

const movies = [new Movie(1, "Terminator", 1), new Movie(2, "Terminator 2", 2)];
const productionCompanies = [
  new ProductionCompany(1, "Great Films"),
  new ProductionCompany(2, "Slasher Films"),
];

const resolvers = {
  Query: {
    greeting: () => {
      return "Hello Adam, How are you";
    },
    movies: () => {
      return movies;
    },
    movie: (_root, args) => movies.find((x) => x.id == args.id),
    productionCompanies: () => productionCompanies,
  },
  Movie: {
    productionCompany: (movie) => {
      return productionCompanies.find(
        (x) => x.id === movie.productionCompanyId
      );
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const serverInfo = await server.listen({ port: 9008 });
console.log(`Running at: ${serverInfo.url}`);
