import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const url = "https://compact-codex-425018-n7.lm.r.appspot.com";
export const urlDev = "http://192.168.1.16:8080";

export const errorInput = (ref) => {
  if (ref && ref.current) {
    ref.current.setNativeProps({
      style: { borderColor: 'red' },
    });
  }
};

// Varsayılan başarı işleyicisi
const defaultHandleSuccess = (data) => {
  console.log('Data fetched successfully:', data);
};

// Varsayılan hata işleyicisi
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
      navigateToLoginPage(expired=true);
    }
  }
  try {
    const response = await axios({
      url,
      method,
      data,
      headers
    });
    onSuccess(response.data);  // Callback fonksiyonunu çağır
    return response.data;
  } catch (error) {
    onError(error);  // Callback fonksiyonunu çağır
    throw error;
  }
};

const checkTokenExpiration = async () => {
  const token = await AsyncStorage.getItem('jwtToken');
  
  const expireDate = await AsyncStorage.getItem('expireDate')
  if (expireDate) {
    const currentTime = Date.now() / 1000; // current time in seconds
    if (expireDate < currentTime) {
      navigateToLoginPage(expired = true)
    } else {
      return token;
    }
  }
};

export const navigateToLoginPage = async (expired = false) => {
  var email = await AsyncStorage.getItem('username');
  navigation.navigate('sign-in', {});
  if (expired) {
    alert("Oturum süreniz doldu. Tekrar giriş yapınız.")
  }
}
