export const publicRoute = ["/", "/new-verification"];
//TODO make new route for auth/new-verification that will check if the user is not loggin do i have his email and if also allow to logged in user to enter to it
export const authRoute = ["/signin", "/signup", "/auth/error"]; //if you add the /auth/verification in the auth the loggin user can't access it
export const apiAuthPrefix = "/api/auth";
export const defaultSigninRedirect = "/chats";
