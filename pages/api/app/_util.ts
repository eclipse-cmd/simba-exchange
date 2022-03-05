export const apiResponse = (status: boolean, message: string, data: any) => {
  return {
    status,
    message,
    data,
  };
};

export const randomString = (length: number = 15): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
};

export const exchange_rate = (type = null): { "USD": number, "NGN": number; } => {
  return {
    "USD": 1.091858,
    "NGN": 456.658899
  };
};

export const exchange_currency = (type: string): number | undefined => {
  if (type === "USD") {
    return 1.091858;
  }
  if (type === "NGN") {
    return 456.658899;
  }
};

   // if (process.env.NODE_ENV === "production") {
    //     const response = await axios.get('http://api.exchangeratesapi.io/v1/latest?access_key=af38408a2df5b8cb355c9f8b79d2c016&symbols=USD,NGN&format=1');
    //     const data = response.data;
    //     if (data.success) {
    //         res.status(200).json({
    //             status: true,
    //             message: "",
    //             data: {
    //                 "base": "EUR",
    //                 "date": "2022-03-04",
    //                 "rates": {
    //                     "USD": data.rates.USD,
    //                     "NGN": data.rates.NGN
    //                 }
    //             }
    //         });
    //     }
    //     return;

