/**
 * a JSend status
 */
export type JSendStatus = 'success' | 'fail' | 'error';

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
export default class JSendResponseBuilder {

    /**
     * creates an instance of a JSend builder
     * @constructor
     * @param options options for the builder
     */
    constructor(
        public options = {},
    ) { }

    /**
     * returns a well formed JSend success response
     * @param data data for success response
     */
    public success<T>(data: T): IJSendSuccessResponse<T> {
        return {
            data,
            status: 'success',
        };
    }

    /**
     * returns a well formed JSend fail response
     * @param data data for fail response
     */
    public fail<T>(data: T): IJSendFailResponse<T> {
        return {
            data,
            status: 'fail',
        };
    }

    /**
     * returns a well formed JSend error response
     * @param message error message
     * @param code error code (optional)
     * @param data data for error (optional)
     */
    public error<T = null>(message: string, code?: number, data?: T): IJSendErrorResponse<T> {
        const result: IJSendErrorResponse<T> = {
            message,
            status: 'error',
        };

        if (code) {
            result.code = code;
        }

        if (data) {
            result.data = data;
        }

        return result;
    }
}
