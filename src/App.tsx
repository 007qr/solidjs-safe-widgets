import { Accessor, createSignal, For, Show } from "solid-js";
import Logo from "./components/icons/Logo";
import { Motion, Presence } from "solid-motionone";

export type Flow = "email" | "name" | "phone" | "otp" | "done";

export default function App() {
    const firstLine = "Hey👋 You're new here.";
    const secondLine = "Let's get you setup.";
    const flowPattern = ["name", "email", "phone", "otp", "done"];
    const [flow, setFlow] = createSignal<number>(0);

    return (
        <>
            <nav class="p-[10px]">
                <div class="w-[48px] h-[48px] bg-white items-center flex justify-center rounded-full">
                    <Logo size={"32"} />
                </div>
            </nav>

            <div class="w-[1150px] mx-auto rounded-[32px]">
                <h2 class="gap-2 mt-[30px] text-4xl font-bold text-[48px] leading-tight text-black/80 tracking-tighter">
                    <For each={firstLine.split(" ")}>
                        {(item: string, index: Accessor<number>) => (
                            <>
                                <span
                                    class={`staggered-animation whitespace-pre inline-block animate-fade-in ${
                                        item === "new"
                                            ? "font-dot-gothic font-medium"
                                            : ""
                                    }`}
                                    style={{
                                        "animation-delay": `${
                                            (index() + 1) * 200
                                        }ms`,
                                    }}
                                >
                                    {item}
                                </span>
                                <span
                                    class="whitespace-pre inline-block animate-fade-in"
                                    style={{
                                        "animation-delay": `${
                                            (index() + 1) * 100
                                        }ms`,
                                    }}
                                    aria-hidden="true"
                                >
                                    {" "}
                                </span>
                            </>
                        )}
                    </For>
                    <br />
                    <For each={secondLine.split(" ")}>
                        {(item: string, index: Accessor<number>) => (
                            <>
                                <span
                                    class={`staggered-animation whitespace-pre inline-block animate-fade-in ${
                                        item === "setup."
                                            ? "font-dot-gothic font-medium"
                                            : ""
                                    }`}
                                    style={{
                                        "animation-delay": `${
                                            (index() + 5) * 200
                                        }ms`,
                                    }}
                                >
                                    {item}
                                </span>
                                <span
                                    class="whitespace-pre inline-block animate-fade-in"
                                    style={{
                                        "animation-delay": `${
                                            (index() + 1) * 100
                                        }ms`,
                                    }}
                                    aria-hidden="true"
                                >
                                    {" "}
                                </span>
                            </>
                        )}
                    </For>
                </h2>
                {/* <h1 class="font-instrument-sans text-[48px] leading-[120%] tracking-[-2%] font-bold mt-[141px]"> */}
                {/* <span class="font-medium font-instrument-sans fade-in">
                        Hey👋 You're <span class="font-dot-gothic">new</span> here. <br /> Let's get you <span class="font-dot-gothic">setup.</span>
                    </span> */}
                {/* 
                    <For each={Array.from(firstLine.split(" "))}>
                        {(el, index) => (
                            <>
                                <span
                                    class={`whitespace-pre inline-block animate-fade-in ${el === 'new' ? 'font-dot-gothic font-medium': ''}`}
                                    style={{
                                        "animation-delay": `${
                                            (index() + 1) * 100
                                        }ms`,
                                    }}
                                    aria-hidden="true"
                                >
                                    {el}
                                </span>
                                <span
                                    class="whitespace-pre inline-block animate-fade-in"
                                    style={{
                                        "animation-delay": `${
                                            (index() + 1) * 100
                                        }ms`,
                                    }}
                                    aria-hidden="true"
                                >
                                    {" "}
                                </span>
                            </>
                        )}
                    </For>
                    <br />
                    <For each={Array.from(secondLine.split(" "))}>
                        {(el, index) => (
                            <>
                                <span
                                    class={`whitespace-pre inline-block animate-fade-in ${el === 'setup.' ? 'font-dot-gothic font-medium': ''}`}
                                    style={{
                                        "animation-delay": `${
                                            (index() + 5) * 100
                                        }ms`,
                                    }}
                                    aria-hidden="true"
                                >
                                    {el}
                                </span>
                                <span
                                    class="whitespace-pre inline-block animate-fade-in"
                                    style={{
                                        "animation-delay": `${
                                            (index() + 5) * 100
                                        }ms`,
                                    }}
                                    aria-hidden="true"
                                >
                                    {" "}
                                </span>
                            </>
                        )}
                    </For> */}
                {/* </h1> */}

                <div class="bg-white mt-[152px] w-full h-[340px] rounded-[32px] p-[32px] flex justify-between">
                    <div class="flex flex-col gap-[16px]">
                        <Presence exitBeforeEnter>
                            <Show when={flowPattern[flow()] === "name"}>
                                <Motion.h4
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            delay: 0.01,
                                            easing: [0.19, 1, 0.22, 1],
                                            duration: 1.2,
                                        },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 1.01,
                                        y: -30,
                                        transition: {
                                            duration: 0.7,
                                            easing: [0.16, 1, 0.29, 0.99],
                                        },
                                    }}
                                    class="text-[#333232] text-[21px] leading-[120%] tracking-[-2%] font-medium font-instrument-sans"
                                >
                                    Enter your name
                                </Motion.h4>
                            </Show>

                            <Show when={flowPattern[flow()] === "email"}>
                                <Motion.h4
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            delay: 0.01,
                                            easing: [0.19, 1, 0.22, 1],
                                            duration: 1.2,
                                        },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 1.01,
                                        y: -30,
                                        transition: {
                                            duration: 0.7,
                                            easing: [0.16, 1, 0.29, 0.99],
                                        },
                                    }}
                                    class="text-[#333232] text-[21px] leading-[120%] tracking-[-2%] font-medium font-instrument-sans"
                                >
                                    Enter your email
                                </Motion.h4>
                            </Show>

                            <Show when={flowPattern[flow()] === "phone"}>
                                <Motion.h4
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            delay: 0.01,
                                            easing: [0.19, 1, 0.22, 1],
                                            duration: 1.2,
                                        },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 1.01,
                                        y: -30,
                                        transition: {
                                            duration: 0.7,
                                            easing: [0.16, 1, 0.29, 0.99],
                                        },
                                    }}
                                    class="text-[#333232] text-[21px] leading-[120%] tracking-[-2%] font-medium font-instrument-sans"
                                >
                                    Enter your phone
                                </Motion.h4>
                            </Show>
                        </Presence>

                        <Presence exitBeforeEnter>
                            <Show when={flowPattern[flow()] === "name"}>
                                <Motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            delay: 0.01,
                                            easing: [0.19, 1, 0.22, 1],
                                            duration: 1.2,
                                        },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 1.01,
                                        y: -30,
                                        transition: {
                                            duration: 0.7,
                                            easing: [0.16, 1, 0.29, 0.99],
                                        },
                                    }}
                                    class="bg-[#F5F5F5] flex flex-col gap-0.5 justify-center p-[12px] rounded-[16px] w-[374px] h-[70px]"
                                >
                                    <p class="text-[#6B6B6B] text-[13px] font-inter">
                                        Your name
                                    </p>
                                    <input
                                        type="text"
                                        class="font-inter text-[17px] outline-none border-none text-[##1D1D1F]"
                                        placeholder="type here"
                                        value="Vish Vadlamani"
                                    />
                                </Motion.div>
                            </Show>

                            <Show when={flowPattern[flow()] === "email"}>
                                <Motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            delay: 0.01,
                                            easing: [0.19, 1, 0.22, 1],
                                            duration: 1.2,
                                        },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 1.01,
                                        y: -30,
                                        transition: {
                                            duration: 0.7,
                                            easing: [0.16, 1, 0.29, 0.99],
                                        },
                                    }}
                                    class="bg-[#F5F5F5] flex flex-col gap-0.5 justify-center p-[12px] rounded-[16px] w-[374px] h-[70px]"
                                >
                                    <p class="text-[#6B6B6B] text-[13px] font-inter">
                                        Your email
                                    </p>
                                    <input
                                        type="text"
                                        class="font-inter text-[17px] outline-none border-none text-[##1D1D1F]"
                                        placeholder="type here"
                                    />
                                </Motion.div>
                            </Show>

                            <Show when={flowPattern[flow()] === "phone"}>
                                <Motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            delay: 0.01,
                                            easing: [0.19, 1, 0.22, 1],
                                            duration: 1.2,
                                        },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 1.01,
                                        y: -30,
                                        transition: {
                                            duration: 0.7,
                                            easing: [0.16, 1, 0.29, 0.99],
                                        },
                                    }}
                                    class="bg-[#F5F5F5] flex flex-col gap-0.5 justify-center p-[12px] rounded-[16px] w-[374px] h-[70px]"
                                >
                                    <p class="text-[#6B6B6B] text-[13px] font-inter">
                                        Your phone number
                                    </p>
                                    <input
                                        type="text"
                                        class="font-inter text-[17px] outline-none border-none text-[##1D1D1F]"
                                        placeholder="type here"
                                    />
                                </Motion.div>
                            </Show>
                        </Presence>

                        <button
                            on:click={() => setFlow((v) => (v + 1) % flowPattern.length)}
                            class="bg-black w-[56px] h-[56px] flex items-center justify-center rounded-full mt-auto self-end"
                        >
                            <img
                                src="/arrow-right.svg"
                                alt=""
                                class="w-[24px] h-[24px]"
                            />
                        </button>
                    </div>
                    <div class="bg-[#f5f5f5] w-[500px] h-[276px] rounded-[24px]"></div>
                </div>
            </div>
        </>
    );
}
