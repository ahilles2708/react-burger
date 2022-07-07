import { baseUrl } from "./constants";
import jwt_decode from "jwt-decode";
import { TCookieProps, TExpiredCookie } from "../types";
import { RequestOptions } from "https";

export function checkResponse(res: Response){
    return res.ok ? res.json() : res.json().then((err)=> Promise.reject(err));
}

export const setCookie = (name: string, value: string | null, props?: TCookieProps & TExpiredCookie) => {
    props = props || {};
    let exp: (Date | null) = null;
    if (typeof props.expires == 'number' && props.expires) {
      const d = new Date();
      d.setTime(d.getTime() + props.expires * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value ?? '');
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}

export const refreshToken = () => {
  return fetch (
    `${baseUrl}/auth/token`,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }
  )
  .then(checkResponse);
};

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if((err as Error).message === "jwt expired"){
      const refreshData = await refreshToken();
      if (!refreshData.success){
        Promise.reject(refreshData);
      }
      setCookie("accessToken", refreshData.accessToken);
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      const customRequestHeaders: HeadersInit = new Headers();
      customRequestHeaders.set('authorization', refreshData.accessToken);
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const checkAccessToken = () => {
  const accessToken = getCookie('accessToken');
  if (accessToken) {
      const decodedToken: {exp: number} = jwt_decode(accessToken);
      const currentTime = new Date().getTime();
      if (decodedToken.exp * 1000 < currentTime) {
          return false;
      }
  }
  return accessToken ? true : false;
}