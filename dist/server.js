"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const fs_1 = __importDefault(require("fs"));
const apollo_server_express_1 = require("apollo-server-express");
const config_1 = __importDefault(require("./config"));
const knex_1 = __importDefault(require("knex"));
const { DATABASE_URL, PORT } = config_1.default;
const db = knex_1.default({
    client: "pg",
    connection: DATABASE_URL,
});
const typeDefs = apollo_server_express_1.gql(fs_1.default.readFileSync("./src/schema/schema.graphql", { encoding: "utf-8" }));
const resolvers = require("./resolvers/resolvers");
const apolloServer = new apollo_server_express_1.ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
});
apolloServer.applyMiddleware({ app: app_1.default, path: "/graphql" });
app_1.default.set("db", db);
app_1.default.listen(PORT, () => {
    console.log(` 🚀💫 Apollo server listening at http://localhost:${config_1.default.PORT}/graphql`);
});
