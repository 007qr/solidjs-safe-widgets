import {
    For,
    type Component,
    createEffect,
    createSignal,
    // createMemo,
    // onCleanup,
} from "solid-js";
// import { useSearchParams } from "@solidjs/router";

import { OcDevicedesktop3 } from 'solid-icons/oc'
import { BsLaptop } from 'solid-icons/bs'
import { IoPhoneLandscapeOutline } from 'solid-icons/io'
import { VsDeviceMobile } from 'solid-icons/vs'
import { FiPlay } from 'solid-icons/fi'

import BigCard from "./components/BigCard";
import Card from "./components/Card";
import ThreeStepCard from "./components/ThreeStepCard";
import Connect from "./components/icons/Connect";
import TestimonialCard from "./components/TestimonialCard";
import Logo from "./components/icons/Logo";
import Carousel, { CarouselItem } from "./components/Carousel";
import { AdData, SignUpModalFlow } from "./utils/types";
import { useEditor } from "./providers/editor-provider";
import Recursive from "./components/recursive-component";
import ComponentsTabs from "./components/components-tabs";
import SettingsTab from "./components/settings-tab";
import { useSearchParams } from "@solidjs/router";

// Type for carousel item props
type CarouselItemProps = {
    onNext: () => void;
};

const App: Component = () => {
    const [searchParams] = useSearchParams<AdData>();
    const [flow, setFlow] = createSignal<SignUpModalFlow>("step1");
    const [methodId, setMethodId] = createSignal<string>("");

    // Define carousel card items
    const cardItems: CarouselItem[] = [
        // Hero card
        ({ onNext }: CarouselItemProps) => (
            <Card
                backgroundType="img"
                src="/bg.webp"
                title="Win Your Chargebacks Automatically."
                subTitle="AI-powered automation that fights disputes for you. Stop losing revenue and save time"
                nextButton={true}
                onNextClick={onNext}
            />
        ),

        // How it works card
        ({ onNext }: CarouselItemProps) => (
            <ThreeStepCard
                altText="How it works"
                steps={[
                    {
                        id: 1,
                        title: "Connect",
                        subTitle:
                            "Simply connect your stripe, Shopify or other payment providers",
                        icon: () => <Connect />,
                    },
                    {
                        id: 2,
                        title: "Respond",
                        subTitle: "We automatically respond to your customer",
                        icon: () => "",
                    },
                    {
                        id: 3,
                        title: "Win",
                        subTitle: "You win",
                        icon: () => "",
                    },
                ]}
                nextButton={true}
                onNextClick={onNext}
            />
        ),

        // Testimonial card
        ({ onNext }: CarouselItemProps) => (
            <TestimonialCard
                text={StyledText}
                imgSrc="/temp-placeholder.webp"
                videoSrc="/templ-placeholder.webm"
                personName="Devyn Green"
                companyName="Adbuy.ai"
                onNextClick={onNext}
            />
        ),

        // Final card
        () => (
            <BigCard
                title="We've won loads of Chargebacks. We'll win yours too."
                setFlow={setFlow}
                flow={flow}
                methodId={methodId}
                setMethodId={setMethodId}
            />
        ),
    ];

    // Helper function to render carousel items in mobile view
    const renderItem = (item: CarouselItem) => {
        if (typeof item === "function") {
            return item({ onNext: () => {} });
        }
        return item;
    };

    // This function is for tracking user
    createEffect(async () => {
        if (Object.keys(searchParams).length > 0) {
            try {
                const response = await fetch(
                    "https://user-svc-worker.safeapp.workers.dev/api/add-pending-user",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            ...searchParams,
                            email: `test-ayush${Math.random()}@gmail.com`, // REMOVE this if you are in production
                        }),
                    }
                );
                console.log("API Response:", await response.json());
            } catch (error) {
                console.error("Tracking failed:", error);
            }
        } else {
            console.error("No search params");
        }
    });

    return (
        <div class="flex flex-col max-lg:gap-[60px] bg-[#F5F5F5] w-full max-lg:pt-[100px] max-lg:pb-12">
            <div class="max-lg:pb-[60px] max-lg:mx-auto lg:p-[40px]">
                <Logo />
            </div>

            <For each={cardItems}>{(cardItem) => renderItem(cardItem)}</For>
            {/* <div class="relative pb-12 overflow-hidden max-lg:hidden">
                <Carousel>{cardItems}</Carousel>
            </div>

            {Mobile Version 
            <div class="flex flex-col px-[24px] gap-[48px] items-center lg:hidden">
                <For each={cardItems}>{(cardItem) => renderItem(cardItem)}</For>
            </div> */}
        </div>
    );
};

// Styled testimonial text component
const StyledText = () => {
    return (
        <h1 class="text-[#A5A5A5] text-[40px] font-medium leading-[120%] tracking-[-2%] max-lg:text-[33px] max-lg:w-[218px]">
            "...helped me{" "}
            <span class="text-[#1d1d1f] max-lg:opacity-100 max-lg:text-[#f5f5f5]">
                recover $5K
            </span>{" "}
            worth of Chargebacks"
        </h1>
    );
};

/*
const EditorDebugLogger = () => {
  const { state } = useEditor();

  createEffect(() => {
    console.log("Editor state updated:", state);
    onCleanup(() => console.log("Cleanup"));
  });

  return null; // no UI
};



const App: Component = () => {
    const {state} = useEditor();

    return (
        <>
            <EditorDebugLogger />
            <div class="grid grid-rows-12 w-full max-h-screen h-screen">
                <div class="grid-rows-1 grid items-center">
                    <div class="flex gap-2.5 [grid-area:1/1/1/1] justify-self-center">
                        <OcDevicedesktop3 size={32} class=" bg-[#f2f2f2] p-2 rounded-lg" />
                        <BsLaptop size={32} class=" shadow-md bg-white p-2 rounded-lg" />
                        <IoPhoneLandscapeOutline size={32} class=" bg-[#f2f2f2] p-2 rounded-lg" />
                        <VsDeviceMobile size={32} class=" bg-[#f2f2f2] p-2 rounded-lg" />
                    </div>
                    <div class="[grid-area:1/1/1/1] justify-self-end mr-10">
                        <span class="cursor-pointer">
                            <FiPlay size={20} color="#9c9c9c" />
                        </span>
                    </div>

                </div>   
                <div class="row-span-11 grid grid-cols-6">
                    <div class="col-span-1 bg-white shadow-md">
                        <div class="space-x-4 p-3">
                            <span class="cursor-pointer">Elements</span>
                            <ComponentsTabs />
                            // <span class="cursor-pointer">Layers</span> 
                        </div>
                    </div>
                    <div class="col-span-4 bg-gray-300/20">
                        <For each={Array.isArray(state.editor.elements) ? state.editor.elements : []}>
                            {(childElement) => <Recursive element={childElement}/>}
                        </For>
                    </div>
                    <div class="col-span-1 bg-white shadow-md">
                        <div class="space-x-4 p-3">
                            <span class="cursor-pointer">Styles</span>
                            <SettingsTab />
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

*/
export default App;
