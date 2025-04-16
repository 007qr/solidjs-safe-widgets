import { Setter, useContext } from "solid-js";
import ArrowForward from "../../icons/ArrowForward";
import { SignUpModalFlow } from "../../../utils/types";

interface Props {
    title: string;
    setFlow: Setter<SignUpModalFlow>;
}

export default function Step1(props: Props) {
    return (
        <>
            <video
                autoplay
                muted
                loop
                class="absolute w-[90%] h-[90%] object-cover"
            >
                <source src="/masked-video.webm" type="video/webm" />
            </video>

            <h1 class="[transform:translate3d(0,0,0)] rounded-[48px] max-lg:text-[48px] break-words flex items-center justify-center p-[32px] lg:p-[75px] text-[64px] absolute top-0 left-0 w-full h-full bg-white text-black font-bold leading-[110%] tracking-[-2%] mix-blend-screen">
                {props.title}
            </h1>

            {/* Button */}
            <button
                on:click={() => props.setFlow("email")}
                class="text-[17px] leading-[110%] tracking-[-2%] absolute flex gap-[10px] items-center bg-black py-[32px] px-[96px] max-lg:px-[72px] max-lg:py-[28px] w-max text-white rounded-[64px] bottom-[20px] left-1/2 -translate-x-1/2 z-10 "
            >
                Start for free <ArrowForward color="white" />
            </button>
        </>
    );
}
