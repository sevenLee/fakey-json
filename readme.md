<h1>fakey-json 😈</h1>

# Purpose
You are a smart and proactive Frontend engineer 🤓, you complete your UI components very quickly, so that the APIs is still not ready for client. You don't have correct data to feed the UI components. Finally, You are blocked until the APIs were completed by Backend Engineers. [fakey-json] will resolve the api tasks blocking between Frontend and Backend engineers simply and easily.
[fakey-json] is a utility for mocking json data of response in client and no need any mock server. 

* **Assign custom JSON pattern for response**: You can pass any custom JSON structure to be the default value.
* **Assign the response data on any level in JSON**: You can use dot-notation to assign the response data position so quickly.
* **Fancy high order function pattern implementation**: [fakey-json] base on high order function pattern and return a function as a result that allow you to create new function that can be used as templates.
* **Choose common format for the value of response property**: [fakey-json] build-in the useful and common formats for response property value.      

# Installation
```bash
npm install fakey-json
```

# How to use

## For simple JSON
Below response is your expectation:
```js
{
    data: [{
        name: "Name_1",
        id: "19"
    },{
        name: "Name_2",
        id: "20"
    },{
        name: "Name_3",
        id: "21"
    }]
}
```
fakey-json can help you like:

```js
import fakeyJSON from 'fakey-json'

const base = {data: []}
const makeMock = fakeyJSON(base, 'data')
const responseData = makeMock(3, (index) => 
    ({
        name: `Name_${index}`,
        id  : `${18 + index}`,
    })
)
// responseData will be your expectation
```
## More complex JSON and use common format in response property value
Below response is your expectation and you would like to make 1000 items in payload:
```js
{
    data: {
        message: "success",
        payload: [
            {
                name: "Name_1",
                createDate: '2017-01-01',
                id: "1",
                type: "Major"
            },{
                name: "Name_2",
                createDate: '2018-01-10',
                id: "2",
                type: "Mini"
            },
            
            ...
            
            {
                name: "Name_1000",
                createDate: '2017-08-31',
                id: "1000",
                type: "Major"
            }
        ]
    }
}
```
fakey-json can help you generate 1000 complex format easily:
```js
import fakeyJSON from 'fakey-json'

const base = {
    message: "success",
    data: {
        payload: []
    }
}
const makeMock = fakeyJSON(base, 'data.payload')
const responseData = makeMock(1000, (index, makePropValue) =>{
    return {
        name      : `Name_${index}`,
        id        : `${index}`,
        createDate: makePropValue('date', {startYear: 2017, endYear: 2018}),
        type      : makePropValue('from-list', {list: ['Major', 'Mini', 'Minor']})
    }
})
// responseData will be your expectation
```
