import numeral from "numeral";

/*
    const extendSetting = {
        extendLevel: 'data',
        extendProps: {
            summary: {

            }
        }
    }
    fakeyJSON(base, 'data.payload', {extendLevel: 'data', extendProps: {}})
*/

const addExtByLevel = (base, levels, index, extendProps) => {
    if(base[levels[index]]){
        if(typeof base[levels[index]] === 'object'){
            const nextIndex = index + 1
            addExtByLevel(base[levels[index]], levels, nextIndex, extendProps)
        }
        if(typeof base[levels[index]] !== 'object' && index === levels.length){
            base[levels[index]] = extendProps
        }
    }else{
        Object.assign(base, extendProps)
    }
}

const makePropValue = (type, opts) => {
    let output = null

    if(type && opts === undefined){
        return output
    }

    const makeFinalOpts = (defaultOpts, newOpts) => {
        let finalOpts = {}

        if(newOpts && typeof newOpts !== 'object'){
            console.warn("[fakeyJSON]: Option should be Object type")
            finalOpts = Object.assign({}, defaultOpts)
        }
        if(newOpts && typeof newOpts === 'object'){
            finalOpts = Object.assign({}, defaultOpts, opts)
        }
        if(newOpts === undefined){
            finalOpts = Object.assign({}, defaultOpts)
        }

        return finalOpts
    }

    switch(type){
        case 'from-list': {
            let finalOpts = {}
            const defaultOpts = {
                list: ['']
            }

            if(opts && !opts.list){
                console.warn("[fakeyJSON]: list property required")
                return output
            }

            if(opts && !Array.isArray(opts.list)){
                console.warn("[fakeyJSON]: list property should be array type")
                return output
            }
            finalOpts = makeFinalOpts(defaultOpts, opts)
            output = finalOpts.list[Math.floor(Math.random()*finalOpts.list.length)]
            return output
        }
        case 'currency': {
            let finalOpts = {}
            const defaultOpts = {
                min: 0,
                max: 1000,
                val: 1000
            }

            if(opts && opts.val){
                opts.min = defaultOpts.min
                opts.max = opts.val
            }

            if(opts && opts.min > opts.max){
                console.warn("[fakeyJSON]: Min should be less than Max")
                opts.min = defaultOpts.min
                opts.max = defaultOpts.max
            }

            finalOpts = makeFinalOpts(defaultOpts, opts)
            const diff = finalOpts.max - finalOpts.min
            let currency = Math.floor(finalOpts.min) + Math.floor(Math.random()*(diff+1))
            output = numeral(currency).format('0,0.00')
            return output
        }
        case 'date': {
            const dateObj = new Date()
            let finalOpts = {}
            const defaultOpts = {
                startYear: 2000,
                endYear: dateObj.getFullYear(),
                isTwoDigitsMonth: true
            }

            const makeMonthAndDate = (maxNum, isTwoDigits) => {
                let dateStr = (Math.floor(Math.random()*100) % maxNum + 1)+''

                if(isTwoDigits){
                    return (dateStr.length === 1) ? '0'+dateStr : dateStr
                }else{
                    return dateStr
                }
            }

            const makeYear = (startYear, endYear) => {
                const diff = endYear - startYear
                return Math.floor(startYear) + Math.floor(Math.random()*(diff+1))
            }

            finalOpts = makeFinalOpts(defaultOpts, opts)

            const startYear = finalOpts.startYear*1
            const endYear = finalOpts.endYear*1

            if(startYear > endYear){
                console.warn("[fakeyJSON]: Start year should be less than End year")
                return output
            }

            return `${makeYear(startYear, endYear)}-${makeMonthAndDate(12, finalOpts.isTwoDigitsMonth)}-${makeMonthAndDate(31, finalOpts.isTwoDigitsMonth)}`
        }
        default:
            return output
    }
}

const fakeyJSON = (base = {
    "message": "success",
    "data": {
        "payload": [],
        "query": {
            "pageNumber": 1,
            "pageSize": 0,
            "totalCount": 50,
            "serverTime": 1511322963859
        },
        "summary": null
    }
}, payloadLevel, extendSetting) => (dataSize, makeMockElement) => {
    let dataSets = []
    let index = 1
    while (index <= dataSize){
        dataSets.push(makeMockElement(index, makePropValue))
        index ++
    }

    if(extendSetting && extendSetting.extendLevel){
        const levels = extendSetting.extendLevel.split('.')
        addExtByLevel(base, levels, 0, extendSetting.extendProps)
    }

    const payloadLevels = payloadLevel.split('.')
    addExtByLevel(base, payloadLevels, 0, dataSets)

    return base
}

export default fakeyJSON