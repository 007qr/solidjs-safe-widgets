import clsx from "clsx";
import { EditorElement, useEditor } from "../providers/editor-provider";
import { v4 } from "uuid";
import { defaultStyles } from "../lib/constants";
import Recursive from "./recursive-component";
import { For, Show } from "solid-js";
import { VsTrash } from "solid-icons/vs";

type Props = {
    element: EditorElement;
};

export default function Container(props: Props) {
    const { state, dispatch } = useEditor();
    const { id, name, styles, type } = props.element;

    const handleOnDrop = (e: DragEvent, id: string) => {
        e.stopPropagation();
        const componentType = e.dataTransfer?.getData("componentType");
        switch (componentType) {
            case "text":
                dispatch({
                    type: "ADD_ELEMENT",
                    payload: {
                        containerId: id,
                        elementDetails: {
                            content: { innerText: "Text Element" },
                            id: v4(),
                            name: "text",
                            styles: {
                                color: "black",
                                ...defaultStyles,
                            },
                            type: "text",
                        },
                    },
                });
                break;
            case "container":
                dispatch({
                    type: "ADD_ELEMENT",
                    payload: {
                        containerId: id,
                        elementDetails: {
                            content: [],
                            id: v4(),
                            name: "Container",
                            styles: {
                                ...defaultStyles,
                            },
                            type: "container",
                        },
                    },
                });
                break;
            default:
        }
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
    };

    const onDragStart = (e: DragEvent, type: string) => {
        if (type == "__body") return;
        e.dataTransfer?.setData("componentType", type);
    };

    const handleOnClickBody = (e: MouseEvent) => {
        e.stopPropagation();
        dispatch({
            type: "CHANGE_CLICKED_ELEMENT",
            payload: {
                elementDetails: props.element,
            },
        });
    };

    const handleDeleteElement = () => {
        dispatch({
            type: "DELETE_ELEMENT",
            payload: {
                elementDetails: props.element,
            },
        });
    };

    return (
        <div
            style={styles}
            class={clsx("relative p-4 transition-all group", {
                "max-w-full w-full": type === "container" || type === "2Col",
                "h-fit": type === "container",
                "h-full": type === "__body",
                "flex flex-col md:flex-row": type === "2Col",

                "!border-blue-500":
                    state.editor.selectedElement.id === id &&
                    !state.editor.liveMode &&
                    state.editor.selectedElement.type !== "__body",

                "!border-yellow-400 !border-4":
                    state.editor.selectedElement.id === id &&
                    !state.editor.liveMode &&
                    state.editor.selectedElement.type === "__body",

                "!border-solid":
                    state.editor.selectedElement.id === id &&
                    !state.editor.liveMode,

                "border-dashed border-[1px] border-slate-300":
                    !state.editor.liveMode,
            })}
            on:drop={(e) => handleOnDrop(e, id)}
            on:dragover={handleDragOver}
            draggable={type != "__body"}
            on:click={handleOnClickBody}
            on:dragstart={(e) => onDragStart(e, "container")}
        >
            {state.editor.selectedElement.id === props.element.id &&
                !state.editor.liveMode && (
                    <div
                        class={clsx(
                            "absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg",
                            {
                                block:
                                    state.editor.selectedElement.id ===
                                        props.element.id &&
                                    !state.editor.liveMode,
                            }
                        )}
                    >
                        {name}
                    </div>
                )
            }
            <For
                each={
                    Array.isArray(props.element.content)
                        ? props.element.content
                        : []
                }
            >
                {(childElement) => <Recursive element={childElement} />}
            </For>

            <Show
                when={
                    state.editor.selectedElement.id === props.element.id &&
                    !state.editor.liveMode &&
                    state.editor.selectedElement.type !== "__body"
                }
            >
                <div class="absolute px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
                    <VsTrash
                        onClick={handleDeleteElement}
                        class="cursor-pointer"
                        size={16}
                    />
                </div>
            </Show>
        </div>
    );
}
