import { For, type Component, createEffect, createContext, createSignal, Setter, Accessor } from "solid-js";
import { useSearchParams } from "@solidjs/router";

import BigCard from "./components/BigCard";
import Card from "./components/Card";
import ThreeStepCard from "./components/ThreeStepCard";
import Connect from "./components/icons/Connect";
import TestimonialCard from "./components/TestimonialCard";
import Logo from "./components/icons/Logo";
import Carousel, { CarouselItem } from "./components/Carousel";
import { AdData } from "./utils/types";
import Modal from "./components/Modal";

// Type for carousel item props
type CarouselItemProps = {
    onNext: () => void;
};

interface ModalContextValue {
    isModalOpen: Accessor<boolean>;
    setIsModalOpen: Setter<boolean>;
}

export const ModalContext = createContext<ModalContextValue>();

const App: Component = () => {
    const [searchParams] = useSearchParams<AdData>();
    const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false);

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
        <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
            {/* Desktop Version */}
            <div class={`flex flex-col max-lg:gap-[60px] bg-[#F5F5F5] w-full max-lg:pt-[100px] max-lg:pb-12 ${isModalOpen() ? "overflow-hidden" : ""}`}>
                <div class="max-lg:pb-[60px] max-lg:mx-auto lg:p-[40px]">
                    <Logo />
                </div>

                <div class="relative pb-12 overflow-hidden max-lg:hidden">
                    <Carousel>{cardItems}</Carousel>
                </div>

                {/* Mobile Version */}
                <div class="flex flex-col px-[24px] gap-[48px] items-center lg:hidden">
                    <For each={cardItems}>
                        {(cardItem) => renderItem(cardItem)}
                    </For>
                </div>
            </div>

            <Modal isModalOpen={isModalOpen} />
        </ModalContext.Provider>
    );
};

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
      <BigCard title="We've won loads of Chargebacks. We'll win yours too." />
  ),
];

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

export default App;
