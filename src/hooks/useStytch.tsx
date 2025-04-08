import { StytchHeadlessClient } from "@stytch/vanilla-js/headless";

const stytch = new StytchHeadlessClient("public-token-test-63bfb077-3ff5-4049-ab9f-9662db04631a");
export default function useStytch() {
    return stytch;
}