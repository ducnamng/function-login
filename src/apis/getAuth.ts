import axiosConfig from "../axiosConfig";

export default function getAuth(session_url: any) {
  return axiosConfig.get(session_url).then((response) => {
    return response.status;
  });
}
