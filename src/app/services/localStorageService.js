import config from "../../config.json";

export const setToken = ({ refreshToken, idToken, experesIn = 3600 }) => {
    localStorage.setItem(config.jwtToken, idToken);
    localStorage.setItem(config.jwtRefreshToken, refreshToken);
    localStorage.setItem(config.jwtExpires, +new Date() + experesIn * 1000);
};

const localStorageService = {
    getAccessToken: () => localStorage.getItem(config.jwtToken),
    getRefreshToken: () => localStorage.getItem(config.jwtRefreshToken),
    getTokenExpiresDate: () => localStorage.getItem(config.jwtExpires)
};

export default localStorageService;
