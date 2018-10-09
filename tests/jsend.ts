/* tslint:disable */
import { describe } from 'mocha';
import * as chai from 'chai';
import JSendResponseBuilder from '../lib';

const { expect } = chai;

describe('JSendResponseBuilder', () => {
    it('should return a well formed success response', () => {
        const jsend = new JSendResponseBuilder();
        const data = {
            firstName: 'joe',
            lastName: 'hartzell'
        };
        const response = jsend.success(data);

        expect(response).to.have.property('status').and.to.eq('success');
        expect(response).to.have.property('data');
    })

    it('should return a well formed fail response', () => {
        const jsend = new JSendResponseBuilder();
        const data = {
            title: 'Cannot be null'
        };
        const response = jsend.fail(data);

        expect(response).to.have.property('status').and.to.eq('fail');
        expect(response).to.have.property('data');
    })

    it('should return a well formed error response', () => {
        const jsend = new JSendResponseBuilder();
        const data = {
            title: 'title was null'
        };
        const message = 'An error occurred';
        const response = jsend.error(message, 500, data);

        expect(response).to.have.property('status').and.to.eq('error');
        expect(response).to.have.property('code');
        expect(response).to.have.property('message');
        expect(response).to.have.property('data');
    })

    it('should not require an error code, or data for an error response', () => {
        const jsend = new JSendResponseBuilder();
        const message = 'An error occurred';
        const response = jsend.error(message);

        expect(response).to.have.property('status').and.to.eq('error');
        expect(response).to.have.property('message');
    })

    describe('options', () => {
        describe('case', () => {
            it('should noramlize keys with different response types', () => {
                const jsend = new JSendResponseBuilder({ case: 'kebab', deep: true });
                const data = {
                    firstName: 'Joe',
                    lastName: 'Hartzell',
                };  
                const success = jsend.success(data);
    
                expect(success.status).to.eq('success');
                expect(success.data).to.have.property('first-name');
                expect(success.data).to.have.property('last-name');

                const fail = jsend.fail(data);

                expect(fail.status).to.eq('fail');
                expect(fail.data).to.have.property('first-name');
                expect(fail.data).to.have.property('last-name');

                const error = jsend.error('error', undefined, data);
                
                expect(error.status).to.eq('error');
                expect(error.data).to.have.property('first-name');
                expect(error.data).to.have.property('last-name');
            })

            it('should normalize all keys to kebab case', () => {
                const jsend = new JSendResponseBuilder({ case: 'kebab', deep: true });
                const data = {
                    firstName: 'Joe',
                    lastName: 'Hartzell',
                };  
                const response = jsend.success(data);
    
                expect(response.status).to.eq('success');
                expect(response.data).to.have.property('first-name');
                expect(response.data).to.have.property('last-name');
            })
    
            it('should normalize all keys to camel case', () => {
                const jsend = new JSendResponseBuilder({ case: 'camel', deep: true });
                const data = {
                    'first-name': 'Joe',
                    'last-name': 'Hartzell',
                };  
                const response = jsend.success(data);
    
                expect(response.status).to.eq('success');
                expect(response.data).to.have.property('firstName');
                expect(response.data).to.have.property('lastName');
            })
    
            it('should normalize all keys to snake case', () => {
                const jsend = new JSendResponseBuilder({ case: 'snake', deep: true });
                const data = {
                    'first-name': 'Joe',
                    'last-name': 'Hartzell',
                };  
                const response = jsend.success(data);
    
                expect(response.status).to.eq('success');
                expect(response.data).to.have.property('first_name');
                expect(response.data).to.have.property('last_name');
            })
        })

        describe('deep', () => {
            it('should handle 0s as a value', () => {
                const jsend = new JSendResponseBuilder({ case: 'camel', deep: true });
                const data = {
                    'first-name': 'Joe',
                    'last-name': 'Hartzell',
                    address: {
                        'line-1': '1234 state road lucky',
                        'zip-code': 0
                    }
                };  
                const response = jsend.success(data);
    
                expect(response.status).to.eq('success');
                expect(response.data).to.have.property('firstName').and.eq('Joe');
                expect(response.data).to.have.property('lastName').and.eq('Hartzell');
                expect(response.data.address).to.have.property('line1').and.eq('1234 state road lucky');
                expect(response.data.address).to.have.property('zipCode').and.eq(0);
            })

            it('should normalize nested keys', () => {
                const jsend = new JSendResponseBuilder({ case: 'camel', deep: true });
                const data = {
                    'first-name': 'Joe',
                    'last-name': 'Hartzell',
                    address: {
                        'line-1': '1234 state road lucky',
                        'zip-code': 1234
                    }
                };  
                const response = jsend.success(data);
    
                expect(response.status).to.eq('success');
                expect(response.data).to.have.property('firstName');
                expect(response.data).to.have.property('lastName');
                expect(response.data.address).to.have.property('line1');
                expect(response.data.address).to.have.property('zipCode');
            })

            it('should not normalize nested keys', () => {
                const jsend = new JSendResponseBuilder({ case: 'camel', deep: false });
                const data = {
                    'first-name': 'Joe',
                    'last-name': 'Hartzell',
                    address: {
                        'line-1': '1234 state road lucky',
                        'zip-code': 1234
                    }
                };  
                const response = jsend.success(data);
    
                expect(response).to.have.property('status').to.eq('success');
                expect(response.data).to.have.property('firstName');
                expect(response.data).to.have.property('lastName');
                expect(response.data.address).to.have.property('line-1');
                expect(response.data.address).to.have.property('zip-code'); 
            })
        })
    })
})