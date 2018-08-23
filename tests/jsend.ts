import { describe } from 'mocha';
import * as chai from 'chai';
import JSendResponseBuilder from '../lib';

const { expect } = chai;

const jsend = new JSendResponseBuilder();

describe('JSendResponseBuilder', () => {
    it('should return a well formed success response', () => {
        const data = {
            firstName: 'joe',
            lastName: 'hartzell'
        };

        expect(jsend.success(data)).to.deep.eq({
            status: 'success',
            data
        })
    })

    it('should return a well formed fail response', () => {
        const data = {
            title: 'Cannot be null'
        };

        expect(jsend.fail(data)).to.deep.eq({
            status: 'fail',
            data
        })
    })

    it('should return a well formed error response', () => {
        const data = {
            title: 'title was null'
        };
        const message = 'An error occurred';

        expect(jsend.error(message, 500, data)).to.deep.eq({
            status: 'error',
            code: 500,
            message,
            data
        })
    })

    it('should not require an error code, or data for an error response', () => {
        const message = 'An error occurred';

        expect(jsend.error(message)).to.deep.eq({
            status: 'error',
            message
        })
    })
})