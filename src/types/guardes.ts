const isString = (val: unknown): val is string => {
    return typeof val === "string";
}

export default isString;