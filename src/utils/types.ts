import { SearchParams } from "@solidjs/router/dist/types";

export interface AdData extends SearchParams {
    email: string;
    utm_source: string;
    created_time: string;
    ad_id: string;
    ad_name: string;
    adset_id: string;
    adset_name: string;
    campaign_id: string;
    campaign_name: string;
    form_id: string;
    form_name: string;
    is_organic: string;
    platform: string;
    utm_medium: string;
    link_click_time: string;
    app_install_time: string;
    lp_id: string;
    lp_name: string;
    utm_campaign: string;
    subid1: string;
    subid2: string;
    subid3: string;
}

export type SignUpModalFlow = "step1" | "email" | "otp" | "step3" | "joined";
