import { Setter } from "solid-js"
import { SignUpModalFlow } from "../../../utils/types"

export default function Step3({setFlow}: {setFlow: Setter<SignUpModalFlow>}) {
    const handleClick = () => {
        setFlow("joined");
    }
    return (
        <>
            <div class="flex flex-col h-full w-full mt-[16px]">
            <div class="">
                <h3 class="text-[31px] font-semibold tracking-tighter leading-[150%]">
                    Get some more details
                </h3>
                <p class="text-black/60 text-sm leading-[150%]">
                    Here goes subtitle
                </p>
            </div>
            <div class="space-y-[12px]">
                <div class="bg-[#EBEBEB] text-black/90 p-[12px] rounded-[12px] mt-[12px]">
                    <input
                        type="text"
                        class="w-full bg-transparent outline-none border-none"
                        placeholder="field1"
                    />
                </div>
                <div class="bg-[#EBEBEB] text-black/90 p-[12px] rounded-[12px] mt-[12px]">
                    <input
                        type="text"
                        class="w-full bg-transparent outline-none border-none"
                        placeholder="field2"
                    />
                </div>
            </div>
            <button
                onClick={handleClick}
                class="bg-black text-white leading-[20px] rounded-[16px] py-[16px] mt-[12px] disabled:opacity-80"
            >
                Continue
            </button>
        </div>
        </>
    )
}