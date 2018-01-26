<h1>fakey-json</h1>

# Purpose
This is a utility for mocking json data that pretends the api response data with JSON format.

# Installation
```bash
npm install fakey-json
```

# How to use

```ecmascript 6
import fakeyJSON from 'fakey-json'

const makeMock = fakeyJSON(undefined, {
    summary: {
        reseedCollected: 9999,
        contributionCollected: 9999,
        totalCollected: 9999,
        reseedPayout: 9999,
        contributionPayout: 9999,
        totalPayout: 9999,
        beginningBalance: 20000
    }
})

const responseData = makeMock(10, (index, makePropValue) => {
                             return {
                                 "date"         : makePropValue('date', {startYear: 2018, endYear: 2018}),
                                 "reseedCollected": makePropValue('currency'),
                                 "contributionCollected": makePropValue('currency', {val: 100}),
                                 "totalCollected": makePropValue('currency', {min: 100000}),
                                 "reseedPayout": makePropValue('currency'),
                                 "contributionPayout": makePropValue('currency'),
                                 "totalPayout": makePropValue('currency'),
                                 "reseedBalance": makePropValue('currency'),
                                 "contributionBalance": makePropValue('currency'),
                                 "totalBalance": makePropValue('currency')
                             }
                         }
                     )

```