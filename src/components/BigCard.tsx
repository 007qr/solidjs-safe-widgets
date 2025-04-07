import ArrowForward from "./icons/ArrowForward";

interface Props {
    title: string;
}

export default function BigCard(props: Props) {
    return (
        <div class="max-lg:min-w-[362px] max-lg:min-h-[582px] max-lg:w-full max-lg:h-full relative overflow-hidden min-w-[740px] min-h-[473px] w-[740px] h-[632px] rounded-[48px] flex items-center justify-center">
            <video
                autoplay
                muted
                loop
                class="absolute w-[90%] h-[90%] object-cover"
            >
                <source src="/masked-video.webm" type="video/webm" />
            </video>

            <h1 class="max-lg:text-[48px] break-words flex items-center justify-center p-[32px] lg:p-[75px] text-[64px] absolute top-0 left-0 w-full h-full bg-white text-black font-bold leading-[110%] tracking-[-2%] mix-blend-screen">
                {props.title}
            </h1>

            {/* Button */}
            <button class="text-[17px] leading-[110%] tracking-[-2%] absolute flex gap-[10px] items-center bg-black py-[32px] px-[96px] max-lg:px-[72px] max-lg:py-[28px] w-max text-white rounded-[64px] bottom-[20px] left-1/2 -translate-x-1/2 z-10 ">
                Start for free <ArrowForward color="white" />
            </button>
        </div>
    );
}
