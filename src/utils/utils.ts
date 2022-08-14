import { baseUrl } from "./constants";
import jwt_decode from "jwt-decode";
import { IItemProps, TBurgerStructure, TCookieProps, TExpiredCookie } from "../types";
import { differenceInDays as diff, isSameDay as same, format, subDays, formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale'

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

export const getBurgerStructure = (burgerIngredients: Array<IItemProps>) => {
  let burgerStructure: TBurgerStructure = {
      bun: null,
      ingredients: {},
      totalValue: 0
  }

  burgerIngredients.forEach(ingredient => {
      if (ingredient.type === "bun") {
          if (!burgerStructure.bun) {
            burgerStructure.bun = ingredient
            burgerStructure.totalValue += ingredient.price * 2;
          }
      } else {
          if (!(ingredient._id in burgerStructure.ingredients))
          burgerStructure.ingredients[ingredient._id] = { count: 0, ingredient: ingredient }
          burgerStructure.ingredients[ingredient._id]["count"] += 1
          burgerStructure.totalValue += ingredient.price;
      }
  })

  return burgerStructure;
};

export const dateFormatConverter = (date: string) => {
  const initDate = new Date(date);
  const today = new Date();
  const yesterday = subDays(today, 1);
  const dayBeforeYesterday = subDays(today, 2);

  let formattedDate = '';
  if (same(initDate, today)) {
      formattedDate = 'Сегодня';
  } else if (same(initDate, yesterday)) {
      formattedDate = 'Вчера';
  } else if (same(initDate, dayBeforeYesterday)) {
      formattedDate = 'Позавчера';
  } else if (diff(today, initDate) <= 7) {
      formattedDate = formatDistance(subDays(today, diff(today, initDate)), today, { addSuffix: true, locale: ru })
  } else {
      formattedDate = format(initDate, 'dd.MM.yyyy')
  }
  formattedDate += `, ${format(initDate, 'HH:mm')} i-${format(initDate, "O")}`;
  
  return formattedDate;
}