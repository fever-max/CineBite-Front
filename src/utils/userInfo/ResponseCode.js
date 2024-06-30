const ResponseCode = {
    SUCCESS: "SU",
    VALIDATION_FAIL: "VF",
    DUPLICATE_ID: "DI",
    SIGN_IN_FAIL: "SF",
    CERTIFICATION_FAIL: "CF",
    MAIL_FAIL: "MF",
    DATABASE_ERROR: "DBE"
};

Object.freeze(ResponseCode);

export default ResponseCode;