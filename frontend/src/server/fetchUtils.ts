export class HTTPResponseError extends Error {
  public constructor(private response: Response) {
    super(`HTTP Error Response: ${response.status} ${response.statusText}`);
  }
}

export const checkStatus = (response: Response): Response => {
  if (response.ok) {
    // response.status >= 200 && response.status < 300
    return response;
  } else {
    throw new HTTPResponseError(response);
  }
};

export function isHttpResponseError(error: any): error is HTTPResponseError {
  return error !== null && error.name === 'HTTPResponseError';
}
