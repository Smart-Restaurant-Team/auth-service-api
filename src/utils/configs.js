// HTTP Status Codes Reference
// Create resource	                201
// Update resource successfully	    200 or 204
// Delete resource	                204
// Auth required	                401
// Auth ok but action not allowed	403
// Duplicate / already exists	    409
// Validation errors	            400 or 422
// Rate limit	                    429
// Server error	                    500
const STATUS = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500,
    RATE_LIMIT: 429,

}
const COOKIES_OPTIONS = {
    refreshToken: {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
}
export {STATUS, COOKIES_OPTIONS}