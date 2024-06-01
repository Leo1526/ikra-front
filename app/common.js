import axios from 'axios';

var showLoadScreen = false;

const handleSuccess = () => {
  
}

const handleError = () => {

}

const axiosRequest = async ({ url, method = 'GET', data = null, headers = {}, loadScreen = false, onSuccess = handleSuccess, onError = handleError}) => {
  console.log("çalış")
  try {
    const response = await axios({
      url,
      method,
      data,
      headers,
    });

    if (onSuccess) {
      onSuccess(response.data);
    }
  } catch (error) {
    if (onError) {
      onError(error);
    } else {
      console.error('Axios Request Error:', error);
    }
  }
};

export default axiosRequest;
