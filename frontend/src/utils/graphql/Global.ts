import {gql} from '../database'

export const QUERY_SETTINGS = gql`
query Settings {
   settings {
		project_name
		project_descriptor
	}
}
`;

export interface GlobalSettingsQuery {
    settings: {
        project_name: string | null;
        project_descriptor: string | null;
    }
}