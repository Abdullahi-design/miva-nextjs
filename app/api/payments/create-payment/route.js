
export const POST = async function (request) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  const URL = process.env.NEXT_PUBLIC_URL;
  
  const { 
    customerEmail,
    price,
    productId,
    affiliateId,
    sellerId,
    commission,
  } = await request.json();

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json'
    }
  }


  try {
    const paystackData = {
      email: customerEmail,
      amount: price * 100, // Convert to kobo (NGN 100 = 10000 kobo),
      callback_url: `${URL}/thankYou`,
      metadata: {
        productId, affiliateId, sellerId, commission
      }
    };

    const paystackResponse = await fetch(`https://${options.hostname}${options.path}`, {
      ...options,
      body: JSON.stringify(paystackData),
    });


    const paystackResult = await paystackResponse.json();

    console.log(paystackResult); 

    return new Response(JSON.stringify(paystackResult), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new product", { status: 500 });
  }
}
