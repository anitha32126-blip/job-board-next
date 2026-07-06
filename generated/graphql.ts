/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ApplyInput = {
  coverLetter: Scalars['String']['input'];
  email: Scalars['String']['input'];
  jobId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type ApplyResponse = {
  __typename?: 'ApplyResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Job = {
  __typename?: 'Job';
  company: Company;
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  salaryMax: Scalars['Int']['output'];
  salaryMin: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type JobFilter = {
  location?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  applyToJob: ApplyResponse;
};


export type MutationApplyToJobArgs = {
  input: ApplyInput;
};

export type Query = {
  __typename?: 'Query';
  job?: Maybe<Job>;
  jobs: Array<Job>;
};


export type QueryJobArgs = {
  id: Scalars['ID']['input'];
};


export type QueryJobsArgs = {
  filter?: InputMaybe<JobFilter>;
};

export type ApplyInput = {
  coverLetter: string;
  email: string;
  jobId: string | number;
  name: string;
};

export type ApplyToJobMutationVariables = Exact<{
  input: ApplyInput;
}>;


export type ApplyToJobMutation = { applyToJob: { success: boolean, message: string } };

export type GetJobQueryVariables = Exact<{
  id: string | number;
}>;


export type GetJobQuery = { job: { id: string, title: string, salaryMin: number, salaryMax: number, status: string, type: string, location: string, company: { id: string, name: string, location: string } } | null };

export type GetJobsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetJobsQuery = { jobs: Array<{ id: string, title: string, salaryMin: number, salaryMax: number, status: string, type: string, location: string, company: { id: string, name: string, location: string } }> };


export const ApplyToJobDocument = gql`
    mutation ApplyToJob($input: ApplyInput!) {
  applyToJob(input: $input) {
    success
    message
  }
}
    `;
export type ApplyToJobMutationFn = Apollo.MutationFunction<ApplyToJobMutation, ApplyToJobMutationVariables>;

/**
 * __useApplyToJobMutation__
 *
 * To run a mutation, you first call `useApplyToJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyToJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyToJobMutation, { data, loading, error }] = useApplyToJobMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApplyToJobMutation(baseOptions?: Apollo.MutationHookOptions<ApplyToJobMutation, ApplyToJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApplyToJobMutation, ApplyToJobMutationVariables>(ApplyToJobDocument, options);
      }
export type ApplyToJobMutationHookResult = ReturnType<typeof useApplyToJobMutation>;
export type ApplyToJobMutationResult = Apollo.MutationResult<ApplyToJobMutation>;
export type ApplyToJobMutationOptions = Apollo.BaseMutationOptions<ApplyToJobMutation, ApplyToJobMutationVariables>;
export const GetJobDocument = gql`
    query GetJob($id: ID!) {
  job(id: $id) {
    id
    title
    salaryMin
    salaryMax
    status
    type
    location
    company {
      id
      name
      location
    }
  }
}
    `;

/**
 * __useGetJobQuery__
 *
 * To run a query within a React component, call `useGetJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetJobQuery(baseOptions: Apollo.QueryHookOptions<GetJobQuery, GetJobQueryVariables> & ({ variables: GetJobQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJobQuery, GetJobQueryVariables>(GetJobDocument, options);
      }
export function useGetJobLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJobQuery, GetJobQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJobQuery, GetJobQueryVariables>(GetJobDocument, options);
        }
// @ts-expect-error Generated Apollo types
export function useGetJobSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetJobQuery, GetJobQueryVariables>): Apollo.UseSuspenseQueryResult<GetJobQuery, GetJobQueryVariables>;
export function useGetJobSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetJobQuery, GetJobQueryVariables>): Apollo.UseSuspenseQueryResult<GetJobQuery | undefined, GetJobQueryVariables>;
export function useGetJobSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetJobQuery, GetJobQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetJobQuery, GetJobQueryVariables>(GetJobDocument, options);
        }
export type GetJobQueryHookResult = ReturnType<typeof useGetJobQuery>;
export type GetJobLazyQueryHookResult = ReturnType<typeof useGetJobLazyQuery>;
export type GetJobSuspenseQueryHookResult = ReturnType<typeof useGetJobSuspenseQuery>;
export type GetJobQueryResult = Apollo.QueryResult<GetJobQuery, GetJobQueryVariables>;
export const GetJobsDocument = gql`
    query GetJobs {
  jobs {
    id
    title
    salaryMin
    salaryMax
    status
    type
    location
    company {
      id
      name
      location
    }
  }
}
    `;

/**
 * __useGetJobsQuery__
 *
 * To run a query within a React component, call `useGetJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetJobsQuery(baseOptions?: Apollo.QueryHookOptions<GetJobsQuery, GetJobsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJobsQuery, GetJobsQueryVariables>(GetJobsDocument, options);
      }
export function useGetJobsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJobsQuery, GetJobsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJobsQuery, GetJobsQueryVariables>(GetJobsDocument, options);
        }
// @ts-expect-error Generated Apollo types
export function useGetJobsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetJobsQuery, GetJobsQueryVariables>): Apollo.UseSuspenseQueryResult<GetJobsQuery, GetJobsQueryVariables>;
export function useGetJobsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetJobsQuery, GetJobsQueryVariables>): Apollo.UseSuspenseQueryResult<GetJobsQuery | undefined, GetJobsQueryVariables>;
export function useGetJobsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetJobsQuery, GetJobsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetJobsQuery, GetJobsQueryVariables>(GetJobsDocument, options);
        }
export type GetJobsQueryHookResult = ReturnType<typeof useGetJobsQuery>;
export type GetJobsLazyQueryHookResult = ReturnType<typeof useGetJobsLazyQuery>;
export type GetJobsSuspenseQueryHookResult = ReturnType<typeof useGetJobsSuspenseQuery>;
export type GetJobsQueryResult = Apollo.QueryResult<GetJobsQuery, GetJobsQueryVariables>;