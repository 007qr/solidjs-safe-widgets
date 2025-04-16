import clsx from "clsx";
import { EditorElement, useEditor } from "../providers/editor-provider";
import { v4 } from "uuid";
import { defaultStyles, defaultContainerStyles } from "../lib/constants";
import Recursive from "./recursive-component";
import { For, Show, createSignal } from "solid-js";
import { VsTrash } from "solid-icons/vs";

type Props = {
    element: EditorElement;
};

export default function Container(props: Props) {
    const { state, dispatch } = useEditor();
    const { id, name, styles, type } = props.element;
    const [dropTarget, setDropTarget] = createSignal<string | null>(null);
    const [gridPosition, setGridPosition] = createSignal({ row: -1, col: -1 });

    // Define grid settings
    const gridColumns = 12;
    const cellWidth = 100 / gridColumns;

    const handleOnDrop = (e: DragEvent, containerId: string) => {
        e.preventDefault();
        e.stopPropagation();

        // Check if we're moving an existing element
        const moveElementId = e.dataTransfer?.getData("moveElementId");
        if (moveElementId) {
            // Find the element we're moving
            const elementToMove = findElementById(
                state.editor.elements,
                moveElementId
            );
            if (elementToMove && e.currentTarget) {
                // Calculate the grid position for placement
                const containerElement = e.currentTarget as HTMLElement;
                const rect = containerElement.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate which column and row we're dropping into
                const col = Math.floor(x / (rect.width / gridColumns));
                const row = Math.floor(y / 50);

                // First remove the element from its current position
                dispatch({
                    type: "DELETE_ELEMENT",
                    payload: {
                        elementDetails: elementToMove,
                    },
                });

                // Then add it to the new position with updated grid position
                dispatch({
                    type: "ADD_ELEMENT",
                    payload: {
                        containerId: containerId,
                        elementDetails: {
                            ...elementToMove,
                            // Update position based on drop location
                            styles: {
                                ...elementToMove.styles,
                                gridColumn: `${col + 1} / span ${Math.max(
                                    1,
                                    Math.floor(
                                        parseInt(
                                            (elementToMove.styles
                                                .width as string) || "100px"
                                        ) /
                                            (rect.width / gridColumns)
                                    )
                                )}`,
                                gridRow: `${row + 1} / span 1`,
                            },
                        },
                    },
                });
            }
            setDropTarget(null);
            return;
        }

        const componentType = e.dataTransfer?.getData("componentType");
        if (!componentType || !e.currentTarget) {
            setDropTarget(null);
            return;
        }

        // Calculate the grid position for placement
        const containerElement = e.currentTarget as HTMLElement;
        const rect = containerElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate which column and row we're dropping into
        const col = Math.floor(x / (rect.width / gridColumns));
        const row = Math.floor(y / 50);

        switch (componentType) {
            case "text":
                dispatch({
                    type: "ADD_ELEMENT",
                    payload: {
                        containerId: containerId,
                        elementDetails: {
                            content: { innerText: "Text Element" },
                            id: v4(),
                            name: "Text",
                            styles: {
                                ...defaultStyles,
                                gridColumn: `${col + 1} / span 3`,
                                gridRow: `${row + 1} / span 1`,
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
                        containerId: containerId,
                        elementDetails: {
                            content: [],
                            id: v4(),
                            name: "Container",
                            styles: {
                                ...defaultContainerStyles,
                                gridColumn: `${col + 1} / span 6`,
                                gridRow: `${row + 1} / span 2`,
                            },
                            type: "container",
                        },
                    },
                });
                break;
            default:
        }
        setDropTarget(null);
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();

        if (type === "__body" && e.currentTarget) {
            setDropTarget(id);

            // Calculate grid position
            const rect = (
                e.currentTarget as HTMLElement
            ).getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Get grid cell position
            const col = Math.min(
                gridColumns - 1,
                Math.max(0, Math.floor(x / (rect.width / gridColumns)))
            );
            const row = Math.max(0, Math.floor(y / 50));

            setGridPosition({ row, col });
        }
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        setDropTarget(null);
    };

    const onDragStart = (e: DragEvent, type: string) => {
        e.stopPropagation();
        if (type === "__body") return;

        // Set the data transfer
        if (e.dataTransfer) {
            e.dataTransfer.setData("componentType", type);
            e.dataTransfer.setData("moveElementId", id);
            e.dataTransfer.effectAllowed = "move";
        }

        // Make element transparent during drag
        if (e.currentTarget) {
            const target = e.currentTarget as HTMLElement;
            setTimeout(() => {
                target.style.opacity = "0.4";
            }, 0);
        }
    };

    const handleDragEnd = (e: DragEvent) => {
        if (e.currentTarget) {
            const target = e.currentTarget as HTMLElement;
            target.style.opacity = "1";
        }
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

    // Handle resizing from corner drag
    const handleMouseDown = (e: MouseEvent, position: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (type === "__body" || state.editor.liveMode || !e.currentTarget)
            return;

        // Get the exact component that is being resized
        const startX = e.clientX;
        const startY = e.clientY;

        // Explicitly cast currentTarget to HTMLElement to use closest
        const currentTarget = e.currentTarget as HTMLElement;
        const element = currentTarget.closest('div[draggable="true"]');
        if (!element) return;

        // Cast element to HTMLElement to access offsetWidth
        const htmlElement = element as HTMLElement;

        // Get initial dimensions
        const startWidth =
            parseInt((props.element.styles.width as string) || "0", 10) ||
            htmlElement.offsetWidth;
        const startHeight =
            parseInt((props.element.styles.height as string) || "0", 10) ||
            htmlElement.offsetHeight;

        // Create a unique resize identifier
        const resizeId = `resize-${props.element.id}-${Date.now()}`;
        element.setAttribute("data-resize-id", resizeId);

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;

            // Adjust the width and height based on the direction
            let newWidth = startWidth;
            let newHeight = startHeight;

            if (position.includes("e")) {
                // East - right side
                newWidth = Math.max(100, startWidth + dx);
            }
            if (position.includes("s")) {
                // South - bottom
                newHeight = Math.max(40, startHeight + dy);
            }

            // Get current element again to ensure we're updating the right one
            const currentElement = document.querySelector(
                `div[data-resize-id="${resizeId}"]`
            );
            if (!currentElement) return;

            // Update element with new size
            const updatedElement = {
                ...props.element,
                styles: {
                    ...props.element.styles,
                    width: `${newWidth}px`,
                    height: `${newHeight}px`,
                },
            };

            dispatch({
                type: "UPDATE_ELEMENT",
                payload: {
                    elementDetails: updatedElement,
                },
            });
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            // Clean up the resize identifier
            element.removeAttribute("data-resize-id");
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    // Helper function to find an element by ID
    const findElementById = (
        elements: EditorElement[],
        searchId: string
    ): EditorElement | null => {
        for (const element of elements) {
            if (element.id === searchId) {
                return element;
            }

            if (Array.isArray(element.content)) {
                const found = findElementById(element.content, searchId);
                if (found) {
                    return found;
                }
            }
        }

        return null;
    };

    const isSelected = state.editor.selectedElement.id === id;

    return (
        <div
            style={styles}
            class={clsx("relative transition-all", {
                "p-4": type !== "__body",
                "grid grid-cols-12 grid-flow-row auto-rows-max gap-4":
                    type === "__body",
                "max-w-full w-full": type === "container" || type === "2Col",
                "h-fit": type === "container",
                "h-full": type === "__body",
                "!border-blue-500":
                    isSelected && !state.editor.liveMode && type !== "__body",
                "!border-yellow-400 !border-4":
                    isSelected && !state.editor.liveMode && type === "__body",
                "!border-solid": isSelected && !state.editor.liveMode,
                "border-dashed border-[1px] border-slate-300":
                    !state.editor.liveMode && type !== "__body",
                "outline-dashed outline-2 outline-blue-300":
                    dropTarget() === id && !state.editor.liveMode,
            })}
            onDrop={(e) => handleOnDrop(e, id)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            draggable={type !== "__body" && !state.editor.liveMode}
            onDragStart={(e) => onDragStart(e, type)}
            onDragEnd={handleDragEnd}
            onClick={handleOnClickBody}
        >
            {isSelected && !state.editor.liveMode && type !== "__body" && (
                <div class="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg text-xs bg-blue-500 text-white px-2 py-0.5 z-10">
                    {name}
                </div>
            )}

            {/* Grid cell highlight for drop preview */}
            {dropTarget() === id &&
                type === "__body" &&
                !state.editor.liveMode && (
                    <div
                        class="absolute bg-blue-300 opacity-50 pointer-events-none transition-all border-2 border-blue-500 z-10"
                        style={{
                            "grid-column": `${gridPosition().col + 1} / span 3`,
                            "grid-row": `${gridPosition().row + 1} / span 1`,
                            "min-height": "50px",
                            width: "100%",
                            height: "100%",
                            "border-radius": "4px",
                            "box-shadow": "0 0 0 2px rgba(59, 130, 246, 0.3)",
                        }}
                    />
                )}

            <For
                each={
                    Array.isArray(props.element.content)
                        ? props.element.content
                        : []
                }
            >
                {(childElement) => <Recursive element={childElement} />}
            </For>

            {/* Resize handle */}
            {isSelected && !state.editor.liveMode && type !== "__body" && (
                <div
                    class="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize z-20"
                    onMouseDown={(e) => handleMouseDown(e, "se")}
                />
            )}

            <Show
                when={isSelected && !state.editor.liveMode && type !== "__body"}
            >
                <div class="absolute px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white bg-red-500 z-10">
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
