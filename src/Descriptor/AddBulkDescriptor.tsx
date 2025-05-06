import { Accessor, Setter } from "solid-js";
import { DescriptorFlow } from "./p2";
import LeftArrow from "../components/icons/LeftArrow";
import P1 from "./p1";

export default function AddBulkDescriptor({
    setFlow,
    flow,
}: {
    setFlow: Setter<DescriptorFlow>;
    flow: Accessor<string>;
}) {
    return (
        <>
            <div class="flex flex-col justify-between h-full">
                <div class="flex flex-col gap-[16px] flex-1 min-h-0">
                    <div class="flex justify-between">
                        <button
                            on:click={() => {
                                setFlow("third");
                            }}
                            class="cursor-pointer"
                        >
                            <LeftArrow />
                        </button>
                        <h4 class="font-inter font-medium leading-[130%] tracking-[0%] text-[#1d1d1f]">
                            Add Descriptor
                        </h4>
                        <button class="w-[24px] h-[24px] flex items-center justify-center bg-[#F5F5F5] rounded-[24px]">
                            <UploadIcon />
                        </button>
                    </div>
                    <div class="flex flex-col gap-[12px] overflow-y-auto flex-1 min-h-0 pr-[4px] custom-scrollbar">
                        <P1 />
                        <P1 />
                        <P1 />
                        <P1 />
                        <P1 />
                        <P1 />

                    </div>
                </div>

                <button class="mt-[12px] self-start font-inter font-medium leading-[130%] tracking-[0%] text-[#1d1d1f] text-[13px]">
                    + Add More
                </button>
            </div>
        </>
    );
}

function UploadIcon() {
    return (
        <>
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M4 13.3332H12M8 10.6665V2.6665M8 2.6665L10.3333 4.99984M8 2.6665L5.66667 4.99984"
                    stroke="#1D1D1F"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </>
    );
}
