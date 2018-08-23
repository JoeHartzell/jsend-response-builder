/**
 * a JSend status
 */
export declare type JSendStatus = 'success' | 'fail' | 'error';
/**
 * a JSend response
 */
export interface IJSendResponse {
    status: JSendStatus;
}
/**
 * a JSend success response
 */
export interface IJSendSuccessResponse<T> extends IJSendResponse {
    status: 'success';
    data: T;
}
/**
 * a JSend fail response
 */
export interface IJSendFailResponse<T> extends IJSendResponse {
    status: 'fail';
    data: T;
}
/**
 * a JSend error response
 */
export interface IJSendErrorResponse<T> extends IJSendResponse {
    status: 'error';
    message: string;
    code?: number;
    data?: T;
}
/**
 * a class to build a JSend response
 */
export declare class JSendResponseBuilder {
    options: {};
    /**
     * creates an instance of a JSend builder
     * @constructor
     * @param options options for the builder
     */
    constructor(options?: {});
    /**
     * returns a well formed JSend success response
     * @param data data for success response
     */
    success<T>(data: T): IJSendSuccessResponse<T>;
    /**
     * returns a well formed JSend fail response
     * @param data data for fail response
     */
    fail<T>(data: T): IJSendFailResponse<T>;
    /**
     * returns a well formed JSend error response
     * @param message error message
     * @param code error code (optional)
     * @param data data for error (optional)
     */
    error<T = null>(message: string, code?: number, data?: T): IJSendErrorResponse<T>;
}
