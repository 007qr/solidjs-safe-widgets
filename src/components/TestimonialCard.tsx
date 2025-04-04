import { createSignal, JSX, Show } from "solid-js";
import ArrowForward from "./icons/ArrowForward";

interface Props {
    videoSrc: string;
    gifSrc: string;
    text: JSX.Element;
    personName: string;
    companyName: string;
    personProfileUrl?: string;
    onNextClick?: () => void;
}

export default function TestimonialCard({
    videoSrc,
    gifSrc,
    text,
    companyName,
    personName,
    personProfileUrl,
    onNextClick,
}: Props) {
    const [videoOpen, setVideoOpen] = createSignal<boolean>(false);

    return (
        <>
            <div class="overflow-hidden bg-white relative min-w-[382px] min-h-[473px] max-w-[740px] h-[632px] w-full rounded-[48px] p-[32px]">
                {/* AuthorName and Company Name */}
                <div class="absolute flex gap-[8px] items-center jusitfy-center">
                    <Show
                        when={personProfileUrl}
                        fallback={
                            <div class="w-[36px] h-[36px] rounded-full bg-black"></div>
                        }
                    >
                        <img
                            src={personProfileUrl}
                            class="w-[36px] h-[36px] rounded-full object-cover"
                        />
                    </Show>
                    <div class="gap-[2px] flex flex-col">
                        <p class="text-[17px] leading-[170%] tracking-[-2%] font-medium align-middle">
                            {personName}
                        </p>
                        <p class="text-[15px] leading-[120%] tracking-[-2%] align-middle">
                            {companyName}
                        </p>
                    </div>
                </div>

                <div class="flex gap-[73px]">
                    <div
                        class="flex flex-col gap-[20px] mt-auto"
                        on:click={() => setVideoOpen(!videoOpen())}
                    >
                        {text}
                        <button class="w-max border py-[16px] px-[24px] gap-[10px] text-[17px] leading-[110%] tracking-[-2%] align-middle font-medium flex border-[#1d1d1f] rounded-[64px] items-center">
                            <ArrowForward size={24} />
                            Play Video
                        </button>
                    </div>

                    <Show
                        when={!videoOpen()}
                        fallback={
                            <video
                                class="flex-shrink-0 w-[327px] h-[472px] rounded-[184px] object-cover"
                                autoplay
                            >
                                <source src={videoSrc} type="video/webm" />
                            </video>
                        }
                    >
                        <img
                            class="flex-shrink-0 w-[327px] h-[472px] rounded-[184px] object-cover"
                            src={gifSrc}
                            alt=""
                        />
                    </Show>
                </div>

                <div
                    class="absolute right-[20px] bottom-[20px] shadow-lg bg-white rounded-[64px]"
                    on:click={onNextClick}
                >
                    <div class="p-[32px] flex items-center justify-center">
                        <ArrowForward />
                    </div>
                </div>
            </div>
        </>
    );
}
