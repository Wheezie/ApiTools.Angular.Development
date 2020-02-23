export enum AuthStatus {
    /// Authentication failed or access was revoked
    Unauthorized,
    /// Currently blocked
    Blocked,
    /// Not yet confirmed
    NotConfirmed,
    /// Username/email not found.
    NotFound,
    /// Authorized
    Success,
    /// Signed out
    SignedOut,
    /// Credentials are invalid
    InvalidCredentials,
    /// An internal error occurred attempting to retrieve verification status
    InternalError,
}
