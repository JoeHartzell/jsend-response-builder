# About

A simple typescript library for creating JSend responses. Supports making "Success", "Error" and "Fail" responses. 

# Example 
```ts
const data = {
    firstName: 'Joe',
    lastName: 'Hartzell'
};
const jsend = new JSendResponseBuilder();
const response = jsend.success(data);

// response output
// {
//     status: 'success',
//     data: {
//         firstName: 'Joe',
//         lastName: 'Hartzell'
//     }
// }
```

More examples can be found in the tests directory