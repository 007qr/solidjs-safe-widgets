import { v4 } from "uuid";

class SessionManager {
    getCookie(cookie_name: string) {
        let name = cookie_name + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    generateCookie(cookie_name: string) {
        let cookie = this.getCookie(cookie_name);
        if (cookie == "") {
            let cookie_id = v4();
            let cookie_expiration = 365;

            const d = new Date();
            d.setTime(d.getTime() + cookie_expiration * 24 * 60 * 60 * 1000);
            let expires = ";expires=" + d.toUTCString();
            document.cookie =
                cookie_name +
                "=" +
                cookie_id +
                ";" +
                cookie_expiration +
                ";path=/" +
                expires;
        }
    }
}