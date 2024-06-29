const ResponseMessage = {
    SUCCESS: "Success",
    VALIDATION_FAIL: "Validation Failed",
    DUPLICATE_ID: "Duplicate Id",
    SIGN_IN_FAIL: "Login information mismatch",
    CERTIFICATION_FAIL: "Certification Failed",
    MAIL_FAIL: "Mail send failed",
    DATABASE_ERROR: "Database error"
};

Object.freeze(ResponseMessage);

export default ResponseMessage;