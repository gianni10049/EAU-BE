let express = require('express');
const db = require('./../models');
let resolvers_graphql = require('./../resolver/index');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const { loadSchema } = require('@graphql-tools/load');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { loadSchemas } = require('./../schema');

const GraphQlStart = async () => {
	// Import resolvers
	let rootValue = await resolvers_graphql.resolvers();

	const schema = await loadSchema(await loadSchemas(), {
		loaders: [new GraphQLFileLoader()],
	});

	const schema_def = makeExecutableSchema({
		typeDefs: schema,
		resolvers: rootValue,
	});

	// Return data for graphql to start
	return {
		schema_def,
		root: rootValue,
	};
};

//Init Graphql
GraphQlStart().then(async (data) => {
	let app = express();
	app.use(cors());
	app.use(
		'/graphql',
		graphqlHTTP({
			schema: data.schema_def,
			rootValue: data.root,
			graphiql: true,
		})
	);

	db.sequelize.sync().then(() => {
		app.listen(process.env.GRAPHQL_PORT ?? 4000);
		console.log(
			`DB started, GRAPHQL server runned on http://localhost:${process.env.GRAPHQL_PORT}/graphql`
		);
	});
});

export {};