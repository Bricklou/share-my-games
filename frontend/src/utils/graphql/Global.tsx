import {gql} from '../database'

export const QUERY_SETTINGS = gql`
query Settings {
   settings {
		project_name
		project_descriptor
	}
}
`;
