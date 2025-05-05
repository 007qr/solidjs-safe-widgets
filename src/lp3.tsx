import AIWidget from "./components/AIWidget";
import AIWidget2 from "./components/AIWidget2";

export default function Lp3() {
    return (
        <>
            <div class="max-w-[1200px] mx-auto flex-wrap gap-7 w-full h-screen flex items-center justify-center">
                <AIWidget disputeStates="pending_response_from_bank" />
                <AIWidget disputeStates="won" />
                <AIWidget disputeStates="lost" />
                <AIWidget disputeStates="not_responded" />
                {/* <AIWidget2 /> */}
            </div>
        </>
    );
}
