class CookieHelper {
    getCookieValue(name) {
      const cookieName = name + "=";
      const cookieArray = document.cookie.split(';');
      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
      return '';
    }
  }
  
  export default new CookieHelper();

  