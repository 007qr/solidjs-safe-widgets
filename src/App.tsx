import { Accessor, createSignal, For, onMount, Show } from "solid-js";
import Logo from "./components/icons/Logo";
import { Motion, Presence } from "solid-motionone";
import * as Fathom from "fathom-client";
import { AdData, Events } from "./utils/types";
import { useParams, useSearchParams } from "@solidjs/router";

export type Flow = "email" | "name" | "phone" | "email-otp" | "otp" | "done";

export default function App() {
    const [email, setEmail] = createSignal<string>("");
    const [name, setName] = createSignal<string>("Vish Vadlamani");
    const [phone, setPhone] = createSignal<string>("");

    onMount(() => {
        Fathom.load("WHWYFZJD");
    });

    const onUserEntered = (flow: Flow) => {
        if (flow === "done") return;

        Fathom.trackEvent(`${flow}-entered`);
    };

    const firstLine = "Hey👋 You’re new here.";
    const secondLine = "Let’s get you setup.";
    const flowPattern = ["name", "email", "email-otp", "phone", "otp", "done"];
    const [flow, setFlow] = createSignal<number>(0);

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
            <nav class="p-[10px]">
                <div class="w-[48px] h-[48px] bg-white items-center flex justify-center rounded-full">
                    <Logo size={"32"} />
                </div>
            </nav>

            <div class="max-w-[1150px] mx-auto rounded-[32px]">
                <h2 class="gap-2 mt-[30px] font-instrument-sans font-medium text-[48px] max-md:text-[38px] leading-[120%] tracking-[-2%] text-black/80">
                    <For each={firstLine.split(" ")}>
                        {(item: string, index: Accessor<number>) => (
                            <>
                                <span
                                    class={`staggered-animation whitespace-pre inline-block animate-fade-in ${
                                        item === "new"
                                            ? "font-damion font-medium"
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
                                            ? "font-damion font-medium"
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
                <div class="bg-white mt-[152px] w-full gap-[20px] rounded-[32px] p-[32px] flex justify-between max-md:flex-wrap max-md:items-center">
                    <div class="w-full flex flex-col gap-[16px]">
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

                            <Show when={flowPattern[flow()] === "email-otp"}>
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
                                    Enter the OTP
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

                            <Show when={flowPattern[flow()] === "otp"}>
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
                                    Enter the OTP
                                </Motion.h4>
                            </Show>

                            <Show when={flowPattern[flow()] === "done"}>
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
                                    Congratulations 🎊
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
                                    class="bg-[#F5F5F5] flex flex-col gap-0.5 justify-center p-[12px] rounded-[16px] w-full max-w-[374px] h-[70px]"
                                >
                                    <p class="text-[#6B6B6B] text-[13px] font-inter">
                                        Your name
                                    </p>
                                    <input
                                        type="text"
                                        value={name()}
                                        onInput={(e) => {
                                            setName(e.target.value);
                                        }}
                                        class="font-inter text-[17px] outline-none border-none text-[##1D1D1F]"
                                        placeholder="type here"
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
                                        onInput={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        value={email()}
                                        type="text"
                                        class="font-inter text-[17px] outline-none border-none text-[##1D1D1F]"
                                        placeholder="type here"
                                    />
                                </Motion.div>
                            </Show>

                            <Show when={flowPattern[flow()] === "email-otp"}>
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
                                        OTP
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
                                        value={phone()}
                                        onInput={(e) => {
                                            setPhone(e.target.value);
                                        }}
                                        type="text"
                                        class="font-inter text-[17px] outline-none border-none text-[##1D1D1F]"
                                        placeholder="type here"
                                    />
                                </Motion.div>
                            </Show>

                            <Show when={flowPattern[flow()] === "otp"}>
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
                                        OTP
                                    </p>
                                    <input
                                        type="text"
                                        class="font-inter text-[17px] outline-none border-none text-[##1D1D1F]"
                                        placeholder="type here"
                                    />
                                </Motion.div>
                            </Show>
                        </Presence>

                        <div class="flex justify-end max-w-[374px] w-full mt-auto">
                            <button
                                on:click={() => {
                                    onUserEntered(flowPattern[flow()] as Flow);
                                    setFlow(
                                        (v) => (v + 1) % flowPattern.length
                                    );

                                    if (
                                        (flowPattern[flow()] as Flow) ===
                                        "email"
                                    ) {
                                        const data = {
                                            event_name: 'name-entered',
                                            clicks: 1,
                                            ad_id: searchParams.utm_content,
                                            campaign_id:
                                                searchParams.utm_campaign,
                                            adset_id: searchParams.utm_term,
                                            landing_page_id: "lp1",
                                            timestamp: new Date().toISOString(),
                                            utm_source: searchParams.utm_source,
                                        } as Events;

                                        fetch("http://127.0.0.1:8787/events", {
                                            method: "POST",
                                            body: JSON.stringify(data),
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                        })
                                            .then((res) =>
                                                console.log(res.json())
                                            )
                                            .then((res) => console.log(res))
                                            .catch((err) =>
                                                console.error("Error", err)
                                            );
                                    }

                                    if (
                                        (flowPattern[flow()] as Flow) === "done"
                                    ) {
                                        const data = {
                                            ad_id: searchParams.utm_content,
                                            campaign_id:
                                                searchParams.utm_campaign,
                                            adset_id: searchParams.utm_term,
                                            email: email(),
                                            landing_page_id: "lp1",
                                            phone: phone(),
                                            timestamp: new Date().toISOString(),
                                            utm_source: searchParams.utm_source,
                                        } as Events;

                                        fetch("http://127.0.0.1:8787/", {
                                            method: "POST",
                                            body: JSON.stringify(data),
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                        })
                                            .then((res) =>
                                                console.log(res.json())
                                            )
                                            .then((res) => console.log(res))
                                            .catch((err) =>
                                                console.error("Error", err)
                                            );

                                        data["event_name"] = "phone-entered";
                                        data["clicks"] = 1;
                                        fetch("http://127.0.0.1:8787/events", {
                                            method: "POST",
                                            body: JSON.stringify(data),
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                        })
                                            .then((res) =>
                                                console.log(res.json())
                                            )
                                            .then((res) => console.log(res))
                                            .catch((err) =>
                                                console.error("Error", err)
                                            );
                                    }

                                    if (
                                        (flowPattern[flow()] as Flow) ===
                                        "phone"
                                    ) {
                                        const data = {
                                            ad_id: searchParams.utm_content,
                                            campaign_id:
                                                searchParams.utm_campaign,
                                            adset_id: searchParams.utm_term,
                                            email: email(),
                                            landing_page_id: "lp1",
                                            timestamp: new Date().toISOString(),
                                            utm_source: searchParams.utm_source,
                                        } as Events;

                                        fetch("http://127.0.0.1:8787/", {
                                            method: "POST",
                                            body: JSON.stringify(data),
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                        })
                                            .then((res) =>
                                                console.log(res.json())
                                            )
                                            .then((res) => console.log(res))
                                            .catch((err) =>
                                                console.error("Error", err)
                                            );

                                        data["event_name"] = "email-entered";
                                        data["clicks"] = 1;

                                        fetch("http://127.0.0.1:8787/events", {
                                            method: "POST",
                                            body: JSON.stringify(data),
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                        });
                                    }
                                }}
                                class="bg-black w-[56px] h-[56px] flex items-center justify-center rounded-full mt-auto self-end"
                            >
                                <img
                                    src="/arrow-right.svg"
                                    alt=""
                                    class="w-[24px] h-[24px]"
                                />
                            </button>
                        </div>
                    </div>
                    <div class="bg-[#f5f5f5] w-full max-w-[500px] h-[276px] rounded-[24px]"></div>
                </div>
            </div>
        </>
    );
}
