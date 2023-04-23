import {gql} from '../database'

export const QUERY_GAMES_LIST = gql`
query GameList($limit: Int = -1, $sort: [String] = [], $page: Int = 1) {
    game(limit: $limit, sort: $sort, page: $page) {
        id
        name
        slug
        rating
        create_at
        update_at
        published_at
        creator {
            id
            name
            slug
        }
        previews {
            id
            preview { id }
            is_nsfw
        }
    }

    meta: game_aggregated {
        countDistinct {
            id
        }
    }
}
`;
