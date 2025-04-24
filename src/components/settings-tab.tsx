import { Accessor, Component, createSignal, Setter, Show } from "solid-js";
import { useEditor } from "../providers/editor-provider";
import { RiArrowsArrowDownSLine } from "solid-icons/ri";
import clsx from "clsx";
import { GridLayout } from "../utils/types";
import { SetStoreFunction } from "solid-js/store";

type Props = {
    gridLayout: GridLayout;
    setGridLayout: SetStoreFunction<GridLayout>;
}

const SettingsTab = (props: Props) => {
    const [settingsState, setSettingsState] = createSignal<
        "custom" | "typography" | "background" | "display" | "none"
    >("display");
    const { state, dispatch } = useEditor();

    const handleChangeCustomValues = (e: any) => {
        const settingProperty = e.target.id;
        let value = e.target.value;
        const styleObject = {
            [settingProperty]: value,
        };

        dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
                elementDetails: {
                    ...state.editor.selectedElement,
                    content: {
                        ...state.editor.selectedElement.content,
                        ...styleObject,
                    },
                },
            },
        });
    };

    const handleOnChanges = (e: any) => {
        const settingProperty = e.target.id;
        let value = e.target.value;

        const styleObject = {
            [settingProperty]: value,
        };

        console.log(e.target.value);

        dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
                elementDetails: {
                    ...state.editor.selectedElement,
                    styles: {
                        ...state.editor.selectedElement.styles,
                        ...styleObject,
                    },
                },
            },
        });
    };

    return (
        <>
        <div class="flex flex-col gap-5">
            
            <div class="flex w-full gap-2.5">
                <span class="flex items-center justify-center gap-1.5">w: <input type="number" class="rounded-xl pl-2 w-16 p-0.5 bg-black/10" value={props.gridLayout.width} on:change={(e) => props.setGridLayout("width", Number(e.target.value))}/></span>
                <span class="flex items-center justify-center gap-1.5">h: <input type="number" class="rounded-xl pl-2 w-16 p-0.5 bg-black/10" value={props.gridLayout.height} on:change={(e) => props.setGridLayout("height",Number(e.target.value))} /></span>
            </div>

            {state.editor.selectedElement.type === "link" &&
                !Array.isArray(state.editor.selectedElement.content) && (
                    <>
                        <div>
                            <p class="text-xl font-bold">Custom</p>
                        </div>
                        <Show when={settingsState() === "custom"}>
                            <div class="flex flex-col gap-2">
                                <p>Link path</p>
                                <input
                                    type="text"
                                    id="href"
                                    placeholder="https://domain.example.com/pathname"
                                    on:change={handleChangeCustomValues}
                                    value={
                                        state.editor.selectedElement.content
                                            .href
                                    }
                                />
                            </div>
                        </Show>
                    </>
            )}

            <div class="space-y-1">
                <div
                    onClick={() => {
                        setSettingsState((value) =>
                            value === "typography" ? "none" : "typography"
                        );
                    }}
                    class="w-full cursor-pointer flex items-center justify-between"
                >
                    <p class="text-xl font-bold">Typography</p>
                    <span
                        class={clsx(
                            "-rotate-90",
                            settingsState() === "typography" && "rotate-0"
                        )}
                    >
                        <RiArrowsArrowDownSLine size={22} />
                    </span>
                </div>
                <Show when={settingsState() === "typography"}>
                    <div class="flex flex-col gap-2">
                        <p>Color</p>
                        <input
                            type="text"
                            id="color"
                            class="border border-gray-400 rounded-xl h-10 p-2"
                            onChange={handleOnChanges}
                            placeholder="#FFFFFF"
                            value={state.editor.selectedElement.styles.color || ""}
                        />
                        <p>Opacity</p>
                        <input
                            type="text"
                            id="opacity"
                            class="border border-gray-400 rounded-xl h-10 p-2"
                            onChange={(e) => {
                                e.target.value = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                );
                                handleOnChanges({
                                    target: {
                                        id: "opacity",
                                        value: `${e.target.value}%`,
                                    },
                                });
                            }}
                            max={100}
                            step={1}
                            value={
                                state.editor.selectedElement.styles.opacity ||
                                "100%"
                            }
                        />
                    </div>
                </Show>
            </div>

            <div class="space-y-1">
                <div
                    onClick={() => {
                        setSettingsState((value) =>
                            value === "display" ? "none" : "display"
                        );
                    }}
                    class="w-full cursor-pointer flex items-center justify-between"
                >
                    <p class="text-xl font-bold">Display</p>
                    <span
                        class={clsx(
                            "-rotate-90",
                            settingsState() === "display" && "rotate-0"
                        )}
                    >
                        <RiArrowsArrowDownSLine size={22} />
                    </span>
                </div>
                <Show when={settingsState() === "display"}>
                    <div class="flex flex-col gap-2">
                        <p>Display</p>
                        <select class="border h-10 rounded-xl" name="display" id="display" onChange={handleOnChanges} value={state.editor.selectedElement.styles.display || 'block'}>
                            <option value="flex">Flex</option>
                            <option value="block">Free</option>
                            <option value="grid">Grid</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </Show>
            </div>
        </div>
        </>
    );
};

export default SettingsTab;
