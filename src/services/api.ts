import axios from "axios";
import "./index.css";

const API_URL = "https://api.twocents.money/prod";

const callRpc = async (method: string, params: Record<string, any> = {}) => {
  try {
    const { data } = await axios.post(
      API_URL,
      {
        jsonrpc: "2.0",
        id: "anon",
        method,
        params,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.error) throw new Error(data.error.message);
    return data.result;
  } catch (err) {
    console.error("RPC error:", err);
    throw err;
  }
};
