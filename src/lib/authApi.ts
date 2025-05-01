const API = "https://user-svc-worker.safeapp.workers.dev";

export async function requestOtp(email: string) {
    const res = await fetch(`${API}/signup/get-code`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "content-type": "appliaction/json" },
    });
    if (!res.ok) throw new Error("Failed to send OTP");

    const jsonRes = await res.json();
    if (jsonRes.status_code !== 200) throw new Error("Failed to send OTP");

    return jsonRes;
}

export async function authenticate(
    email: string,
    code: string,
    method_id: string
) {
    const res = await fetch(`${API}/authenticate/jwt`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "x-email": "neveha8001@hostlace.com",
        },
        body: JSON.stringify({ email, code, method_id }),
    });

    if (!res.ok) throw new Error("Invalid email or OTP");

    const data = await res.json();

    return {
        accessToken: data.token,
        refreshToken: data.refresh_token,
    };
}

export async function refreshAccessToken(refreshToken: string) {
    const res = await fetch(`${API}/token/refresh`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });

    if (!res.ok) throw new Error("Failed to refresh token");

    const data = await res.json();
    return data.token;
}
