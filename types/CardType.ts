export type dettailObj = {
    __typename?: string,
    name: string
}
export type CardDetails = {
    item: {
        __typename?: string,
        gender: string,
        id: string,
        image: string,
        location: dettailObj,
        name: string,
        origin: dettailObj
        status: string,
        species: string,
        type: string
    }
}
