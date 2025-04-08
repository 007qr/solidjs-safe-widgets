import { Motion, Presence } from "solid-motionone";
import { Accessor, createSignal, lazy, Show, useContext } from "solid-js";
import CloseIcon from "./icons/CloseIcon";
import { ModalContext } from "../App";
import { SignUpModalFlow } from "../utils/types";
import Step3 from "./Signup/Screens/Step3";
import Joined from "./Signup/Screens/Joined";

const OTP = lazy(() => import("./Signup/Screens/OTP"));
const Email = lazy(() => import("./Signup/Screens/Email"));


export default function Modal({ isModalOpen }: { isModalOpen: Accessor<boolean> }) {
    const [flow, setFlow] = createSignal<SignUpModalFlow>("email");
    const [email, setEmail] = createSignal<string>("");
    const [methodId, setMethodId] = createSignal<string>("");
    const modalContext = useContext(ModalContext)
    
    return (
        <>
            <Presence>
                <Show when={isModalOpen()}>
                    <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{easing: 'ease-in-out', duration: 0.5}}
                        class="fixed inset-0 flex items-center justify-center w-full h-screen bg-black/80 z-[100] backdrop-blur-md"
                    >
                        <div class="bg-white flex flex-col gap-[12px] p-[28px] sm:p-[44px] rounded-[12px] w-[320px] sm:w-[400px] h-full max-h-[450px]">
                            <div
                                class="w-[36px] self-end h-[36px] relative cursor-pointer"
                                on:click={() => modalContext?.setIsModalOpen(false)}
                            >
                                <CloseIcon isActive />
                            </div>
                            <Show when={flow() === "email"}>
                                <Email
                                    email={email}
                                    setFlow={setFlow}
                                    setEmail={setEmail}
                                    setMethodId={setMethodId}
                                />
                            </Show>
                            <Show when={flow() == "otp"}>
                                <OTP methodId={methodId} setFlow={setFlow}  />
                            </Show>
                            <Show when={flow() == "step3"}>
                                <Step3 setFlow={setFlow} />
                            </Show>
                            <Show when={flow() == "joined"}>    
                                <Joined />
                            </Show>
                        </div>
                    </Motion.div>
                </Show>
            </Presence>
        </>
    );
}
