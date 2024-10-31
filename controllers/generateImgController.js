const listAllApiKey = () => {
  let apiKeys = [];

  for (let i = 1; i <= 3; i++) {
    let format;
    format = `LIMEWIRE_API_KEY` + `${i}`;
    apiKeys.push(format);
  }

  return apiKeys;
};

const generateImg = async (keyword, apiKey) => {
  console.log("using key ", apiKey);
  let response;

  const generate = await fetch(
    `https://api.limewire.com/api/image/generation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Version": "v1",
        Accept: "application/json",
        Authorization: `Bearer ${process.env[apiKey]}`,
      },
      body: JSON.stringify({
        prompt: keyword,
        aspect_ratio: "1:1",
      }),
    }
  )
    .then((res) => (response = res.json()))
    .catch((err) => console.log("error while generating => ", err));
  console.log("responsekey =>  ", response);

  return response;
};

const generate = async (req, res) => {
    const keyword = req?.body?.keyword;
    const apiKeys = listAllApiKey();
    let generateImgRes;
  
    for (let i = 0; i < apiKeys.length; i++) {
      const key = apiKeys[i];
      generateImgRes = await generateImg(keyword, key);
      if (generateImgRes?.status !== 403) {
        console.log("inside break ====");
        break;
      }
    }
  
    console.log("response => ", generateImgRes);
  
    return res.json({
      ...generateImgRes,
    });
  };

module.exports = {
  generate
};
