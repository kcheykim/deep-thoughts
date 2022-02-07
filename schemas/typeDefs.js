const {gql } = require('apolo-server-express'); //import the gql tagged template function
const typeDefs = gql``; //create our typeDefs

const typeDefs = gql`
    type Query {
        helloWorld: String
    }
}`

module.exports = typeDefs;
