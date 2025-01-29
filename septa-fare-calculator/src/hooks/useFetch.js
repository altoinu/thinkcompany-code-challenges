"use client";

import HTTPError from "../types/HTTPError";
import { useCallback, useState } from "react";

export const FetchStatus = {
  Idle: 0,
  Pending: 1,
  Succeeded: 2,
  Failed: 3,
};

/**
 * Custom hook that wraps `fetch` and handles all request & response handling.
 *
 * @param options Default request object data.
 * @returns An object containing:
 *   - `fetch`: The method that will perform the request & return a Promise.
 *   - `data`: The response body object of the most recent request.
 *   - `fetchStatus: Current FetchStatus
 *   - `isFetching`: Boolean; true when the network request is active.
 *   - `response`: The HTTP Response object.
 */
export default function useFetch({ headers, method = "GET", url }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [isFetching, setIsFetching] = useState(false);
  const [response, setResponse] = useState();

  const executeFetch = useCallback(async () => {
    // Set initial values before fetch
    setData(undefined);
    setError(null);
    setFetchStatus(FetchStatus.Pending);
    setIsFetching(true);
    setResponse(null);

    const request = new Request(url, {
      headers,
      method,
    });

    try {
      // fetch data
      const response = await fetch(request);

      // throw error if not success
      if (!response.ok) {
        throw new HTTPError(method, url, response.status, response);
      }

      // parse json
      const responseData = await response.json();

      // set results in states
      setData(responseData);
      setError(null);
      setFetchStatus(FetchStatus.Succeeded);
      setIsFetching(false);
      setResponse(response);
    } catch (error) {
      // set error in states
      setData(null);
      setError(error);
      setFetchStatus(FetchStatus.Failed);
      setIsFetching(false);

      if (error instanceof Error) {
        if (error instanceof HTTPError) {
          console.error(error);
          setResponse(error.response);
        } else {
          console.error(`${method} ${url}: ${error.message}`);
          setResponse(null);
        }
      }
    }
  }, [headers, method, url]);

  return {
    fetch: executeFetch,
    data,
    fetchStatus,
    isFetching,
    response,
    error,
  };
}
