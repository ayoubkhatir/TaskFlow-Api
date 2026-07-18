export enum ErrorCodes {
    EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    VALIDATION_ERROR = "VALIDATION_ERROR",
    SESSION_NOT_FOUND = "SESSION_NOT_FOUND",
    UNAUTHORIZED = "UNAUTHORIZED",
    USER_NOT_FOUND = "USER_NOT_FOUND",
    RESSOURCE_NOT_FOUND = "RESSOURCE_NOT_FOUND",
    // USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",   the same as EMAIL ALREADY EXISTS
    SESSION_EXPIRED = "SESSION_EXPIRED",
}

export type SuccessResponse<T> = {
    success: true,
    message: string,
    data: T
}

export type ErrorResponse = {
    success: false,
    message: string,
    code: ErrorCodes
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

export function success<T>(data: T, message?: string): SuccessResponse<T> {
    return {
        success: true,
        message: message ? message : "action succeed",
        data: data
    }
}

export function fail(code: ErrorCodes, message?: string): ErrorResponse {
    return {
        success: false,
        message: message ? message : "action failed",
        code: code
    }
}