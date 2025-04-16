import { createSignal, createEffect, onCleanup } from "solid-js";
import { useEditor } from "../providers/editor-provider";

export default function DebugPanel() {
    const { state } = useEditor();
    const [mousePosition, setMousePosition] = createSignal({ x: 0, y: 0 });
    const [gridPosition, setGridPosition] = createSignal({ col: 0, row: 0 });
    const [visible, setVisible] = createSignal(true);

    // Update mouse position on move
    const handleMouseMove = (e: MouseEvent) => {
        const container = document.querySelector('[data-type="__body"]');
        if (!container) return;

        const rect = container.getBoundingClientRect();
        if (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
        ) {
            // Calculate coordinates relative to the container
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate grid position (assuming 12 columns and 12 rows)
            const col = Math.min(Math.floor((x / rect.width) * 12) + 1, 12);
            const row = Math.min(Math.floor((y / rect.height) * 12) + 1, 12);

            setMousePosition({ x, y });
            setGridPosition({ col, row });
        }
    };

    createEffect(() => {
        // Only track mouse position in edit mode
        if (!state.editor.liveMode) {
            document.addEventListener("mousemove", handleMouseMove);

            onCleanup(() => {
                document.removeEventListener("mousemove", handleMouseMove);
            });
        }
    });

    if (state.editor.liveMode || !visible()) {
        return null;
    }

    return (
        <div class="absolute left-4 bottom-4 bg-white p-2 rounded-lg shadow-md text-xs z-50">
            <div class="flex justify-between items-center mb-1">
                <h4 class="font-medium">Grid Position</h4>
                <button
                    onClick={() => setVisible(false)}
                    class="text-gray-500 hover:text-gray-700"
                >
                    ×
                </button>
            </div>
            <div class="space-y-1">
                <div>
                    Mouse: {mousePosition().x.toFixed(0)}px,{" "}
                    {mousePosition().y.toFixed(0)}px
                </div>
                <div>
                    Grid: Col {gridPosition().col}, Row {gridPosition().row}
                </div>
                <div>
                    Grid Area:{" "}
                    <code>
                        grid-column: {gridPosition().col} / span 1; grid-row:{" "}
                        {gridPosition().row} / span 1;
                    </code>
                </div>
            </div>
        </div>
    );
}
