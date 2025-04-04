import { createSignal, onCleanup, onMount, For, Show, JSX } from "solid-js";
import { Motion, Presence } from "solid-motionone";
import ArrowForward from "./icons/ArrowForward";

interface Step {
    id: number;
    title: string;
    subTitle: string;
    icon: JSX.Element;
}

interface Props {
    altText: string;
    steps: Step[];
    nextButton: boolean;
    nextButtonUrl?: string;
}

export default function ThreeStepCard(props: Props) {
    const [activeStep, setActiveStep] = createSignal<number>(props.steps[0]?.id ?? 0);
    let animationFrameId: number | null = null;
    const intervalDuration = 3000;
    let lastTimestamp = 0;

    const cycleSteps = (timestamp: number) => {
        if (!lastTimestamp) lastTimestamp = timestamp;

        if (timestamp - lastTimestamp >= intervalDuration) {
            setActiveStep((prev) => {
                const currentIndex = props.steps.findIndex(
                    (step) => step.id === prev
                );
                return props.steps[(currentIndex + 1) % props.steps.length].id;
            });
            lastTimestamp = timestamp;
        }

        animationFrameId = requestAnimationFrame(cycleSteps);
    };

    onMount(() => {
        if (props.steps.length === 0) return;
        animationFrameId = requestAnimationFrame(cycleSteps);

        onCleanup(() => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        });
    });

    return (
        <div class="overflow-hidden bg-white relative min-w-[382px] min-h-[473px] max-w-[740px] max-h-[632px] w-full h-full rounded-[48px] p-[40px]">
            <div class="flex flex-col gap-[8px]">
                <h2 class="text-[33px] leading-[110%] tracking-[-2%] font-semibold text-[#1D1D1F99]">
                    {props.altText}
                </h2>
                <h1 class="text-[#1D1D1F] text-[64px] leading-[110%] tracking-[-2%] font-semibold">
                    3 steps.
                </h1>
            </div>

            <div class="flex justify-between mt-[40px]">
                <div class="flex flex-col gap-[20px]">
                    <For each={props.steps}>
                        {(step) => (
                            <div class="w-[290px] gap-[20px] flex flex-col p-[20px] bg-[#F5F5F5] rounded-[24px] transition-all duration-300 ease-in-out">
                                {step.icon}
                                <div class="flex flex-col gap-[8px]">
                                    <h3 class="text-[33px] leading-[120%] tracking-[-2%] font-medium">
                                        {step.title}
                                    </h3>
                                    <div 
                                        classList={{ "!max-h-[200px]": activeStep() === step.id }}
                                        class="transition-[max-height] duration-500 ease-in-out overflow-hidden max-h-0"
                                    >
                                        <Presence>
                                            {activeStep() === step.id && (
                                                <Motion.p 
                                                    animate={{ opacity: [0, 1] }}
                                                    transition={{ duration: 0.5, easing: "ease-in-out" }}
                                                    exit={{ opacity: 0 }}
                                                    class="text-[15px] leading-[130%] tracking-[0%] font-normal pb-2"
                                                >
                                                    {step.subTitle}
                                                </Motion.p>
                                            )}
                                        </Presence>
                                    </div>
                                </div>
                            </div>
                        )}
                    </For>
                </div>
                <div class="w-[316px] h-[322px]">
                    <video autoplay muted loop class="w-full h-full">
                        <source src="/disputer_cards1.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>

            {props.nextButton && (
                <a
                    href={props.nextButtonUrl || "#"}
                    class="absolute right-[40px] bottom-[20px] shadow-lg bg-white rounded-[64px] hover:scale-105 transition-transform duration-200"
                >
                    <div class="p-[32px] flex items-center justify-center">
                        <ArrowForward />
                    </div>
                </a>
            )}
        </div>
    );
}