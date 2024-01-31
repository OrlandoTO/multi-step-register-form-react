export function isEmpty(value){
    return value===''
} 

export function isEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}