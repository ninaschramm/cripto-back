import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function fetchData(start: number, limit: number) {
    try {
      const response = await axios.get(' https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest ', {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.API_KEY,
          Accept: "application/json",
        },
        params: {
        start,
        limit,
        convert: "USD",
        },
      });
  
      // success
      const data = response.data;
      const limitedData = Object.values(data).slice(0, 5);
      console.log(limitedData);
      return limitedData;
      
    } catch (error) {
      // error
      console.error(error);
      throw error;
    }
  }
  