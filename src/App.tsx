import {
    For,
    type Component,
    createEffect,
    onCleanup,
    createSignal,
    Show,
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

const EditorDebugLogger = () => {
    const { state } = useEditor();

    createEffect(() => {
        console.log("Editor state updated:", state);
        onCleanup(() => console.log("Cleanup"));
    });

    return null; // no UI
};

const App: Component = () => {
    const { state } = useEditor();

    const [rightSideBarState, setRightSideBarState] = createSignal<
        "elements" | "layers"
    >("elements");

    return (
        <>
            <EditorDebugLogger />
            <div class="grid grid-rows-12 w-full max-h-screen h-screen">
                <div class="grid-rows-1 grid items-center border-b">
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
                </div>
                <div class="row-span-11 grid grid-cols-6">
                    <div class="col-span-1 bg-white shadow-md border-r">
                        <div class="p-3">
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
                                <ComponentsTabs />
                            </Show>
                            <Show when={rightSideBarState() == "layers"}>
                                <p>Layers will show up here</p>
                            </Show>
                        </div>
                    </div>
                    <div class="col-span-4 bg-gray-300/20">
                        <For
                            each={
                                Array.isArray(state.editor.elements)
                                    ? state.editor.elements
                                    : []
                            }
                        >
                            {(childElement) => (
                                <Recursive element={childElement} />
                            )}
                        </For>
                    </div>
                    <div class="col-span-1 bg-white shadow-md border-l">
                        <div class="p-3">
                            <span class="cursor-pointer">
                                <h2 class="mb-5 text-3xl font-bold">
                                    Properties
                                </h2>
                            </span>
                            <SettingsTab />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
