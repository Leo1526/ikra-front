import axios from 'axios';

const handleSuccess = () {

}

const errorSuccess = () {
  
}

const axiosRequest = async ({ url, method = 'GET', data = null, headers = {}, onSuccess , onError }) => {
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
