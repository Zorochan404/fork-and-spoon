class apiError extends Error {
    constructor
    (
        statusCode,
        message= "Something went wrong",
        errors= [],
        stack= "",

    ){
        super(message)
    }
}