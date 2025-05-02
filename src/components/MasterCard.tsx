import MasterCardLogo from "./icons/MasterCardLogo";

export default function MasterCard() {
    return (
        <div class="flex gap-[10px]">
            <div class="w-[36px] h-[36px] rounded-[4px] border border-[#1D1D1F14] flex items-center justify-center overflow-hidden relative">
                <span class="absolute inset-0 flex items-center justify-center animate-mastercard-logo">
                    <MasterCardLogo />
                </span>
                <span class="absolute inset-0 flex items-center justify-center font-inter text-[13px] leading-[130%] tracking-[0%] text-[#494949] animate-mastercard-text">
                    4356
                </span>
            </div>
        </div>
    );
}
