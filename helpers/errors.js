class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;

    }
};

class NotAutorizedError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;

    }
};

class NotVerifyError extends Error {
    constructor(message) {
        super(message);
        this.status = 404;

    }
};

class NotEniqueMailError extends Error {
    constructor(message) {
        super(message);
        this.status = 409;

    }
};

module.exports = {
    NotAutorizedError,
    NotEniqueMailError,
    NotVerifyError,
    BadRequestError

};