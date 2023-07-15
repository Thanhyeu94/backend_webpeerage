export const responseSuccess = (data: any = null, message = 'success') => {
    return {
      status: 200,
      message: message,
      data,
    };
  };
  
  export const responseErrorInternal = (message = 'internal server error') => {
    return {
      status: 500,
      message: message,
      data: null,
    };
  };
  
  export const responseNotFound = (message = 'not Found') => {
    return {
      status: 404,
      message: message,
      data: null,
    };
  };
  
  export const responseBadRequest = (message = 'bad request') => {
    return {
      status: 400,
      message: message,
      data: null,
    };
  };
  
  export const responseFobidden = (message = 'forbidden') => {
    return {
      status: 403,
      message: message,
      data: null,
    };
  };
  
  export const responseUnauthorized = (message = 'unauthorized') => {
    return {
      status: 401,
      message: message,
      data: null,
    };
  };