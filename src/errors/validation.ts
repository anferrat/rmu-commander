export enum ConfigProperties {
    CYCLE = 'CYCLE',
    TEXT = 'TEXT',
    NAME = 'NAME'
}

type ValidationResult = {
    valid: boolean,
    value: string
}


export const validation = (value: string, property: ConfigProperties): ValidationResult => {
    const val = value.trim()
    const isVal = isValid(val, property)
    return {
        valid: isVal,
        value: isVal ? castValue(val, property) : val
    }
}


const isValid = (value: string, property: ConfigProperties) => {
    switch (property) {
        case ConfigProperties.CYCLE:
            return !isNaN(Number(value)) && Number(value) >= 100 && Number(value) <= 59900
        case ConfigProperties.NAME:
            return value !== ''
        default:
            return true
    }
}

const castValue = (value: string, property: ConfigProperties) => {
    switch (property) {
        case ConfigProperties.CYCLE:
            return Number(value).toFixed(0).toString()
        case ConfigProperties.TEXT:
        case ConfigProperties.TEXT:
        default:
            return value
    }
}
