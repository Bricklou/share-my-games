import {gql} from '../database';

export const QUERY_SETTINGS = gql`
query Settings {
   settings {
		project_name
		project_descriptor
	}
}
`;

export type GlobalSettingsQuery = {
	settings: {
		projectName: string | undefined;
		projectDescriptor: string | undefined;
	};
};
