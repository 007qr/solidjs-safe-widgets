import { IoArrowForward } from "solid-icons/io";

interface Props {
  title: string;
}

export default function BigCard(props: Props) {
  return (
    <div class="relative overflow-hidden min-w-[382px] min-h-[473px] max-w-[740px] max-h-[632px] w-full h-full shadow-lg rounded-[48px] flex items-center justify-center">
      <video
        autoplay
        muted
        loop
        class="absolute w-[90%] h-[90%] object-cover"
      >
        <source src="/masked-video.webm" type="video/webm" />
      </video>

      <h1 class="break-words flex items-center justify-center p-[75px] text-[64px] absolute top-0 left-0 w-full h-full bg-white text-black font-bold leading-[110%] tracking-[-2%] mix-blend-screen">
        {props.title}
      </h1>

      {/* Button */}
      <button class="absolute flex gap-[10px] items-center bg-black py-[32px] px-[96px] text-white rounded-[64px] bottom-[20px] left-1/2 -translate-x-1/2 z-10">
        Start for free <IoArrowForward />
      </button>
    </div>
  );
}
