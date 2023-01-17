"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const core_1 = require("@apollo/client/core");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const CONTENTFUL_GRAPHQL_ENDPOINT = process.env.CONTENTFUL_GRAPHQL_ENDPOINT;
exports.client = new core_1.ApolloClient({
    link: new core_1.HttpLink({ uri: `${CONTENTFUL_GRAPHQL_ENDPOINT}`, fetch: cross_fetch_1.default }),
    credentials: 'same-origin',
    cache: new core_1.InMemoryCache(),
});
