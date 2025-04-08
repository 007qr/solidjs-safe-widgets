import { Accessor, createSignal, lazy, Setter, Show } from "solid-js";
import { SignUpModalFlow } from "../utils/types";

const Step1 = lazy(() => import("./Signup/Screens/Step1"))
const Email = lazy(() => import("./Signup/Screens/Email"));
const OTP = lazy(() => import("./Signup/Screens/OTP"));
const Step3 = lazy(() => import("./Signup/Screens/Step3"));
const Joined = lazy(() => import( "./Signup/Screens/Joined"));

interface Props {
    title: string;
    setFlow: Setter<SignUpModalFlow>;
    flow: Accessor<string>;
    methodId: Accessor<string>;
    setMethodId: Setter<string>;
}

export default function BigCard({flow, setFlow, title, methodId, setMethodId}: Props) {
    const [email, setEmail] = createSignal<string>("");

    return (
        <div class="max-lg:min-w-[362px] max-lg:min-h-[582px] max-lg:w-full max-lg:h-full relative overflow-hidden min-w-[740px] min-h-[473px] w-[740px] h-[632px] rounded-[48px] flex items-center justify-center">
            <Show when={flow() === "step1"}>
                <Step1 title={title} setFlow={setFlow} />
            </Show>
            <Show when={flow() === "email"}>
                <Email
                    email={email}
                    setFlow={setFlow}
                    setEmail={setEmail}
                    setMethodId={setMethodId}
                />
            </Show>
            <Show when={flow() == "otp"}>
                <OTP methodId={methodId} setFlow={setFlow} />
            </Show>
            <Show when={flow() == "step3"}>
                <Step3 setFlow={setFlow} />
            </Show>
            <Show when={flow() == "joined"}>
                <Joined />
            </Show>
        </div>
    );
}
