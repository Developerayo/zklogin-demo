const fetchSaltData = async (token) => {
  try {
    const myHeaders1 = new Headers();
    myHeaders1.append("Content-Type", "application/json");
    const requestOptions1 = {
      method: "POST",
      headers: myHeaders1,
      body: JSON.stringify({ token }),
      redirect: "follow",
    };
    const saltResponse = await fetch(
      "https://salt.api-devnet.mystenlabs.com/get_salt",
      requestOptions1
    );

    const saltResult = await saltResponse.json();
    return saltResult;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching salt data");
  }
};

exports.handler = async function (event) {
  const token = event.queryStringParameters.token;

  try {
    const apiResponse = await fetchSaltData(token);
    return {
      statusCode: 200,
      body: JSON.stringify(apiResponse),
    };
  } catch (error) {
    console.error("Error", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
