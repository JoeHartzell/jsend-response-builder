"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        this.options = options;
    }
    /**
     * returns a well formed JSend success response
     * @param data data for success response
     */
    success(data) {
        return {
            data,
            status: 'success'
        };
    }
    /**
     * returns a well formed JSend fail response
     * @param data data for fail response
     */
    fail(data) {
        return {
            data,
            status: 'fail'
        };
    }
    /**
     * returns a well formed JSend error response
     * @param message error message
     * @param code error code (optional)
     * @param data data for error (optional)
     */
    error(message, code, data) {
        const result = {
            message,
            status: 'error'
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
exports.JSendResponseBuilder = JSendResponseBuilder;
//# sourceMappingURL=index.js.map