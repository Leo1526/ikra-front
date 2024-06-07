import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { navigate, replace } from './navigationService';
export const url = "https://compact-codex-425018-n7.lm.r.appspot.com";
export const urlDev = "https://compact-codex-425018-n7.lm.r.appspot.com";

let isNavigatingToLogin = false;

export const errorInput = (ref) => {
  if (ref && ref.current) {
    ref.current.setNativeProps({
      style: { borderColor: 'red' },
    });
  }
};

export const formatBalance = (value) => {
  console.log(value)
  if (value === null || value === undefined) {
    return '';
  }
  value = value.toString()
  let dotIndex = value.indexOf(".")
  if (dotIndex != -1) {
    console.log(dotIndex)
    let kurus = value.slice(dotIndex + 1)
    if (kurus.length == 1) {
      value = value + "0";
    }
    if (kurus.length > 2) {
      value = value.slice(0, dotIndex + 3)
    } 
  }
  value = value.replaceAll(".",",")
  return value;
}

const defaultHandleSuccess = (data) => {
  console.log('Data fetched successfully:', data);
};

const defaultHandleFail = (error) => {
  console.error('Error fetching data:', error);
};

export const ikraAxios = async ({
  url,
  method = 'GET',
  data = null,
  headers = {},
  onSuccess = defaultHandleSuccess,
  onError = defaultHandleFail,
  tokenRequired = true,
  setLoading = null,
  isUserGet =false
}) => {
  if(setLoading) {
    setLoading(true)
  }
  if (tokenRequired) {
    var token = await checkTokenExpiration()
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    else {
      if (!isNavigatingToLogin) {
        isNavigatingToLogin = true;
      }
      return false;
    }
  }
  try {
    const response = await axios({
      url,
      method,
      data,
      headers,
      timeout: 30000
    });
    if(setLoading) {
      setLoading(false)
    }
    onSuccess(response.data);  // Callback fonksiyonunu çağır
    
    if(isUserGet){
      await AsyncStorage.setItem("userName",response.data.body.name)
    }

    return response.data;
  } catch (error) {
    onError(error);  // Callback fonksiyonunu çağır
    throw error;
  }
};

export const checkTokenExpiration = async () => {
  const token = await AsyncStorage.getItem('jwtToken');
  const expireDate = await AsyncStorage.getItem('expireDate')
  const date = new Date(expireDate);
  const milliseconds = date.getTime();
  if (expireDate) {
    const currentTime = Date.now();
    if (milliseconds < currentTime) {
      if (!isNavigatingToLogin) {
        isNavigatingToLogin = true;
        navigateToLoginPage(true);
      }
      return false;
    } else {
      return token;
    }
  }
};

export const navigateToLoginPage = async (expired = false) => {
  await AsyncStorage.removeItem('jwtToken');
  await AsyncStorage.removeItem('expireDate');
  replace('AuthStack');
  if (expired) {
    alert("Oturum süreniz doldu. Tekrar giriş yapınız.")
  }
}
