import { createSignal, onCleanup, onMount, For } from "solid-js";
import { Motion } from "solid-motionone";
import { IoArrowForward } from "solid-icons/io";

interface Step {
  id: number;
  title: string;
  subTitle: string;
  icon: any;
}

interface Props {
  altText: string;
  steps: Step[];
  nextButton: boolean;
  nextButtonUrl?: string;
}

export default function ThreeStepCard(props: Props) {
  const [activeStep, setActiveStep] = createSignal<number>(props.steps[0].id);

  onMount(() => {
    let stepIndex = 0;
    const cycleSteps = () => {
      setActiveStep(props.steps[stepIndex].id);
      stepIndex = (stepIndex + 1) % props.steps.length;
    };

    const interval = setInterval(cycleSteps, 3000);
    onCleanup(() => clearInterval(interval));
  });

  return (
    <div class="overflow-hidden relative min-w-[382px] min-h-[473px] max-w-[740px] max-h-[632px] w-full h-full shadow-lg rounded-[48px] p-[40px]">
      <div class="flex flex-col gap-[8px]">
        <h2 class="text-[33px] leading-[110%] tracking-[-2%] font-semibold text-[#1D1D1F99]">
          {props.altText}
        </h2>
        <h1 class="text-[#1D1D1F] text-[64px] leading-[110%] tracking-[-2%] font-semibold">
          3 steps.
        </h1>
      </div>

      <div class="flex justify-between mt-[40px]">
        <div class="flex flex-col gap-[20px]">
          <For each={props.steps}>{(step) => (
            <Motion.div
              class="w-[290px] gap-[20px] flex flex-col p-[20px] bg-[#F5F5F5] rounded-[24px] transition-all duration-300"
            >
              {step.icon}
              <div class="flex flex-col gap-[8px]">
                <h3 class="text-[33px] leading-[120%] tracking-[-2%] font-medium">
                  {step.title}
                </h3>
                {activeStep() === step.id && (
                  <Motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, easing: "ease-in-out" }}
                    class="text-[15px] leading-[130%] tracking-[0%] font-normal"
                  >
                    {step.subTitle}
                  </Motion.p>
                )}
              </div>
            </Motion.div>
          )}</For>
        </div>
        <div class="w-[316px] h-[322px]">
          <video autoplay muted loop class="w-full h-full">
            <source src="/disputer_cards1.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {props.nextButton && (
        <div class="absolute right-[40px] bottom-[20px] shadow-lg bg-white rounded-[64px]">
          <div class="p-[32px] flex items-center justify-center">
            <IoArrowForward size={32} />
          </div>
        </div>
      )}
    </div>
  );
}