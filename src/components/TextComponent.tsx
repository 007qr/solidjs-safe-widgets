import clsx from "clsx";
import { EditorElement, useEditor } from "../providers/editor-provider";
import { VsTrash } from "solid-icons/vs";
import { Show } from "solid-js";

type Props = {
    element: EditorElement;
};

export default function TextComponent(props: Props) {
    const { dispatch, state } = useEditor();

    const handleDeleteElement = () => {
        dispatch({
            type: "DELETE_ELEMENT",
            payload: { elementDetails: props.element },
        });
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

    const handleDragStart = (e: DragEvent) => {
        e.stopPropagation();
        if (state.editor.liveMode || !e.currentTarget || !e.dataTransfer)
            return;

        // Store the element ID to know what we're moving
        e.dataTransfer.setData("moveElementId", props.element.id);
        e.dataTransfer.effectAllowed = "move";

        // Create a clone of the element for the drag preview
        const node = e.currentTarget as HTMLElement;
        const clone = node.cloneNode(true) as HTMLElement;
        clone.style.width = node.offsetWidth + "px";
        clone.style.height = node.offsetHeight + "px";
        clone.style.opacity = "0.5";
        clone.style.position = "absolute";
        clone.style.top = "-1000px";
        document.body.appendChild(clone);

        e.dataTransfer.setDragImage(clone, 10, 10);

        // Make it slightly transparent when dragging
        setTimeout(() => {
            node.style.opacity = "0.4";
            document.body.removeChild(clone);
        }, 0);
    };

    const handleDragEnd = (e: DragEvent) => {
        e.stopPropagation();
        if (!e.target) return;

        const target = e.target as HTMLElement;
        target.style.opacity = "1";
    };

    // Handle resizing from corner drag
    const handleMouseDown = (e: MouseEvent, position: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (state.editor.liveMode || !e.currentTarget) return;

        // Get the exact component that is being resized
        const startX = e.clientX;
        const startY = e.clientY;

        // Cast to HTMLElement to use closest method
        const currentTarget = e.currentTarget as HTMLElement;
        const element = currentTarget.closest('div[draggable="true"]');

        if (!element) return;

        // Cast to HTMLElement to use offsetWidth/offsetHeight
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
        htmlElement.setAttribute("data-resize-id", resizeId);

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
            htmlElement.removeAttribute("data-resize-id");
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const isSelected = state.editor.selectedElement.id === props.element.id;

    return (
        <div
            draggable={!state.editor.liveMode}
            style={props.element.styles}
            class={clsx(
                "p-[2px] relative text-[16px] transition-all cursor-move",
                {
                    "!border-blue-500": isSelected,
                    "!border-solid": isSelected,
                    "border-dashed border-[1px] border-slate-300":
                        !state.editor.liveMode,
                }
            )}
            onClick={handleOnClickBody}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            {isSelected && !state.editor.liveMode && (
                <div class="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg text-xs bg-blue-500 text-white px-2 py-0.5 z-10">
                    {props.element.name}
                </div>
            )}
            <span
                contentEditable={!state.editor.liveMode}
                onBlur={(e) => {
                    const spanElement = e.target as HTMLSpanElement;
                    dispatch({
                        type: "UPDATE_ELEMENT",
                        payload: {
                            elementDetails: {
                                ...props.element,
                                content: {
                                    innerText: spanElement.innerText,
                                },
                            },
                        },
                    });
                }}
            >
                {!Array.isArray(props.element.content) &&
                    props.element.content.innerText}
            </span>

            {/* Resize handle */}
            {isSelected && !state.editor.liveMode && (
                <div
                    class="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize z-20"
                    onMouseDown={(e) => handleMouseDown(e, "se")}
                />
            )}

            <Show when={isSelected && !state.editor.liveMode}>
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
