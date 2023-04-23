
import type {CodegenConfig} from '@graphql-codegen/cli';

const CONFIG: CodegenConfig = {
	overwrite: true,
	schema: ['http://127.0.0.1:8055/graphql', 'http://127.0.0.1:8055/graphql/system'],
	documents: 'src/utils/graphql/**/*.{ts,tsx}',
	generates: {
		'src/utils/gql-gen/': {
			preset: 'client',
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-react-query',
			],
			config: {
				withHooks: true,
			},
		},
	},
};

export default CONFIG;
