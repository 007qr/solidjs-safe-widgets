import MasterCardLogo from "./icons/MasterCardLogo";

export default function MasterCard({number}:{number: number}) {
    return (
        <div class="flex gap-[10px]">
            <div class="w-[28px] h-[28px] rounded-[4px] border border-[#1D1D1F14] flex items-center justify-center overflow-hidden relative">
                <span class="absolute inset-0 flex items-center justify-center animate-mastercard-logo">
                    <MasterCardLogo width="23.33" height="14.33" />
                </span>
                <span class="absolute inset-0 flex items-center justify-center font-inter text-[9px] leading-[130%] tracking-[0%] text-[#494949] animate-mastercard-text">
                    {number}
                </span>
            </div>
        </div>
    );
}
