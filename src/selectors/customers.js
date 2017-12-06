// returns filtered and sorted data

export default ( customers, { text } ) => {
    return customers.filter((customer) => {
        return typeof text !== 'string' ||
            customer.name.toLowerCase().includes(text.toLowerCase())
    }).sort()
};