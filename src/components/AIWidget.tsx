import { createSignal, For, onCleanup, onMount, Show } from "solid-js";
import AIGif from "./icons/AIGif";
import ClockIcon from "./icons/ClockIcon";
import ListIcon from "./icons/ListIcon";
import MasterCardLogo from "./icons/MasterCardLogo";
import { Presence, Motion } from "solid-motionone";
import SaveIcon from "./icons/SaveIcon";

export default function AIWidget() {
    let ref!: HTMLButtonElement;
    const [aiThinking, setAIThinking] = createSignal(false);
    const [visibleSteps, setVisibleSteps] = createSignal<string[]>([
        "Terms",
        "Privacy policy",
        "Refund policy",
    ]);

    const aiText = `Let’s win this dispute for you. For this reason, we need to provide Terms, refund policy and refund reason`;

    const handleOnClick = () => {
        setAIThinking((v) => !v);
    };

    return (
        <div class="w-full h-screen flex items-center justify-center">
            <div
                class="w-[364px] absolute p-[16px] text-[#1D1D1F] overflow-y-auto h-[170px] bg-white border border-[#1D1D1F14] rounded-[24px] leading-[130%] tracking-[0%]"
                style={{
                    "box-shadow": "0px 4px 2px 0px #00000005",
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none",
                }}
            >
                <div class="flex flex-col justify-between">
                    <div class="flex relative justify-between items-center">
                        <Presence exitBeforeEnter>
                            <Show when={!aiThinking()}>
                                <Motion.div
                                    class="flex gap-[8px] items-center"
                                    animate={{ opacity: 1 }}
                                    exit={{
                                        opacity: 0,
                                        transition: {
                                            duration: 0.35,
                                            easing: "ease-in-out",
                                        },
                                    }}
                                >
                                    <div class="border shrink-0 border-[#1D1D1F14] w-max rounded-[4px] py-[7px] px-[2.33px] flex items-center justify-center">
                                        <MasterCardLogo
                                            width="23.33"
                                            height="14.3"
                                        />
                                    </div>
                                    <div>
                                        <p class="text-[13px] font-inter font-medium">
                                            Leslie Alexander
                                        </p>
                                        <h2 class="text-[15px] font-inter font-medium">
                                            Product not as described
                                        </h2>
                                    </div>
                                </Motion.div>
                            </Show>
                        </Presence>

                        <button
                            ref={ref}
                            onClick={handleOnClick}
                            class={`outline-none cursor-pointer transition-transform duration-500 ease-in-out absolute right-0 top-0 ${
                                aiThinking()
                                    ? "-translate-x-[300px] scale-60"
                                    : "translate-x-0"
                            }`}
                        >
                            <AIGif />
                        </button>
                    </div>

                    <Presence exitBeforeEnter>
                        <Show when={!aiThinking()}>
                            <Motion.div
                                class="flex justify-between items-end mt-[16%]"
                                animate={{ opacity: 1 }}
                                exit={{
                                    opacity: 0,
                                    transition: {
                                        duration: 0.35,
                                        easing: "ease-in-out",
                                    },
                                }}
                            >
                                <div class="flex flex-col gap-[2px]">
                                    <p class="text-[13px] font-inter font-normal">
                                        Pending
                                    </p>
                                    <h2 class="text-[21px] font-inter font-medium text-[#990B0B]">
                                        -$520.08
                                    </h2>
                                </div>
                                <div class="flex gap-[8px]">
                                    <div class="select-none cursor-pointer border border-[#1D1D1F14] rounded-[64px] flex gap-[4px] p-[4px] items-center">
                                        <ClockIcon />
                                        <span class="text-[13px] font-inter font-normal">
                                            25 days
                                        </span>
                                    </div>
                                    <div class="border border-[#1D1D1F14] rounded-[64px] p-[4px] cursor-pointer">
                                        <ListIcon />
                                    </div>
                                </div>
                            </Motion.div>
                        </Show>
                    </Presence>
                </div>

                <div class="w-[200px] flex flex-col mx-auto gap-[14px]">
                    <Show when={aiThinking()}>
                        <div class="flex flex-col">
                            <div>
                                <AIGeneratedText aiText={aiText} />
                            </div>
                            <div class="flex flex-col gap-[14px] pt-[8px]">
                                <For each={visibleSteps()}>
                                    {(step, index) => {
                                        return (
                                            <AISteps
                                                stepText={step}
                                                delay={index()}
                                            />
                                        );
                                    }}
                                </For>
                            </div>
                        </div>
                    </Show>
                </div>
            </div>
        </div>
    );
}

function AIGeneratedText({ aiText }: { aiText: string }) {
    return (
        <For each={aiText.split(" ")}>
            {(word, i) => (
                <>
                    <span
                        class="animate-fade-in whitespace-pre inline-block"
                        style={{ "animation-delay": `${i() * 100}ms` }}
                    >
                        {word}
                    </span>
                    <span class="whitespace-pre inline-block"> </span>
                </>
            )}
        </For>
    );
}

function AISteps({
    stepText,
    delay = 0,
}: {
    stepText: string;
    delay?: number;
}) {
    let ref!: HTMLDivElement;
    const [doneThinking, setDoneThinking] = createSignal(false);

    onMount(() => {
        const delayTimeout = 1000 * delay + 3500;

        setTimeout(() => {
            if (ref) {
                ref.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, delayTimeout - 1500);

        const timeout = setTimeout(() => {
            setDoneThinking(true);
        }, delayTimeout);

        onCleanup(() => clearTimeout(timeout));
    });

    return (
        <Presence>
            <Motion.div
                ref={ref}
                animate={{
                    opacity: [0, 1],
                    transition: { duration: 0, delay: delay + 2 },
                }}
            >
                <div class="gap-[4px] flex items-center text-[12px] font-inter leading-[130%]">
                    <Presence>
                        <Show when={!doneThinking()} fallback={<SaveIcon />}>
                            <Motion.span class="animate-spin">
                                <Spinner />
                            </Motion.span>
                        </Show>
                    </Presence>
                    {stepText}
                </div>
            </Motion.div>
        </Presence>
    );
}

function Spinner() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="flex-grow-0 flex-shrink-0 relative"
            preserveAspectRatio="xMidYMid meet"
        >
            <path
                d="M9.9987 3.33325V5.23801M14.7606 5.23801L13.332 6.66659M5.23679 5.23801L6.66536 6.66659M9.9987 16.6666V14.7618M14.7606 14.7618L13.332 13.3333M5.23679 14.7618L6.66536 13.3333M3.33203 9.99992H5.23679M14.7606 9.99992H16.6654"
                stroke="#1D1D1F"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </svg>
    );
}
