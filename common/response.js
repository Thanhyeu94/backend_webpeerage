"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseUnauthorized = exports.responseFobidden = exports.responseBadRequest = exports.responseNotFound = exports.responseErrorInternal = exports.responseSuccess = void 0;
const responseSuccess = (data = null, message = 'success') => {
    return {
        status: 200,
        message: message,
        data,
    };
};
exports.responseSuccess = responseSuccess;
const responseErrorInternal = (message = 'internal server error') => {
    return {
        status: 500,
        message: message,
        data: null,
    };
};
exports.responseErrorInternal = responseErrorInternal;
const responseNotFound = (message = 'not Found') => {
    return {
        status: 404,
        message: message,
        data: null,
    };
};
exports.responseNotFound = responseNotFound;
const responseBadRequest = (message = 'bad request') => {
    return {
        status: 400,
        message: message,
        data: null,
    };
};
exports.responseBadRequest = responseBadRequest;
const responseFobidden = (message = 'forbidden') => {
    return {
        status: 403,
        message: message,
        data: null,
    };
};
exports.responseFobidden = responseFobidden;
const responseUnauthorized = (message = 'unauthorized') => {
    return {
        status: 401,
        message: message,
        data: null,
    };
};
exports.responseUnauthorized = responseUnauthorized;
