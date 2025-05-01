export default class Tracker {
    private userId: string;
    private sessionId: string;
    private siteId: string;

    constructor(site_id: string) {
        this.userId = this.getUserId();
        this.sessionId = this.getSessionId();
        this.siteId = site_id;

        // store the session in tinybird
        this.createSession();
    }

    private generateId() {
        const max = BigInt("18446744073709551615");
        const rand = crypto.getRandomValues(new Uint32Array(2));
        return (BigInt(rand[0]) << 32n) | BigInt(rand[1]);
      }

    getUserId() {
        let userId =
            localStorage.getItem("user_id") || String(this.generateId());
        localStorage.setItem("user_id", userId);

        return userId;
    }

    getSessionId() {
        let sessionId =
            sessionStorage.getItem("session_id") || String(this.generateId());
        sessionStorage.setItem("session_id", sessionId);

        return sessionId;
    }

    private createSession() {
        // {lpurl}?utm_campaign={campaignid}&utm_term={adgroupid}&utm_content={creative}

        let utmParams = this.getUTMParams();

        let data = {
            sign: 1,
            start: new Date().toISOString(),
            user_id: parseInt(this.userId),
            session_id: parseInt(this.sessionId),
            timestamp: new Date().toISOString(),
            campaign_id: utmParams.campaign_id,
            adset_id: utmParams.adset_id,
            ad_id: utmParams.ad_id,
            utm_source: utmParams.utm_source,
            landing_page_id: this.siteId,
        };

        fetch(
            "https://api.europe-west2.gcp.tinybird.co/v0/events?name=session", // replace it with cloudflare worker
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${
                        import.meta.env.VITE_TINYBIRD_TOKEN
                    }`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        )
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) =>
                console.error("Error creating a session:", error)
            );
    }

    public trackEvent(event_name: string, meta_key: Array<string>, meta_value: Array<string>) {
        let utmParams = this.getUTMParams();

        const data = {
            "timestamp": new Date().toISOString(),
            "user_id": parseInt(this.userId),
            "session_id": parseInt(this.sessionId),
            "event_name": event_name,
            "campaign_id": utmParams.campaign_id,
            "adset_id": utmParams.adset_id,
            "ad_id": utmParams.ad_id,
            "utm_source": utmParams.utm_source,
            "landing_page_id": this.siteId,
            "meta_key": meta_key,
            "meta_value": meta_value
          };
          
          fetch("https://api.europe-west2.gcp.tinybird.co/v0/events?name=events", { // replace it with cloudflare worker
            method: "POST",
            headers: {
              "Authorization": `Bearer ${import.meta.env.VITE_TINYBIRD_TOKEN}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.error(`Error creating an event **The event is not being tracked => ${event_name}:`, error));
    }

    private getUTMParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            utm_source: params.get("utm_source") || null,
            utm_medium: params.get("utm_medium") || null,
            campaign_id: params.get("utm_campaign") || null,
            adset_id: params.get("utm_term") || null,
            ad_id: params.get("utm_content") || null,
        };
    }
}
