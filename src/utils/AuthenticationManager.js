export class AuthenticationManager {

    static ACCESS_TOKEN = 'doorway-auth-token'

    static USER_ID = 'doorway-user-id'

    static hasToken() {
        return localStorage.getItem(AuthenticationManager.ACCESS_TOKEN) !== null;
    }

    static getToken() {
        return localStorage.getItem(AuthenticationManager.ACCESS_TOKEN);
    }

    static setAuthToken(token) {
        localStorage.setItem(AuthenticationManager.ACCESS_TOKEN, token);
    }

    static removeAuthToken() {
        localStorage.removeItem(AuthenticationManager.ACCESS_TOKEN);
    }

    static hasUserId() {
        return localStorage.getItem(AuthenticationManager.USER_ID) !== null;
    }

    static getUserId() {
        return localStorage.getItem(AuthenticationManager.USER_ID);
    }

    static setUserId(id) {
        localStorage.setItem(AuthenticationManager.USER_ID, id);
    }

    static removeUserId() {
        localStorage.removeItem(AuthenticationManager.USER_ID);
    }

    static logout() {
        AuthenticationManager.removeAuthToken();
        AuthenticationManager.removeUserId();
    }
}
