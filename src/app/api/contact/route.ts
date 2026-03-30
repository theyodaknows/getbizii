import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, email, phone, service, message } = body as {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    service?: string;
    message?: string;
  };

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const zohoClientId = process.env.ZOHO_CLIENT_ID;
    const zohoClientSecret = process.env.ZOHO_CLIENT_SECRET;
    const zohoRefreshToken = process.env.ZOHO_REFRESH_TOKEN;

    if (zohoClientId && zohoClientSecret && zohoRefreshToken) {
      const tokenRes = await fetch(`https://accounts.zoho.com/oauth/v2/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: zohoClientId,
          client_secret: zohoClientSecret,
          refresh_token: zohoRefreshToken,
        }),
      });
      const tokenData = (await tokenRes.json()) as { access_token?: string };

      if (tokenData.access_token) {
        await fetch("https://www.zohoapis.com/crm/v2/Leads", {
          method: "POST",
          headers: {
            Authorization: `Zoho-oauthtoken ${tokenData.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: [
              {
                First_Name: firstName,
                Last_Name: lastName,
                Email: email,
                Phone: phone ?? "",
                Company: service ?? "GetBizii Inquiry",
                Description: message,
                Lead_Source: "Website",
              },
            ],
          }),
        });
      }
    } else {
      console.log("[Contact Form Submission]", {
        firstName,
        lastName,
        email,
        service,
        message,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
