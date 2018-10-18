# About

A simple typescript library for creating JSend responses. Supports making "Success", "Error" and "Fail" responses. 
# Usage

The project is very simple to start using. You simply create an instance of the JSendResponseBuilder then start using the methods. The builder supports several options to customize the builder

### Options 

The options are currently a WIP but currently there are 2 available options.

| Option | Values                    | Description                                                                     |
|--------|---------------------------|---------------------------------------------------------------------------------|
| *case* | 'kebab', 'camel', 'snake' | By setting this, it controls what case type the object keys in the response are |
| *deep* | true, false               | By setting this, it controls if nested objects in the reponse get normalized    |
| *namespaceKey | string             | By setting this, it prevents the case type from rewriting the characters that separate a namespace from its key |

### Example 
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