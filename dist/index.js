"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obj_key_normalizer_1 = require("obj-key-normalizer");
/**
 * a class to build a JSend response
 */
class JSendResponseBuilder {
    /**
     * creates an instance of a JSend builder
     * @constructor
     * @param options options for the builder
     */
    constructor(options = {}) {
        this.normalizer = new obj_key_normalizer_1.Normalizer();
        this._options = {};
        this.options = options;
    }
    set options(option) {
        // set the normalizer options
        this.normalizer.options.case = option.case;
        this.normalizer.options.deep = option.deep;
        this._options = option;
    }
    get options() {
        return this._options;
    }
    /**
     * returns a well formed JSend success response
     * @param data data for success response
     */
    success(data) {
        // create response
        const response = {
            data,
            status: 'success',
        };
        // normalize the response
        const normalized = this._normalizeResponse(data);
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
    fail(data) {
        // create response
        const response = {
            data,
            status: 'fail',
        };
        // normalize response
        const normalized = this._normalizeResponse(data);
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
    error(message, code, data) {
        // create the response
        const response = {
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
    _normalizeResponse(response) {
        return this.normalizer.normalize(response).result;
    }
}
exports.default = JSendResponseBuilder;
//# sourceMappingURL=index.js.map