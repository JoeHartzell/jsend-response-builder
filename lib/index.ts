import { Case, Normalizer } from 'obj-key-normalizer';

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
 * options for the JSendResponseBuilder
 */
export interface IJSendResponseBuilderOptions {
    /**
     * this sets which case type the response object keys will be
     */
    case?: Case;
    /**
     * this sets if we should deep normalize the response data or not
     */
    deep?: boolean;
    /**
     * a namespace character used for separating a namespace from its key
     */
    namespaceKey?: string;
}

/**
 * a class to build a JSend response
 */
export default class JSendResponseBuilder {
    private normalizer = new Normalizer();
    private _options: IJSendResponseBuilderOptions = {};

    public set options(option: IJSendResponseBuilderOptions) {
        // set the normalizer options
        this.normalizer.options.case = option.case;
        this.normalizer.options.deep = option.deep;
        this.normalizer.options.namespaceKey = option.namespaceKey;
        this._options = option;
    }

    public get options() {
        return this._options;
    }
    /**
     * creates an instance of a JSend builder
     * @constructor
     * @param options options for the builder
     */
    constructor(
        options: IJSendResponseBuilderOptions = {},
    ) {
        this.options = options;
    }

    /**
     * returns a well formed JSend success response
     * @param data data for success response
     */
    public success<T>(data: T): IJSendSuccessResponse<any> {
        // create response
        const response: IJSendSuccessResponse<T> = {
            data,
            status: 'success',
        };

        // normalize the response
        const normalized = this._normalizeResponse<typeof data>(data);

        // if the normalized response data is not null
        if (normalized) {
            // set the response data to the normalized data
            response.data = normalized;
        }

        // return the response
        return response;
    }

    /**
     * returns a well formed JSend fail response
     * @param data data for fail response
     */
    public fail<T>(data: T): IJSendFailResponse<any> {
        // create response
        const response: IJSendFailResponse<T> = {
            data,
            status: 'fail',
        };

        // normalize response
        const normalized = this._normalizeResponse<typeof data>(data);

        // set the response data to the normalized data
        if (normalized) {
            response.data = normalized;
        }

        // return the response
        return response;
    }

    /**
     * returns a well formed JSend error response
     * @param message error message
     * @param code error code (optional)
     * @param data data for error (optional)
     */
    public error<T = null>(message: string, code?: number, data?: T): IJSendErrorResponse<any> {
        // create the response
        const response: IJSendErrorResponse<T> = {
            message,
            status: 'error',
        };

        if (code) {
            response.code = code;
        }

        if (data) {
            response.data = data;
        }

        // normalize the response data
        const normalized = this._normalizeResponse(data);

        // set the normalized data if it exists
        if (normalized) {
            response.data = normalized;
        }

        // return the response
        return response;
    }

    /**
     * nomalizes a response
     * @param response the response to normalize
     */
    private _normalizeResponse<TIn>(response: TIn): any {
        return this.normalizer.normalize<TIn>(response).result;
    }
}
