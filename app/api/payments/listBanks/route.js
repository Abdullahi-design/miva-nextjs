export const GET = async function () {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/bank',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`
      }
    };

    try {
      const paystackResponse = await fetch(`https://${options.hostname}${options.path}`, options);
      const data = await paystackResponse.json();

        // console.log(data, 'data');
      
        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
      console.error(error);
      return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
}
