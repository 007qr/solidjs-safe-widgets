import { createSignal, onCleanup, onMount, JSX } from "solid-js";
import { useEditor } from "../providers/editor-provider";

type ResizableElementProps = {
    children: JSX.Element;
    id: string;
    isSelected: boolean;
    onResize: (width: string, height: string) => void;
};

export default function ResizableElement(props: ResizableElementProps) {
    const { state } = useEditor();
    const [resizing, setResizing] = createSignal(false);
    const [startPos, setStartPos] = createSignal({ x: 0, y: 0 });
    const [elementSize, setElementSize] = createSignal({ width: 0, height: 0 });
    let elementRef: HTMLDivElement | undefined;

    // ResizeObserver to keep track of element size
    onMount(() => {
        if (!elementRef) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setElementSize({ width, height });
            }
        });

        observer.observe(elementRef);

        onCleanup(() => {
            observer.disconnect();
        });
    });

    // Start resize
    const handleResizeStart = (e: MouseEvent, direction: string) => {
        e.stopPropagation();
        setResizing(true);
        setStartPos({ x: e.clientX, y: e.clientY });

        // Add event listeners
        document.addEventListener("mousemove", handleResizeMove);
        document.addEventListener("mouseup", handleResizeEnd);
    };

    // During resize
    const handleResizeMove = (e: MouseEvent) => {
        if (!resizing() || !elementRef) return;

        const deltaX = e.clientX - startPos().x;
        const deltaY = e.clientY - startPos().y;

        // Calculate new size
        let newWidth = elementSize().width + deltaX;
        let newHeight = elementSize().height + deltaY;

        // Apply grid snapping
        newWidth = Math.round(newWidth / 20) * 20;
        newHeight = Math.round(newHeight / 20) * 20;

        // Minimum size
        newWidth = Math.max(newWidth, 50);
        newHeight = Math.max(newHeight, 50);

        // Update size
        props.onResize(`${newWidth}px`, `${newHeight}px`);

        // Update start position for next move
        setStartPos({ x: e.clientX, y: e.clientY });
    };

    // End resize
    const handleResizeEnd = () => {
        setResizing(false);
        document.removeEventListener("mousemove", handleResizeMove);
        document.removeEventListener("mouseup", handleResizeEnd);
    };

    return (
        <div
            ref={elementRef}
            class="relative group"
            classList={{ "pointer-events-none": resizing() }}
        >
            {/* The actual element */}
            {props.children}

            {/* Resize handles - only shown when selected and not in live mode */}
            {props.isSelected && !state.editor.liveMode && (
                <>
                    {/* SE corner resize handle */}
                    <div
                        class="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-bl-sm cursor-se-resize z-50"
                        onMouseDown={(e) => handleResizeStart(e, "se")}
                    />

                    {/* Resize visual indicators */}
                    <div class="absolute top-0 right-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100" />
                    <div class="absolute bottom-0 left-0 w-full h-1 bg-blue-500 opacity-0 group-hover:opacity-100" />
                </>
            )}
        </div>
    );
}
