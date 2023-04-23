/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** ISO8601 Date values */
  Date: any;
  /** BigInt value */
  GraphQLBigInt: any;
  /** A Float or a String */
  GraphQLStringOrFloat: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** Represents NULL values */
  Void: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  auth_login?: Maybe<Auth_Tokens>;
  auth_logout?: Maybe<Scalars['Boolean']>;
  auth_password_request?: Maybe<Scalars['Boolean']>;
  auth_password_reset?: Maybe<Scalars['Boolean']>;
  auth_refresh?: Maybe<Auth_Tokens>;
  users_invite_accept?: Maybe<Scalars['Boolean']>;
  users_me_tfa_disable?: Maybe<Scalars['Boolean']>;
  users_me_tfa_enable?: Maybe<Scalars['Boolean']>;
  users_me_tfa_generate?: Maybe<Users_Me_Tfa_Generate_Data>;
  utils_cache_clear?: Maybe<Scalars['Void']>;
  utils_hash_generate?: Maybe<Scalars['String']>;
  utils_hash_verify?: Maybe<Scalars['Boolean']>;
  utils_random_string?: Maybe<Scalars['String']>;
  utils_revert?: Maybe<Scalars['Boolean']>;
  utils_sort?: Maybe<Scalars['Boolean']>;
};


export type MutationAuth_LoginArgs = {
  email: Scalars['String'];
  mode?: InputMaybe<Auth_Mode>;
  otp?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};


export type MutationAuth_LogoutArgs = {
  refresh_token?: InputMaybe<Scalars['String']>;
};


export type MutationAuth_Password_RequestArgs = {
  email: Scalars['String'];
  reset_url?: InputMaybe<Scalars['String']>;
};


export type MutationAuth_Password_ResetArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationAuth_RefreshArgs = {
  mode?: InputMaybe<Auth_Mode>;
  refresh_token?: InputMaybe<Scalars['String']>;
};


export type MutationUsers_Invite_AcceptArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUsers_Me_Tfa_DisableArgs = {
  otp: Scalars['String'];
};


export type MutationUsers_Me_Tfa_EnableArgs = {
  otp: Scalars['String'];
  secret: Scalars['String'];
};


export type MutationUsers_Me_Tfa_GenerateArgs = {
  password: Scalars['String'];
};


export type MutationUtils_Hash_GenerateArgs = {
  string: Scalars['String'];
};


export type MutationUtils_Hash_VerifyArgs = {
  hash: Scalars['String'];
  string: Scalars['String'];
};


export type MutationUtils_Random_StringArgs = {
  length?: InputMaybe<Scalars['Int']>;
};


export type MutationUtils_RevertArgs = {
  revision: Scalars['ID'];
};


export type MutationUtils_SortArgs = {
  collection: Scalars['String'];
  item: Scalars['ID'];
  to: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  extensions?: Maybe<Extensions>;
  files: Array<Directus_Files>;
  files_aggregated: Array<Directus_Files_Aggregated>;
  files_by_id?: Maybe<Directus_Files>;
  game: Array<Game>;
  game_aggregated: Array<Game_Aggregated>;
  game_by_id?: Maybe<Game>;
  game_creator: Array<Game_Creator>;
  game_creator_aggregated: Array<Game_Creator_Aggregated>;
  game_creator_by_id?: Maybe<Game_Creator>;
  game_previews: Array<Game_Previews>;
  game_previews_aggregated: Array<Game_Previews_Aggregated>;
  game_previews_by_id?: Maybe<Game_Previews>;
  game_tags: Array<Game_Tags>;
  game_tags_aggregated: Array<Game_Tags_Aggregated>;
  game_tags_by_id?: Maybe<Game_Tags>;
  server_health?: Maybe<Scalars['JSON']>;
  server_info?: Maybe<Server_Info>;
  server_ping?: Maybe<Scalars['String']>;
  server_specs_graphql?: Maybe<Scalars['String']>;
  server_specs_oas?: Maybe<Scalars['JSON']>;
  settings?: Maybe<Directus_Settings>;
  social_networks: Array<Social_Networks>;
  social_networks_aggregated: Array<Social_Networks_Aggregated>;
  social_networks_by_id?: Maybe<Social_Networks>;
  tags: Array<Tags>;
  tags_aggregated: Array<Tags_Aggregated>;
  tags_by_id?: Maybe<Tags>;
};


export type QueryFilesArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryFiles_AggregatedArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryFiles_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryGameArgs = {
  filter?: InputMaybe<Game_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGame_AggregatedArgs = {
  filter?: InputMaybe<Game_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGame_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryGame_CreatorArgs = {
  filter?: InputMaybe<Game_Creator_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGame_Creator_AggregatedArgs = {
  filter?: InputMaybe<Game_Creator_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGame_Creator_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryGame_PreviewsArgs = {
  filter?: InputMaybe<Game_Previews_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGame_Previews_AggregatedArgs = {
  filter?: InputMaybe<Game_Previews_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGame_Previews_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryGame_TagsArgs = {
  filter?: InputMaybe<Game_Tags_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGame_Tags_AggregatedArgs = {
  filter?: InputMaybe<Game_Tags_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGame_Tags_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryServer_Specs_GraphqlArgs = {
  scope?: InputMaybe<Graphql_Sdl_Scope>;
};


export type QuerySocial_NetworksArgs = {
  filter?: InputMaybe<Social_Networks_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuerySocial_Networks_AggregatedArgs = {
  filter?: InputMaybe<Social_Networks_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuerySocial_Networks_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryTagsArgs = {
  filter?: InputMaybe<Tags_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryTags_AggregatedArgs = {
  filter?: InputMaybe<Tags_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryTags_By_IdArgs = {
  id: Scalars['ID'];
};

export enum Auth_Mode {
  Cookie = 'cookie',
  Json = 'json'
}

export type Auth_Tokens = {
  __typename?: 'auth_tokens';
  access_token?: Maybe<Scalars['String']>;
  expires?: Maybe<Scalars['GraphQLBigInt']>;
  refresh_token?: Maybe<Scalars['String']>;
};

export type Boolean_Filter_Operators = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

export type Count_Function_Filter_Operators = {
  count?: InputMaybe<Number_Filter_Operators>;
};

export type Count_Functions = {
  __typename?: 'count_functions';
  count?: Maybe<Scalars['Int']>;
};

export type Date_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _neq?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

export type Datetime_Function_Filter_Operators = {
  day?: InputMaybe<Number_Filter_Operators>;
  hour?: InputMaybe<Number_Filter_Operators>;
  minute?: InputMaybe<Number_Filter_Operators>;
  month?: InputMaybe<Number_Filter_Operators>;
  second?: InputMaybe<Number_Filter_Operators>;
  week?: InputMaybe<Number_Filter_Operators>;
  weekday?: InputMaybe<Number_Filter_Operators>;
  year?: InputMaybe<Number_Filter_Operators>;
};

export type Datetime_Functions = {
  __typename?: 'datetime_functions';
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  week?: Maybe<Scalars['Int']>;
  weekday?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type Directus_Files = {
  __typename?: 'directus_files';
  charset?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  embed?: Maybe<Scalars['String']>;
  filename_disk?: Maybe<Scalars['String']>;
  filename_download: Scalars['String'];
  filesize?: Maybe<Scalars['GraphQLBigInt']>;
  folder?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  metadata_func?: Maybe<Count_Functions>;
  modified_by?: Maybe<Scalars['String']>;
  modified_on?: Maybe<Scalars['Date']>;
  modified_on_func?: Maybe<Datetime_Functions>;
  storage: Scalars['String'];
  tags?: Maybe<Scalars['JSON']>;
  tags_func?: Maybe<Count_Functions>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  uploaded_by?: Maybe<Scalars['String']>;
  uploaded_on?: Maybe<Scalars['Date']>;
  uploaded_on_func?: Maybe<Datetime_Functions>;
  width?: Maybe<Scalars['Int']>;
};

export type Directus_Files_Aggregated = {
  __typename?: 'directus_files_aggregated';
  avg?: Maybe<Directus_Files_Aggregated_Fields>;
  avgDistinct?: Maybe<Directus_Files_Aggregated_Fields>;
  count?: Maybe<Directus_Files_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Directus_Files_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Directus_Files_Aggregated_Fields>;
  min?: Maybe<Directus_Files_Aggregated_Fields>;
  sum?: Maybe<Directus_Files_Aggregated_Fields>;
  sumDistinct?: Maybe<Directus_Files_Aggregated_Fields>;
};

export type Directus_Files_Aggregated_Count = {
  __typename?: 'directus_files_aggregated_count';
  charset?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Int']>;
  embed?: Maybe<Scalars['Int']>;
  filename_disk?: Maybe<Scalars['Int']>;
  filename_download?: Maybe<Scalars['Int']>;
  filesize?: Maybe<Scalars['Int']>;
  folder?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  location?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['Int']>;
  modified_by?: Maybe<Scalars['Int']>;
  modified_on?: Maybe<Scalars['Int']>;
  storage?: Maybe<Scalars['Int']>;
  tags?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
  uploaded_by?: Maybe<Scalars['Int']>;
  uploaded_on?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

export type Directus_Files_Aggregated_Fields = {
  __typename?: 'directus_files_aggregated_fields';
  duration?: Maybe<Scalars['Float']>;
  filesize?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type Directus_Files_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  charset?: InputMaybe<String_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  duration?: InputMaybe<Number_Filter_Operators>;
  embed?: InputMaybe<String_Filter_Operators>;
  filename_disk?: InputMaybe<String_Filter_Operators>;
  filename_download?: InputMaybe<String_Filter_Operators>;
  filesize?: InputMaybe<Number_Filter_Operators>;
  folder?: InputMaybe<String_Filter_Operators>;
  height?: InputMaybe<Number_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  metadata?: InputMaybe<String_Filter_Operators>;
  metadata_func?: InputMaybe<Count_Function_Filter_Operators>;
  modified_by?: InputMaybe<String_Filter_Operators>;
  modified_on?: InputMaybe<Date_Filter_Operators>;
  modified_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  storage?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  uploaded_by?: InputMaybe<String_Filter_Operators>;
  uploaded_on?: InputMaybe<Date_Filter_Operators>;
  uploaded_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  width?: InputMaybe<Number_Filter_Operators>;
};

export type Directus_Settings = {
  __typename?: 'directus_settings';
  id: Scalars['ID'];
  project_descriptor?: Maybe<Scalars['String']>;
  project_name?: Maybe<Scalars['String']>;
  project_url?: Maybe<Scalars['String']>;
};

export type Extensions = {
  __typename?: 'extensions';
  displays?: Maybe<Array<Maybe<Scalars['String']>>>;
  interfaces?: Maybe<Array<Maybe<Scalars['String']>>>;
  layouts?: Maybe<Array<Maybe<Scalars['String']>>>;
  modules?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Game = {
  __typename?: 'game';
  create_at?: Maybe<Scalars['Date']>;
  create_at_func?: Maybe<Datetime_Functions>;
  creator?: Maybe<Game_Creator>;
  description?: Maybe<Scalars['String']>;
  dev_finished?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  previews?: Maybe<Array<Maybe<Game_Previews>>>;
  previews_func?: Maybe<Count_Functions>;
  published_at?: Maybe<Scalars['Date']>;
  published_at_func?: Maybe<Datetime_Functions>;
  rating?: Maybe<Scalars['Int']>;
  slug: Scalars['String'];
  socials?: Maybe<Array<Maybe<Social_Networks>>>;
  socials_func?: Maybe<Count_Functions>;
  status?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Game_Tags>>>;
  tags_func?: Maybe<Count_Functions>;
  update_at?: Maybe<Scalars['Date']>;
  update_at_func?: Maybe<Datetime_Functions>;
};


export type GameCreatorArgs = {
  filter?: InputMaybe<Game_Creator_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type GamePreviewsArgs = {
  filter?: InputMaybe<Game_Previews_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type GameSocialsArgs = {
  filter?: InputMaybe<Social_Networks_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type GameTagsArgs = {
  filter?: InputMaybe<Game_Tags_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Game_Aggregated = {
  __typename?: 'game_aggregated';
  avg?: Maybe<Game_Aggregated_Fields>;
  avgDistinct?: Maybe<Game_Aggregated_Fields>;
  count?: Maybe<Game_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Game_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Game_Aggregated_Fields>;
  min?: Maybe<Game_Aggregated_Fields>;
  sum?: Maybe<Game_Aggregated_Fields>;
  sumDistinct?: Maybe<Game_Aggregated_Fields>;
};

export type Game_Aggregated_Count = {
  __typename?: 'game_aggregated_count';
  create_at?: Maybe<Scalars['Int']>;
  creator?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['Int']>;
  dev_finished?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  previews?: Maybe<Scalars['Int']>;
  published_at?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['Int']>;
  socials?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  tags?: Maybe<Scalars['Int']>;
  update_at?: Maybe<Scalars['Int']>;
};

export type Game_Aggregated_Fields = {
  __typename?: 'game_aggregated_fields';
  creator?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
};

export type Game_Creator = {
  __typename?: 'game_creator';
  games?: Maybe<Array<Maybe<Game>>>;
  games_func?: Maybe<Count_Functions>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};


export type Game_CreatorGamesArgs = {
  filter?: InputMaybe<Game_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Game_Creator_Aggregated = {
  __typename?: 'game_creator_aggregated';
  avg?: Maybe<Game_Creator_Aggregated_Fields>;
  avgDistinct?: Maybe<Game_Creator_Aggregated_Fields>;
  count?: Maybe<Game_Creator_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Game_Creator_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Game_Creator_Aggregated_Fields>;
  min?: Maybe<Game_Creator_Aggregated_Fields>;
  sum?: Maybe<Game_Creator_Aggregated_Fields>;
  sumDistinct?: Maybe<Game_Creator_Aggregated_Fields>;
};

export type Game_Creator_Aggregated_Count = {
  __typename?: 'game_creator_aggregated_count';
  games?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['Int']>;
};

export type Game_Creator_Aggregated_Fields = {
  __typename?: 'game_creator_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Game_Creator_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Game_Creator_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Game_Creator_Filter>>>;
  games?: InputMaybe<Game_Filter>;
  games_func?: InputMaybe<Count_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  slug?: InputMaybe<String_Filter_Operators>;
};

export type Game_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Game_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Game_Filter>>>;
  create_at?: InputMaybe<Date_Filter_Operators>;
  create_at_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  creator?: InputMaybe<Game_Creator_Filter>;
  description?: InputMaybe<String_Filter_Operators>;
  dev_finished?: InputMaybe<Boolean_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  previews?: InputMaybe<Game_Previews_Filter>;
  previews_func?: InputMaybe<Count_Function_Filter_Operators>;
  published_at?: InputMaybe<Date_Filter_Operators>;
  published_at_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  rating?: InputMaybe<Number_Filter_Operators>;
  slug?: InputMaybe<String_Filter_Operators>;
  socials?: InputMaybe<Social_Networks_Filter>;
  socials_func?: InputMaybe<Count_Function_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<Game_Tags_Filter>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  update_at?: InputMaybe<Date_Filter_Operators>;
  update_at_func?: InputMaybe<Datetime_Function_Filter_Operators>;
};

export type Game_Previews = {
  __typename?: 'game_previews';
  game_id?: Maybe<Game>;
  id: Scalars['ID'];
  is_nsfw: Scalars['Boolean'];
  position: Scalars['Int'];
  preview?: Maybe<Directus_Files>;
};


export type Game_PreviewsGame_IdArgs = {
  filter?: InputMaybe<Game_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Game_PreviewsPreviewArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Game_Previews_Aggregated = {
  __typename?: 'game_previews_aggregated';
  avg?: Maybe<Game_Previews_Aggregated_Fields>;
  avgDistinct?: Maybe<Game_Previews_Aggregated_Fields>;
  count?: Maybe<Game_Previews_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Game_Previews_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Game_Previews_Aggregated_Fields>;
  min?: Maybe<Game_Previews_Aggregated_Fields>;
  sum?: Maybe<Game_Previews_Aggregated_Fields>;
  sumDistinct?: Maybe<Game_Previews_Aggregated_Fields>;
};

export type Game_Previews_Aggregated_Count = {
  __typename?: 'game_previews_aggregated_count';
  game_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  is_nsfw?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Int']>;
};

export type Game_Previews_Aggregated_Fields = {
  __typename?: 'game_previews_aggregated_fields';
  game_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
};

export type Game_Previews_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Game_Previews_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Game_Previews_Filter>>>;
  game_id?: InputMaybe<Game_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  is_nsfw?: InputMaybe<Boolean_Filter_Operators>;
  position?: InputMaybe<Number_Filter_Operators>;
  preview?: InputMaybe<Directus_Files_Filter>;
};

export type Game_Tags = {
  __typename?: 'game_tags';
  game_id?: Maybe<Game>;
  id: Scalars['ID'];
  tags_id?: Maybe<Tags>;
};


export type Game_TagsGame_IdArgs = {
  filter?: InputMaybe<Game_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Game_TagsTags_IdArgs = {
  filter?: InputMaybe<Tags_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Game_Tags_Aggregated = {
  __typename?: 'game_tags_aggregated';
  avg?: Maybe<Game_Tags_Aggregated_Fields>;
  avgDistinct?: Maybe<Game_Tags_Aggregated_Fields>;
  count?: Maybe<Game_Tags_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Game_Tags_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Game_Tags_Aggregated_Fields>;
  min?: Maybe<Game_Tags_Aggregated_Fields>;
  sum?: Maybe<Game_Tags_Aggregated_Fields>;
  sumDistinct?: Maybe<Game_Tags_Aggregated_Fields>;
};

export type Game_Tags_Aggregated_Count = {
  __typename?: 'game_tags_aggregated_count';
  game_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  tags_id?: Maybe<Scalars['Int']>;
};

export type Game_Tags_Aggregated_Fields = {
  __typename?: 'game_tags_aggregated_fields';
  game_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  tags_id?: Maybe<Scalars['Float']>;
};

export type Game_Tags_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Game_Tags_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Game_Tags_Filter>>>;
  game_id?: InputMaybe<Game_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  tags_id?: InputMaybe<Tags_Filter>;
};

export enum Graphql_Sdl_Scope {
  Items = 'items',
  System = 'system'
}

export type Number_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _eq?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _gt?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _gte?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _lt?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _lte?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _neq?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

export type Server_Info = {
  __typename?: 'server_info';
  project?: Maybe<Server_Info_Project>;
};

export type Server_Info_Project = {
  __typename?: 'server_info_project';
  custom_css?: Maybe<Scalars['String']>;
  default_language?: Maybe<Scalars['String']>;
  project_color?: Maybe<Scalars['String']>;
  project_descriptor?: Maybe<Scalars['String']>;
  project_logo?: Maybe<Scalars['String']>;
  project_name?: Maybe<Scalars['String']>;
  public_background?: Maybe<Scalars['String']>;
  public_foreground?: Maybe<Scalars['String']>;
  public_note?: Maybe<Scalars['String']>;
};

export type Social_Networks = {
  __typename?: 'social_networks';
  game_id?: Maybe<Game>;
  id: Scalars['ID'];
  link: Scalars['String'];
  type: Scalars['String'];
};


export type Social_NetworksGame_IdArgs = {
  filter?: InputMaybe<Game_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Social_Networks_Aggregated = {
  __typename?: 'social_networks_aggregated';
  avg?: Maybe<Social_Networks_Aggregated_Fields>;
  avgDistinct?: Maybe<Social_Networks_Aggregated_Fields>;
  count?: Maybe<Social_Networks_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Social_Networks_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Social_Networks_Aggregated_Fields>;
  min?: Maybe<Social_Networks_Aggregated_Fields>;
  sum?: Maybe<Social_Networks_Aggregated_Fields>;
  sumDistinct?: Maybe<Social_Networks_Aggregated_Fields>;
};

export type Social_Networks_Aggregated_Count = {
  __typename?: 'social_networks_aggregated_count';
  game_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  link?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
};

export type Social_Networks_Aggregated_Fields = {
  __typename?: 'social_networks_aggregated_fields';
  game_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type Social_Networks_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Social_Networks_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Social_Networks_Filter>>>;
  game_id?: InputMaybe<Game_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  link?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
};

export type String_Filter_Operators = {
  _contains?: InputMaybe<Scalars['String']>;
  _empty?: InputMaybe<Scalars['Boolean']>;
  _ends_with?: InputMaybe<Scalars['String']>;
  _eq?: InputMaybe<Scalars['String']>;
  _icontains?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _ncontains?: InputMaybe<Scalars['String']>;
  _nempty?: InputMaybe<Scalars['Boolean']>;
  _nends_with?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _nstarts_with?: InputMaybe<Scalars['String']>;
  _null?: InputMaybe<Scalars['Boolean']>;
  _starts_with?: InputMaybe<Scalars['String']>;
};

export type Tags = {
  __typename?: 'tags';
  games?: Maybe<Array<Maybe<Game_Tags>>>;
  games_func?: Maybe<Count_Functions>;
  id: Scalars['ID'];
  name: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
};


export type TagsGamesArgs = {
  filter?: InputMaybe<Game_Tags_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Tags_Aggregated = {
  __typename?: 'tags_aggregated';
  avg?: Maybe<Tags_Aggregated_Fields>;
  avgDistinct?: Maybe<Tags_Aggregated_Fields>;
  count?: Maybe<Tags_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Tags_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Tags_Aggregated_Fields>;
  min?: Maybe<Tags_Aggregated_Fields>;
  sum?: Maybe<Tags_Aggregated_Fields>;
  sumDistinct?: Maybe<Tags_Aggregated_Fields>;
};

export type Tags_Aggregated_Count = {
  __typename?: 'tags_aggregated_count';
  games?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['Int']>;
};

export type Tags_Aggregated_Fields = {
  __typename?: 'tags_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Tags_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Tags_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Tags_Filter>>>;
  games?: InputMaybe<Game_Tags_Filter>;
  games_func?: InputMaybe<Count_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  slug?: InputMaybe<String_Filter_Operators>;
};

export type Users_Me_Tfa_Generate_Data = {
  __typename?: 'users_me_tfa_generate_data';
  otpauth_url?: Maybe<Scalars['String']>;
  secret?: Maybe<Scalars['String']>;
};

export type GameListQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  page?: InputMaybe<Scalars['Int']>;
}>;


export type GameListQuery = { __typename?: 'Query', game: Array<{ __typename?: 'game', id: string, name: string, slug: string, rating?: number | null, create_at?: any | null, update_at?: any | null, published_at?: any | null, creator?: { __typename?: 'game_creator', id: string, name?: string | null, slug?: string | null } | null, previews?: Array<{ __typename?: 'game_previews', id: string, is_nsfw: boolean, preview?: { __typename?: 'directus_files', id: string } | null } | null> | null }>, meta: Array<{ __typename?: 'game_aggregated', countDistinct?: { __typename?: 'game_aggregated_count', id?: number | null } | null }> };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', settings?: { __typename?: 'directus_settings', project_name?: string | null, project_descriptor?: string | null } | null };


export const GameListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GameList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"-1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"defaultValue":{"kind":"ListValue","values":[]}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"game"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"create_at"}},{"kind":"Field","name":{"kind":"Name","value":"update_at"}},{"kind":"Field","name":{"kind":"Name","value":"published_at"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"previews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"preview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_nsfw"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"meta"},"name":{"kind":"Name","value":"game_aggregated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countDistinct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GameListQuery, GameListQueryVariables>;
export const SettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project_name"}},{"kind":"Field","name":{"kind":"Name","value":"project_descriptor"}}]}}]}}]} as unknown as DocumentNode<SettingsQuery, SettingsQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** ISO8601 Date values */
  Date: any;
  /** BigInt value */
  GraphQLBigInt: any;
  /** A Float or a String */
  GraphQLStringOrFloat: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** Represents NULL values */
  Void: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  auth_login?: Maybe<Auth_Tokens>;
  auth_logout?: Maybe<Scalars['Boolean']>;
  auth_password_request?: Maybe<Scalars['Boolean']>;
  auth_password_reset?: Maybe<Scalars['Boolean']>;
  auth_refresh?: Maybe<Auth_Tokens>;
  users_invite_accept?: Maybe<Scalars['Boolean']>;
  users_me_tfa_disable?: Maybe<Scalars['Boolean']>;
  users_me_tfa_enable?: Maybe<Scalars['Boolean']>;
  users_me_tfa_generate?: Maybe<Users_Me_Tfa_Generate_Data>;
  utils_cache_clear?: Maybe<Scalars['Void']>;
  utils_hash_generate?: Maybe<Scalars['String']>;
  utils_hash_verify?: Maybe<Scalars['Boolean']>;
  utils_random_string?: Maybe<Scalars['String']>;
  utils_revert?: Maybe<Scalars['Boolean']>;
  utils_sort?: Maybe<Scalars['Boolean']>;
};


export type MutationAuth_LoginArgs = {
  email: Scalars['String'];
  mode?: InputMaybe<Auth_Mode>;
  otp?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};


export type MutationAuth_LogoutArgs = {
  refresh_token?: InputMaybe<Scalars['String']>;
};


export type MutationAuth_Password_RequestArgs = {
  email: Scalars['String'];
  reset_url?: InputMaybe<Scalars['String']>;
};


export type MutationAuth_Password_ResetArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationAuth_RefreshArgs = {
  mode?: InputMaybe<Auth_Mode>;
  refresh_token?: InputMaybe<Scalars['String']>;
};


export type MutationUsers_Invite_AcceptArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUsers_Me_Tfa_DisableArgs = {
  otp: Scalars['String'];
};


export type MutationUsers_Me_Tfa_EnableArgs = {
  otp: Scalars['String'];
  secret: Scalars['String'];
};


export type MutationUsers_Me_Tfa_GenerateArgs = {
  password: Scalars['String'];
};


export type MutationUtils_Hash_GenerateArgs = {
  string: Scalars['String'];
};


export type MutationUtils_Hash_VerifyArgs = {
  hash: Scalars['String'];
  string: Scalars['String'];
};


export type MutationUtils_Random_StringArgs = {
  length?: InputMaybe<Scalars['Int']>;
};


export type MutationUtils_RevertArgs = {
  revision: Scalars['ID'];
};


export type MutationUtils_SortArgs = {
  collection: Scalars['String'];
  item: Scalars['ID'];
  to: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  extensions?: Maybe<Extensions>;
  files: Array<Directus_Files>;
  files_aggregated: Array<Directus_Files_Aggregated>;
  files_by_id?: Maybe<Directus_Files>;
  game: Array<Game>;
  game_aggregated: Array<Game_Aggregated>;
  game_by_id?: Maybe<Game>;
  game_creator: Array<Game_Creator>;
  game_creator_aggregated: Array<Game_Creator_Aggregated>;
  game_creator_by_id?: Maybe<Game_Creator>;
  game_previews: Array<Game_Previews>;
  game_previews_aggregated: Array<Game_Previews_Aggregated>;
  game_previews_by_id?: Maybe<Game_Previews>;
  game_tags: Array<Game_Tags>;
  game_tags_aggregated: Array<Game_Tags_Aggregated>;
  game_tags_by_id?: Maybe<Game_Tags>;
  server_health?: Maybe<Scalars['JSON']>;
  server_info?: Maybe<Server_Info>;
  server_ping?: Maybe<Scalars['String']>;
  server_specs_graphql?: Maybe<Scalars['String']>;
  server_specs_oas?: Maybe<Scalars['JSON']>;
  settings?: Maybe<Directus_Settings>;
  social_networks: Array<Social_Networks>;
  social_networks_aggregated: Array<Social_Networks_Aggregated>;
  social_networks_by_id?: Maybe<Social_Networks>;
  tags: Array<Tags>;
  tags_aggregated: Array<Tags_Aggregated>;
  tags_by_id?: Maybe<Tags>;
};


export type QueryFilesArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryFiles_AggregatedArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryFiles_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryGameArgs = {
  filter?: InputMaybe<Game_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGame_AggregatedArgs = {
  filter?: InputMaybe<Game_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGame_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryGame_CreatorArgs = {
  filter?: InputMaybe<Game_Creator_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGame_Creator_AggregatedArgs = {
  filter?: InputMaybe<Game_Creator_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGame_Creator_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryGame_PreviewsArgs = {
  filter?: InputMaybe<Game_Previews_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGame_Previews_AggregatedArgs = {
  filter?: InputMaybe<Game_Previews_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGame_Previews_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryGame_TagsArgs = {
  filter?: InputMaybe<Game_Tags_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGame_Tags_AggregatedArgs = {
  filter?: InputMaybe<Game_Tags_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGame_Tags_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryServer_Specs_GraphqlArgs = {
  scope?: InputMaybe<Graphql_Sdl_Scope>;
};


export type QuerySocial_NetworksArgs = {
  filter?: InputMaybe<Social_Networks_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuerySocial_Networks_AggregatedArgs = {
  filter?: InputMaybe<Social_Networks_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuerySocial_Networks_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryTagsArgs = {
  filter?: InputMaybe<Tags_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryTags_AggregatedArgs = {
  filter?: InputMaybe<Tags_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryTags_By_IdArgs = {
  id: Scalars['ID'];
};

export enum Auth_Mode {
  Cookie = 'cookie',
  Json = 'json'
}

export type Auth_Tokens = {
  __typename?: 'auth_tokens';
  access_token?: Maybe<Scalars['String']>;
  expires?: Maybe<Scalars['GraphQLBigInt']>;
  refresh_token?: Maybe<Scalars['String']>;
};

export type Boolean_Filter_Operators = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

export type Count_Function_Filter_Operators = {
  count?: InputMaybe<Number_Filter_Operators>;
};

export type Count_Functions = {
  __typename?: 'count_functions';
  count?: Maybe<Scalars['Int']>;
};

export type Date_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _neq?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

export type Datetime_Function_Filter_Operators = {
  day?: InputMaybe<Number_Filter_Operators>;
  hour?: InputMaybe<Number_Filter_Operators>;
  minute?: InputMaybe<Number_Filter_Operators>;
  month?: InputMaybe<Number_Filter_Operators>;
  second?: InputMaybe<Number_Filter_Operators>;
  week?: InputMaybe<Number_Filter_Operators>;
  weekday?: InputMaybe<Number_Filter_Operators>;
  year?: InputMaybe<Number_Filter_Operators>;
};

export type Datetime_Functions = {
  __typename?: 'datetime_functions';
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  week?: Maybe<Scalars['Int']>;
  weekday?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type Directus_Files = {
  __typename?: 'directus_files';
  charset?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  embed?: Maybe<Scalars['String']>;
  filename_disk?: Maybe<Scalars['String']>;
  filename_download: Scalars['String'];
  filesize?: Maybe<Scalars['GraphQLBigInt']>;
  folder?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  metadata_func?: Maybe<Count_Functions>;
  modified_by?: Maybe<Scalars['String']>;
  modified_on?: Maybe<Scalars['Date']>;
  modified_on_func?: Maybe<Datetime_Functions>;
  storage: Scalars['String'];
  tags?: Maybe<Scalars['JSON']>;
  tags_func?: Maybe<Count_Functions>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  uploaded_by?: Maybe<Scalars['String']>;
  uploaded_on?: Maybe<Scalars['Date']>;
  uploaded_on_func?: Maybe<Datetime_Functions>;
  width?: Maybe<Scalars['Int']>;
};

export type Directus_Files_Aggregated = {
  __typename?: 'directus_files_aggregated';
  avg?: Maybe<Directus_Files_Aggregated_Fields>;
  avgDistinct?: Maybe<Directus_Files_Aggregated_Fields>;
  count?: Maybe<Directus_Files_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Directus_Files_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Directus_Files_Aggregated_Fields>;
  min?: Maybe<Directus_Files_Aggregated_Fields>;
  sum?: Maybe<Directus_Files_Aggregated_Fields>;
  sumDistinct?: Maybe<Directus_Files_Aggregated_Fields>;
};

export type Directus_Files_Aggregated_Count = {
  __typename?: 'directus_files_aggregated_count';
  charset?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Int']>;
  embed?: Maybe<Scalars['Int']>;
  filename_disk?: Maybe<Scalars['Int']>;
  filename_download?: Maybe<Scalars['Int']>;
  filesize?: Maybe<Scalars['Int']>;
  folder?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  location?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['Int']>;
  modified_by?: Maybe<Scalars['Int']>;
  modified_on?: Maybe<Scalars['Int']>;
  storage?: Maybe<Scalars['Int']>;
  tags?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
  uploaded_by?: Maybe<Scalars['Int']>;
  uploaded_on?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

export type Directus_Files_Aggregated_Fields = {
  __typename?: 'directus_files_aggregated_fields';
  duration?: Maybe<Scalars['Float']>;
  filesize?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type Directus_Files_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  charset?: InputMaybe<String_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  duration?: InputMaybe<Number_Filter_Operators>;
  embed?: InputMaybe<String_Filter_Operators>;
  filename_disk?: InputMaybe<String_Filter_Operators>;
  filename_download?: InputMaybe<String_Filter_Operators>;
  filesize?: InputMaybe<Number_Filter_Operators>;
  folder?: InputMaybe<String_Filter_Operators>;
  height?: InputMaybe<Number_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  metadata?: InputMaybe<String_Filter_Operators>;
  metadata_func?: InputMaybe<Count_Function_Filter_Operators>;
  modified_by?: InputMaybe<String_Filter_Operators>;
  modified_on?: InputMaybe<Date_Filter_Operators>;
  modified_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  storage?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  uploaded_by?: InputMaybe<String_Filter_Operators>;
  uploaded_on?: InputMaybe<Date_Filter_Operators>;
  uploaded_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  width?: InputMaybe<Number_Filter_Operators>;
};

export type Directus_Settings = {
  __typename?: 'directus_settings';
  id: Scalars['ID'];
  project_descriptor?: Maybe<Scalars['String']>;
  project_name?: Maybe<Scalars['String']>;
  project_url?: Maybe<Scalars['String']>;
};

export type Extensions = {
  __typename?: 'extensions';
  displays?: Maybe<Array<Maybe<Scalars['String']>>>;
  interfaces?: Maybe<Array<Maybe<Scalars['String']>>>;
  layouts?: Maybe<Array<Maybe<Scalars['String']>>>;
  modules?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Game = {
  __typename?: 'game';
  create_at?: Maybe<Scalars['Date']>;
  create_at_func?: Maybe<Datetime_Functions>;
  creator?: Maybe<Game_Creator>;
  description?: Maybe<Scalars['String']>;
  dev_finished?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  previews?: Maybe<Array<Maybe<Game_Previews>>>;
  previews_func?: Maybe<Count_Functions>;
  published_at?: Maybe<Scalars['Date']>;
  published_at_func?: Maybe<Datetime_Functions>;
  rating?: Maybe<Scalars['Int']>;
  slug: Scalars['String'];
  socials?: Maybe<Array<Maybe<Social_Networks>>>;
  socials_func?: Maybe<Count_Functions>;
  status?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Game_Tags>>>;
  tags_func?: Maybe<Count_Functions>;
  update_at?: Maybe<Scalars['Date']>;
  update_at_func?: Maybe<Datetime_Functions>;
};


export type GameCreatorArgs = {
  filter?: InputMaybe<Game_Creator_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type GamePreviewsArgs = {
  filter?: InputMaybe<Game_Previews_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type GameSocialsArgs = {
  filter?: InputMaybe<Social_Networks_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type GameTagsArgs = {
  filter?: InputMaybe<Game_Tags_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Game_Aggregated = {
  __typename?: 'game_aggregated';
  avg?: Maybe<Game_Aggregated_Fields>;
  avgDistinct?: Maybe<Game_Aggregated_Fields>;
  count?: Maybe<Game_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Game_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Game_Aggregated_Fields>;
  min?: Maybe<Game_Aggregated_Fields>;
  sum?: Maybe<Game_Aggregated_Fields>;
  sumDistinct?: Maybe<Game_Aggregated_Fields>;
};

export type Game_Aggregated_Count = {
  __typename?: 'game_aggregated_count';
  create_at?: Maybe<Scalars['Int']>;
  creator?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['Int']>;
  dev_finished?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  previews?: Maybe<Scalars['Int']>;
  published_at?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['Int']>;
  socials?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  tags?: Maybe<Scalars['Int']>;
  update_at?: Maybe<Scalars['Int']>;
};

export type Game_Aggregated_Fields = {
  __typename?: 'game_aggregated_fields';
  creator?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
};

export type Game_Creator = {
  __typename?: 'game_creator';
  games?: Maybe<Array<Maybe<Game>>>;
  games_func?: Maybe<Count_Functions>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};


export type Game_CreatorGamesArgs = {
  filter?: InputMaybe<Game_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Game_Creator_Aggregated = {
  __typename?: 'game_creator_aggregated';
  avg?: Maybe<Game_Creator_Aggregated_Fields>;
  avgDistinct?: Maybe<Game_Creator_Aggregated_Fields>;
  count?: Maybe<Game_Creator_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Game_Creator_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Game_Creator_Aggregated_Fields>;
  min?: Maybe<Game_Creator_Aggregated_Fields>;
  sum?: Maybe<Game_Creator_Aggregated_Fields>;
  sumDistinct?: Maybe<Game_Creator_Aggregated_Fields>;
};

export type Game_Creator_Aggregated_Count = {
  __typename?: 'game_creator_aggregated_count';
  games?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['Int']>;
};

export type Game_Creator_Aggregated_Fields = {
  __typename?: 'game_creator_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Game_Creator_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Game_Creator_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Game_Creator_Filter>>>;
  games?: InputMaybe<Game_Filter>;
  games_func?: InputMaybe<Count_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  slug?: InputMaybe<String_Filter_Operators>;
};

export type Game_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Game_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Game_Filter>>>;
  create_at?: InputMaybe<Date_Filter_Operators>;
  create_at_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  creator?: InputMaybe<Game_Creator_Filter>;
  description?: InputMaybe<String_Filter_Operators>;
  dev_finished?: InputMaybe<Boolean_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  previews?: InputMaybe<Game_Previews_Filter>;
  previews_func?: InputMaybe<Count_Function_Filter_Operators>;
  published_at?: InputMaybe<Date_Filter_Operators>;
  published_at_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  rating?: InputMaybe<Number_Filter_Operators>;
  slug?: InputMaybe<String_Filter_Operators>;
  socials?: InputMaybe<Social_Networks_Filter>;
  socials_func?: InputMaybe<Count_Function_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<Game_Tags_Filter>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  update_at?: InputMaybe<Date_Filter_Operators>;
  update_at_func?: InputMaybe<Datetime_Function_Filter_Operators>;
};

export type Game_Previews = {
  __typename?: 'game_previews';
  game_id?: Maybe<Game>;
  id: Scalars['ID'];
  is_nsfw: Scalars['Boolean'];
  position: Scalars['Int'];
  preview?: Maybe<Directus_Files>;
};


export type Game_PreviewsGame_IdArgs = {
  filter?: InputMaybe<Game_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Game_PreviewsPreviewArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Game_Previews_Aggregated = {
  __typename?: 'game_previews_aggregated';
  avg?: Maybe<Game_Previews_Aggregated_Fields>;
  avgDistinct?: Maybe<Game_Previews_Aggregated_Fields>;
  count?: Maybe<Game_Previews_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Game_Previews_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Game_Previews_Aggregated_Fields>;
  min?: Maybe<Game_Previews_Aggregated_Fields>;
  sum?: Maybe<Game_Previews_Aggregated_Fields>;
  sumDistinct?: Maybe<Game_Previews_Aggregated_Fields>;
};

export type Game_Previews_Aggregated_Count = {
  __typename?: 'game_previews_aggregated_count';
  game_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  is_nsfw?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Int']>;
};

export type Game_Previews_Aggregated_Fields = {
  __typename?: 'game_previews_aggregated_fields';
  game_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
};

export type Game_Previews_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Game_Previews_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Game_Previews_Filter>>>;
  game_id?: InputMaybe<Game_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  is_nsfw?: InputMaybe<Boolean_Filter_Operators>;
  position?: InputMaybe<Number_Filter_Operators>;
  preview?: InputMaybe<Directus_Files_Filter>;
};

export type Game_Tags = {
  __typename?: 'game_tags';
  game_id?: Maybe<Game>;
  id: Scalars['ID'];
  tags_id?: Maybe<Tags>;
};


export type Game_TagsGame_IdArgs = {
  filter?: InputMaybe<Game_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Game_TagsTags_IdArgs = {
  filter?: InputMaybe<Tags_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Game_Tags_Aggregated = {
  __typename?: 'game_tags_aggregated';
  avg?: Maybe<Game_Tags_Aggregated_Fields>;
  avgDistinct?: Maybe<Game_Tags_Aggregated_Fields>;
  count?: Maybe<Game_Tags_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Game_Tags_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Game_Tags_Aggregated_Fields>;
  min?: Maybe<Game_Tags_Aggregated_Fields>;
  sum?: Maybe<Game_Tags_Aggregated_Fields>;
  sumDistinct?: Maybe<Game_Tags_Aggregated_Fields>;
};

export type Game_Tags_Aggregated_Count = {
  __typename?: 'game_tags_aggregated_count';
  game_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  tags_id?: Maybe<Scalars['Int']>;
};

export type Game_Tags_Aggregated_Fields = {
  __typename?: 'game_tags_aggregated_fields';
  game_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  tags_id?: Maybe<Scalars['Float']>;
};

export type Game_Tags_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Game_Tags_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Game_Tags_Filter>>>;
  game_id?: InputMaybe<Game_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  tags_id?: InputMaybe<Tags_Filter>;
};

export enum Graphql_Sdl_Scope {
  Items = 'items',
  System = 'system'
}

export type Number_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _eq?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _gt?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _gte?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _lt?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _lte?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _neq?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

export type Server_Info = {
  __typename?: 'server_info';
  project?: Maybe<Server_Info_Project>;
};

export type Server_Info_Project = {
  __typename?: 'server_info_project';
  custom_css?: Maybe<Scalars['String']>;
  default_language?: Maybe<Scalars['String']>;
  project_color?: Maybe<Scalars['String']>;
  project_descriptor?: Maybe<Scalars['String']>;
  project_logo?: Maybe<Scalars['String']>;
  project_name?: Maybe<Scalars['String']>;
  public_background?: Maybe<Scalars['String']>;
  public_foreground?: Maybe<Scalars['String']>;
  public_note?: Maybe<Scalars['String']>;
};

export type Social_Networks = {
  __typename?: 'social_networks';
  game_id?: Maybe<Game>;
  id: Scalars['ID'];
  link: Scalars['String'];
  type: Scalars['String'];
};


export type Social_NetworksGame_IdArgs = {
  filter?: InputMaybe<Game_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Social_Networks_Aggregated = {
  __typename?: 'social_networks_aggregated';
  avg?: Maybe<Social_Networks_Aggregated_Fields>;
  avgDistinct?: Maybe<Social_Networks_Aggregated_Fields>;
  count?: Maybe<Social_Networks_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Social_Networks_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Social_Networks_Aggregated_Fields>;
  min?: Maybe<Social_Networks_Aggregated_Fields>;
  sum?: Maybe<Social_Networks_Aggregated_Fields>;
  sumDistinct?: Maybe<Social_Networks_Aggregated_Fields>;
};

export type Social_Networks_Aggregated_Count = {
  __typename?: 'social_networks_aggregated_count';
  game_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  link?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
};

export type Social_Networks_Aggregated_Fields = {
  __typename?: 'social_networks_aggregated_fields';
  game_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type Social_Networks_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Social_Networks_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Social_Networks_Filter>>>;
  game_id?: InputMaybe<Game_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  link?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
};

export type String_Filter_Operators = {
  _contains?: InputMaybe<Scalars['String']>;
  _empty?: InputMaybe<Scalars['Boolean']>;
  _ends_with?: InputMaybe<Scalars['String']>;
  _eq?: InputMaybe<Scalars['String']>;
  _icontains?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _ncontains?: InputMaybe<Scalars['String']>;
  _nempty?: InputMaybe<Scalars['Boolean']>;
  _nends_with?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _nstarts_with?: InputMaybe<Scalars['String']>;
  _null?: InputMaybe<Scalars['Boolean']>;
  _starts_with?: InputMaybe<Scalars['String']>;
};

export type Tags = {
  __typename?: 'tags';
  games?: Maybe<Array<Maybe<Game_Tags>>>;
  games_func?: Maybe<Count_Functions>;
  id: Scalars['ID'];
  name: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
};


export type TagsGamesArgs = {
  filter?: InputMaybe<Game_Tags_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Tags_Aggregated = {
  __typename?: 'tags_aggregated';
  avg?: Maybe<Tags_Aggregated_Fields>;
  avgDistinct?: Maybe<Tags_Aggregated_Fields>;
  count?: Maybe<Tags_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Tags_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Tags_Aggregated_Fields>;
  min?: Maybe<Tags_Aggregated_Fields>;
  sum?: Maybe<Tags_Aggregated_Fields>;
  sumDistinct?: Maybe<Tags_Aggregated_Fields>;
};

export type Tags_Aggregated_Count = {
  __typename?: 'tags_aggregated_count';
  games?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['Int']>;
};

export type Tags_Aggregated_Fields = {
  __typename?: 'tags_aggregated_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Tags_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Tags_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Tags_Filter>>>;
  games?: InputMaybe<Game_Tags_Filter>;
  games_func?: InputMaybe<Count_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  slug?: InputMaybe<String_Filter_Operators>;
};

export type Users_Me_Tfa_Generate_Data = {
  __typename?: 'users_me_tfa_generate_data';
  otpauth_url?: Maybe<Scalars['String']>;
  secret?: Maybe<Scalars['String']>;
};

export type GameListQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  page?: InputMaybe<Scalars['Int']>;
}>;


export type GameListQuery = { __typename?: 'Query', game: Array<{ __typename?: 'game', id: string, name: string, slug: string, rating?: number | null, create_at?: any | null, update_at?: any | null, published_at?: any | null, creator?: { __typename?: 'game_creator', id: string, name?: string | null, slug?: string | null } | null, previews?: Array<{ __typename?: 'game_previews', id: string, is_nsfw: boolean, preview?: { __typename?: 'directus_files', id: string } | null } | null> | null }>, meta: Array<{ __typename?: 'game_aggregated', countDistinct?: { __typename?: 'game_aggregated_count', id?: number | null } | null }> };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', settings?: { __typename?: 'directus_settings', project_name?: string | null, project_descriptor?: string | null } | null };


export const GameListDocument = `
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
      preview {
        id
      }
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
export const useGameListQuery = <
      TData = GameListQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GameListQueryVariables,
      options?: UseQueryOptions<GameListQuery, TError, TData>
    ) =>
    useQuery<GameListQuery, TError, TData>(
      variables === undefined ? ['GameList'] : ['GameList', variables],
      fetcher<GameListQuery, GameListQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GameListDocument, variables),
      options
    );
export const SettingsDocument = `
    query Settings {
  settings {
    project_name
    project_descriptor
  }
}
    `;
export const useSettingsQuery = <
      TData = SettingsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: SettingsQueryVariables,
      options?: UseQueryOptions<SettingsQuery, TError, TData>
    ) =>
    useQuery<SettingsQuery, TError, TData>(
      variables === undefined ? ['Settings'] : ['Settings', variables],
      fetcher<SettingsQuery, SettingsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, SettingsDocument, variables),
      options
    );