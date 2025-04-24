import {
    For,
    type Component,
    createEffect,
    onCleanup,
    createSignal,
    Show,
    createRenderEffect,
} from "solid-js";

import { OcDevicedesktop3 } from "solid-icons/oc";
import { BsLaptop } from "solid-icons/bs";
import { IoPhoneLandscapeOutline } from "solid-icons/io";
import { VsDeviceMobile } from "solid-icons/vs";
import { FiPlay } from "solid-icons/fi";

import { useEditor } from "./providers/editor-provider";
import Recursive from "./components/recursive-component";
import ComponentsTabs from "./components/components-tabs";
import SettingsTab from "./components/settings-tab";
import clsx from "clsx";
import { createStore, reconcile } from "solid-js/store";
import { Block, GridLayout } from "./utils/types";
import DraggableComponent from "./components/components-tabs/Draggable";

const EditorDebugLogger = () => {
    const { state } = useEditor();

    createEffect(() => {
        console.log("Editor state updated:", state);
        onCleanup(() => console.log("Cleanup"));
    });

    return null; // no UI
};

const App: Component = () => {
    let gridContainer: HTMLDivElement | undefined;
    const { state } = useEditor();
    const [block, setBlock] = createStore<Block>({} as Block);
    const [gridLayout, setGridLayout] = createStore<GridLayout>({
        width: 900,
        height: 900,
    } as GridLayout);

    const initializeArrayWithValues = (r: number, c: number, val = 0) => Array(r).fill(Array(c).fill(val));
    const [gridArray, setGridArray] = createSignal<Array<Array<number>>>(initializeArrayWithValues(3, 10, 0));

    const [rightSideBarState, setRightSideBarState] = createSignal<
        "elements" | "layers"
    >("elements");

    createEffect(() => {
        if (gridContainer!) {
            console.log(gridContainer.clientWidth);
            setGridLayout(
                reconcile({
                    width: gridContainer.clientWidth,
                    height: gridContainer.clientWidth,
                } as GridLayout)
            );
        }
    }, []);

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="0"
                height="0"
                style="position: absolute"
            >
                <defs>
                    <pattern
                        id="grid-pattern"
                        width={`${Math.round(gridLayout.width / 10)}`}
                        height={`${Math.round(gridLayout.width / 10)}`}
                        patternUnits="userSpaceOnUse"
                    >
                        <rect
                            x="4"
                            y="4"
                            width={`${
                                Math.round(gridLayout.width / 10) - 4 * 2
                            }`}
                            height={`${
                                Math.round(gridLayout.width / 10) - 4 * 2
                            }`}
                            fill="rgb(0,0,0, 0.2)"
                            id="grid-pattern__rect"
                        ></rect>
                    </pattern>
                </defs>
            </svg>
            <EditorDebugLogger />
            <div class="grid grid-rows-12 w-full max-h-screen h-screen">
                <nav class="grid-rows-1 grid items-center shadow-[0_10px_16px_0_rgba(0,0,0,0.01)] border-b-[#ebebeb] border-b">
                    <div class="flex gap-2.5 [grid-area:1/1/1/1] justify-self-center">
                        <OcDevicedesktop3
                            size={32}
                            class=" bg-[#f2f2f2] p-2 rounded-lg"
                        />
                        <BsLaptop
                            size={32}
                            class=" shadow-md bg-white p-2 rounded-lg"
                        />
                        <IoPhoneLandscapeOutline
                            size={32}
                            class=" bg-[#f2f2f2] p-2 rounded-lg"
                        />
                        <VsDeviceMobile
                            size={32}
                            class=" bg-[#f2f2f2] p-2 rounded-lg"
                        />
                    </div>
                    <div class="[grid-area:1/1/1/1] justify-self-end mr-10">
                        <span class="cursor-pointer">
                            <FiPlay size={20} color="#9c9c9c" />
                        </span>
                    </div>
                </nav>
                <div class="row-span-11 grid grid-cols-6 bg-[#eaeaea]">
                    <div class="col-span-1 bg-white shadow-[0_10px_16px_0_rgba(0,0,0,0.01)] border-r-[#ebebeb] border-r">
                        <div class="p-3 relative">
                            <div class="flex gap-5 mb-5">
                                <span
                                    onclick={() =>
                                        setRightSideBarState("elements")
                                    }
                                    class={clsx(
                                        "cursor-pointer",
                                        rightSideBarState() === "elements" &&
                                            "border-b-black/50 border-b-[3px]"
                                    )}
                                >
                                    Elements
                                </span>
                                <span
                                    onclick={() =>
                                        setRightSideBarState("layers")
                                    }
                                    class={clsx(
                                        "cursor-pointer",
                                        rightSideBarState() === "layers" &&
                                            "border-b-black/50 border-b-[3px]"
                                    )}
                                >
                                    Layers
                                </span>
                            </div>
                            <Show when={rightSideBarState() == "elements"}>
                                {/* <ComponentsTabs /> */}
                                <DraggableComponent ref={gridContainer!} />
                                <></>
                            </Show>
                            <Show when={rightSideBarState() == "layers"}>
                                <p>Layers will show up here</p>
                            </Show>
                        </div>
                    </div>
                    {/* @ts-ignore */}
                    <div
                        ref={gridContainer}
                        draggable="true"
                        class=" relative col-span-4 bg-white shadow-[0px_4px_10px_1px_rgba(0,0,0,0.05)] mx-auto h-max my-12 border-[#bebebe] border"
                        style={{
                            width: `${gridLayout.width}px`,
                        }}
                        ondragleave={(e) => {
                            if(!gridContainer) return;
                        }}
                        ondragover={(e) => {
                            e.preventDefault();
                            if(!gridContainer) return;
                        }}
                        ondrop={(e) => {
                            e.stopPropagation();
                            if(!gridContainer) return;
                            const rect = gridContainer.getBoundingClientRect();
                            
                            const r = Math.floor((e.clientY - rect.top)/90) + 1;
                            const c = Math.floor((e.clientX - rect.left)/90) + 1;
                            const rs = 2;
                            const cs = 2;


                            gridContainer.querySelectorAll(".container").forEach((el, key) => {
                                if (`grid-${key}` === el.getAttribute('data-id')) {
                                    const textComponent = document.createElement("div");
                                    textComponent.style.gridArea = `${r} / ${c} / span ${rs} / span ${cs}`
                                    textComponent.innerText = "Text Component";

                                    // check if that position is available
                                    if (gridArray()[r][c] === 0) {
                                        el.appendChild(textComponent);
                                        setGridArray((prev) => {
                                            
                                            return prev;
                                        });

                                        console.log(gridArray());
                                    } else {
                                        console.log("occupied");
                                    }
                                }

                            })
                        }}
                    >
                        <p class="absolute -translate-y-full font-bold text-xs text-[#adadad]">
                            Home
                        </p>
                        <div
                            data-id="grid-0"
                            class={`hover:border border-blue-500 relative w-full grid justify-items-center items-center container group min-h-[76px]`}
                            style={{
                                "grid-template-columns": `repeat(10, ${Math.round(
                                    gridLayout.width / 10
                                )}px)`,
                                "grid-template-rows": `repeat(3, ${Math.round(
                                    gridLayout.width / 10
                                )}px)`,
                            }}
                        >
                             <div
                                class="bg-[#0000001a] w-full h-full z-0 hidden grid-placeholder"
                                style={{
                                    "grid-area": "1 / 1 / span 1 / span 2",
                                }}
                            ></div>
                            <svg
                                class="z-10 absolute [pointer-events:none] duration-300 "
                                width="100%"
                                height="100%"
                            >
                                <rect
                                    width="100%"
                                    height="100%"
                                    fill="url(#grid-pattern)"
                                ></rect>
                            </svg>

                           
                        </div>
                        {/* <For
                            each={
                                Array.isArray(state.editor.elements)
                                    ? state.editor.elements
                                    : []
                            }
                        >
                            {(childElement) => (
                                <Recursive element={childElement} />
                            )}
                        </For> */}
                    </div>
                    <div class="z-10 col-span-1 bg-white shadow-[0_10px_16px_0_rgba(0,0,0,0.01)] border-l-[#ebebeb] border-l">
                        <div class="p-3">
                            <span>
                                <h2 class="mb-5 text-3xl font-bold">
                                    Properties
                                </h2>
                            </span>
                            <SettingsTab
                                gridLayout={gridLayout}
                                setGridLayout={setGridLayout}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
