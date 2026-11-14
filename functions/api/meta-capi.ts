interface Env {
  META_CAPI_ACCESS_TOKEN?: string;
  META_PIXEL_ID?: string;
}

interface MetaEventPayload {
  eventName: string;
  eventId: string;
  eventSourceUrl?: string;
  userData?: {
    clientIpAddress?: string;
    clientUserAgent?: string;
    fbp?: string;
    fbc?: string;
  };
  customData?: Record<string, unknown>;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;

    const accessToken = env.META_CAPI_ACCESS_TOKEN;
    const pixelId = env.META_PIXEL_ID || "1073846021935349";

    if (!accessToken) {
      return new Response(JSON.stringify({ error: "META_CAPI_ACCESS_TOKEN not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const payload = (await request.json()) as MetaEventPayload;
    if (!payload.eventName || !payload.eventId) {
      return new Response(JSON.stringify({ error: "Missing eventName or eventId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Extrair IP e User Agent das requisições na Cloudflare
    const clientIp = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || undefined;
    const userAgent = request.headers.get("user-agent") || undefined;

    // Extrair cookies _fbp e _fbc se disponíveis
    const cookieHeader = request.headers.get("cookie") || "";
    const parseCookie = (name: string): string | undefined => {
      const match = cookieHeader.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));
      return match ? decodeURIComponent(match[2]) : undefined;
    };

    const fbp = payload.userData?.fbp || parseCookie("_fbp");
    const fbc = payload.userData?.fbc || parseCookie("_fbc");

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const eventData: Record<string, unknown> = {
      event_name: payload.eventName,
      event_time: currentTimestamp,
      event_id: payload.eventId,
      event_source_url: payload.eventSourceUrl || request.headers.get("referer") || "https://plurifisio.com.br/",
      action_source: "website",
      user_data: {
        client_ip_address: clientIp,
        client_user_agent: userAgent,
        ...(fbp ? { fbp } : {}),
        ...(fbc ? { fbc } : {}),
      },
    };

    if (payload.customData && Object.keys(payload.customData).length > 0) {
      eventData.custom_data = payload.customData;
    }

    const metaEndpoint = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;

    const capiResponse = await fetch(metaEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [eventData],
      }),
    });

    const capiResult = await capiResponse.json();

    return new Response(JSON.stringify({ success: capiResponse.ok, result: capiResult }), {
      status: capiResponse.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
