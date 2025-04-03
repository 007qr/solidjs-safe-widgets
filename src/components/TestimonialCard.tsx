import { createSignal } from "solid-js";
import ArrowForward from "./icons/ArrowForward";

interface Props {
  videoSrc: string;
  gifSrc: string;
  text: string;
  personName: string;
  companyName: string;
}

export default function TestimonialCard({
  videoSrc,
  gifSrc,
  text,
  companyName,
  personName,
}: Props) {
  return (
    <>
      <div class="overflow-hidden bg-white relative min-w-[382px] min-h-[473px] max-w-[740px] max-h-[632px] w-full h-full rounded-[48px] p-[40px]">
        <div class="absolute right-[40px] bottom-[20px] shadow-lg bg-white rounded-[64px]">
          <div class="p-[32px] flex items-center justify-center">
            <ArrowForward />
          </div>
        </div>
      </div>
    </>
  );
}
