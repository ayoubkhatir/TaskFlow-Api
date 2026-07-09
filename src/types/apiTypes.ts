export type SuccessResponse = {
    success: true,
    message: string
}

export type ErrorResponse = {
    success: false,
    message: string
}

export type ApiResponse = SuccessResponse | ErrorResponse