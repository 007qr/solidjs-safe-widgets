import { IoArrowForward } from "solid-icons/io";

interface Props {
  url?: string;
}

export default function BottomArrow(props: Props) {
  return (
    <div class="absolute right-[40px] bottom-[20px] shadow-lg bg-white rounded-[64px]">
      <div class="p-[32px] flex items-center justify-center">
        <IoArrowForward size={32} />
      </div>
    </div>
  );
}
