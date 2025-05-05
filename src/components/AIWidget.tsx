import { createSignal, For, onCleanup, onMount, Show } from "solid-js";
import AIGif from "./icons/AIGif";
import ClockIcon from "./icons/ClockIcon";
import ListIcon from "./icons/ListIcon";
import MasterCardLogo from "./icons/MasterCardLogo";
import { Presence, Motion } from "solid-motionone";
import SaveIcon from "./icons/SaveIcon";
import MasterCard from "./MasterCard";

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
                class="w-[364px] absolute p-[16px] text-[#1D1D1F] h-[170px] bg-white border border-[#1D1D1F14] rounded-[24px] leading-[130%] tracking-[0%]"
                style={{
                    "box-shadow": "0px 4px 2px 0px #00000005",
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none",

                    "-webkit-mask-image": aiThinking()
                        ? "linear-gradient(transparent -22%, black, transparent 113%)"
                        : "none",
                    "mask-image": aiThinking()
                        ? "linear-gradient(transparent -22%, black, transparent 113%)"
                        : "none",
                    "overflow-y": aiThinking() ? "auto" : "hidden",
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
                                    <MasterCard number={4435} />
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
                                    <div class="relative w-[30px] h-[30px]">
                                        <svg
                                            class="absolute top-0 left-0 w-full h-full transform -rotate-90"
                                            viewBox="0 0 36 36"
                                        >
                                            <circle
                                                class="text-gray-200"
                                                stroke-width="4"
                                                stroke="currentColor"
                                                fill="none"
                                                cx="18"
                                                cy="18"
                                                r="16"
                                            />
                                            <circle
                                                class="text-[#990b0a]"
                                                stroke-width="4"
                                                stroke-dasharray="100"
                                                stroke-linecap="round"
                                                stroke="currentColor"
                                                fill="none"
                                                cx="18"
                                                cy="18"
                                                r="16"
                                                style="stroke-dashoffset: calc(100.48 * (1 - 0.55))"
                                            />
                                        </svg>

                                        <div class="absolute inset-0 mt-[1px] flex items-center justify-center">
                                            <svg
                                                class="mt-[2px] ml-[5px]"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M10.0003 17.0832C13.9123 17.0832 17.0837 13.9119 17.0837 9.99984C17.0837 6.08782 13.9123 2.9165 10.0003 2.9165C6.08831 2.9165 2.91699 6.08782 2.91699 9.99984C2.91699 13.9119 6.08831 17.0832 10.0003 17.0832Z"
                                                    stroke="black"
                                                />
                                                <path
                                                    d="M10 5.83301V9.99967L12.3333 12.333"
                                                    stroke="black"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    <div class="border border-[#1D1D1F14] rounded-[64px] p-[4px] cursor-pointer">
                                        <ListIcon />
                                    </div>
                                </div>
                            </Motion.div>
                        </Show>
                    </Presence>
                </div>

                <div class="w-[200px] flex flex-col mx-auto gap-[14px] pb-[60px] pt-[30px]">
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
        }, delayTimeout - 1250);

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
