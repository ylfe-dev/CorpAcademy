import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const endpoint =
  "https://corporationacademy-e0gshgcqahaye4aa.polandcentral-01.azurewebsites.net/api/";

export async function fetchFromApi({ url, user, data = null, method = "GET" }) {
  return await axios({
    method: method,
    url: url,
    baseURL: endpoint,
    headers: {
      userId: user.state.guid,
    },
    data,
  });
}

const useAPI = ({ url, data = null, method = "GET" }) => {
  const [response, setResponse] = useState(null);

  const user = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      do {
        try {
          const result = await axios({
            method: method,
            url: url,
            baseURL: endpoint,
            headers: {
              userId: user.state.guid,
            },
            data,
          });
          console.log("✅ data fetched");
          console.log(result.data);
          setResponse(result.data);
        } catch (error) {
          console.error(error);
        }
      } while (false);
    };

    fetchData();
  }, [url, data]);

  const setData = data => {setResponse(data)}

  return [response, setData ];
};

export default useAPI;
