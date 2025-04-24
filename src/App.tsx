import { For } from "solid-js";
import Logo from "./components/icons/Logo";

export default function App() {
    const firstLine = "Hey👋 You're new here.";
    const secondLine = "Let's get you setup.";

    return (
        <>
            <nav class="p-[10px]">
                <div class="w-[48px] h-[48px] bg-white items-center flex justify-center rounded-full">
                    <Logo size={"32"} />
                </div>
            </nav>

            <div class="w-[1150px] mx-auto rounded-[32px]">
                <h1 class="font-instrument-sans text-[48px] leading-[120%] tracking-[-2%] font-bold mt-[141px]">
                    <span class="sr-only">
                        Hey👋 You're new here. Let's get you setup!
                    </span>

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
                    </For>
                </h1>

                <div class="bg-white mt-[182px] w-full h-[340px] rounded-[32px] p-[32px] flex justify-between mb-[100px]">
                    <div class="flex flex-col gap-[16px]">
                        <h4 class="text-[#333232] text-[21px] leading-[120%] tracking-[-2%] font-medium font-instrument-sans">Enter your name</h4>
                        <div class="bg-[#F5F5F5] flex flex-col gap-0.5 justify-center p-[12px] rounded-[16px] w-[374px] h-[70px]">
                            <p class="text-[#6B6B6B] text-[13px] font-inter">Your name</p>
                            <input type="text"  class="font-inter text-[17px] outline-none border-none text-[##1D1D1F]" placeholder="type here" value="Vish Vadlamani"/>
                        </div>
                    </div>
                    <div class="bg-[#f5f5f5] w-[500px] h-[276px] rounded-[24px]">

                    </div>
                </div>
            </div>
        </>
    );
}
