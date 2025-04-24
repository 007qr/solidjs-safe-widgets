import { createStore } from "solid-js/store";
import { createSignal, onMount, Show } from "solid-js";
import { Portal } from "solid-js/web";

type DraggableElementPosition = {
    translateX: number;
    translateY: number;
    width: number;
    height: number;
    isDragging: boolean;
    initialLeft: number; // Absolute starting position (not translation)
    initialTop: number; // Absolute starting position (not translation)
};

type GridCell = {
    id: string;
    row: number;
    col: number;
    isOccupied: boolean;
    isHovered: boolean;
};

export default function DraggableComponent(props: {
    ref: HTMLElement | undefined;
}) {
    let ref: HTMLDivElement | undefined;
    let ghostRef: HTMLDivElement | undefined;

    const [position, setPosition] = createStore<DraggableElementPosition>({
        translateX: 0,
        translateY: 0,
        width: 0,
        height: 0,
        isDragging: false,
        initialLeft: 0,
        initialTop: 0,
    });

    const gridSize = {
        rows: 3,
        cols: 10,
        cellSize: 100,
    };

    // Create grid cells
    const [grid, setGrid] = createStore<GridCell[]>(
        Array.from({ length: gridSize.rows * gridSize.cols }, (_, index) => {
            const row = Math.floor(index / gridSize.cols);
            const col = index % gridSize.cols;
            return {
                id: `cell-${row}-${col}`,
                row,
                col,
                isOccupied: false,
                isHovered: false,
            };
        })
    );

    // Component placement on grid
    const [placement, setPlacement] = createStore({
        row: -1,
        col: -1,
        isPlaced: false,
    });

    // Track the drag position
    const [dragOffset, setDragOffset] = createSignal({ x: 0, y: 0 });

    // Initialize component dimensions
    onMount(() => {
        if (ref) {
            const rect = ref.getBoundingClientRect();
            setPosition({
                width: rect.width,
                height: rect.height,
                initialLeft: rect.left,
                initialTop: rect.top,
            });
        }
    });

    const handleDragStart = (e: DragEvent) => {
        if (!ref) return;

        // Set data transfer for drag operation
        e.dataTransfer?.setData("componentType", "text");

        // Make the default drag ghost transparent
        if (e.dataTransfer) {
            // Create a transparent drag image to hide the default one
            const dragImg = document.createElement("div");
            dragImg.style.opacity = "0";
            document.body.appendChild(dragImg);
            e.dataTransfer.setDragImage(dragImg, 0, 0);

            // Remove after drag starts
            setTimeout(() => {
                document.body.removeChild(dragImg);
            }, 0);
        }

        // Calculate offset from mouse position to element corner
        const rect = ref.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });

        // Store initial position of the element
        setPosition({
            isDragging: true,
            initialLeft: rect.left,
            initialTop: rect.top,
            translateX: 0,
            translateY: 0,
        });

        // If component was already placed, mark that cell as no longer occupied
        if (placement.isPlaced) {
            setGrid(
                (grid) =>
                    grid.row === placement.row && grid.col === placement.col,
                "isOccupied",
                false
            );

            setPlacement("isPlaced", false);
        }
    };

    const handleDrag = (e: DragEvent) => {
        if (!position.isDragging || !e.clientX) return;

        // Calculate new position based on mouse position minus the initial offset
        const newX = e.clientX - position.initialLeft - dragOffset().x;
        const newY = e.clientY - position.initialTop - dragOffset().y;

        setPosition({
            translateX: newX,
            translateY: newY,
        });
    };

    const handleDragEnd = (e: DragEvent) => {
        // Find the hovered cell
        const hoveredCell = grid.find((cell) => cell.isHovered);

        if (hoveredCell) {
            // Place component in the cell
            setPlacement({
                row: hoveredCell.row,
                col: hoveredCell.col,
                isPlaced: true,
            });

            // Mark cell as occupied
            setGrid((grid) => grid.id === hoveredCell.id, "isOccupied", true);
        }

        // Reset all hover states
        setGrid(() => true, "isHovered", false);

        // End dragging state
        setPosition("isDragging", false);

    };

    return (
        <>
            {/* Original element that stays in place */}
            <div
                ref={ref}
                draggable={true}
                class="border text-center p-1 bg-gray-200 rounded-sm cursor-move w-max"
                style={{
                    "user-select": "none",
                    opacity: position.isDragging ? "0.5" : "1",
                }}
                ondragstart={handleDragStart}
                ondrag={handleDrag}
                ondragend={handleDragEnd}
            >
                <h4 class="text-xl font-bold">Text Component</h4>
            </div>

            {/* Draggable element that follows the cursor */}
            <Show when={position.isDragging}>
                <Portal>
                    <div
                        id="text"
                        ref={ghostRef}
                        class="border text-center p-1 bg-gray-200 rounded-sm w-max absolute pointer-events-none"
                        style={{
                            left: `${position.initialLeft}px`,
                            top: `${position.initialTop}px`,
                            transform: `translate3d(${position.translateX}px, ${position.translateY}px, 0)`,
                            "user-select": "none",
                            "z-index": "1000",
                            "will-change": "transform",
                            width: `${position.width}px`,
                            "box-shadow": "0 4px 8px rgba(0,0,0,0.2)",
                            transition: "transform 0.05s ease-out", // Smooth movement
                        }}
                    >
                        <h4 class="text-xl font-bold">Text Component</h4>
                    </div>
                </Portal>
            </Show>
        </>
    );
}
