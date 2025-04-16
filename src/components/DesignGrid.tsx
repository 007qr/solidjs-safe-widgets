import { createSignal, onMount } from "solid-js";
import { useEditor } from "../providers/editor-provider";
import Container from "./Container";
import clsx from "clsx";

export default function DesignGrid() {
    const { state, dispatch } = useEditor();
    const [dimensions, setDimensions] = createSignal({
        width: 1200,
        height: 800,
    });

    // Find the __body container element or create it if it doesn't exist
    const getRootElement = () => {
        const existingRoot = state.editor.elements.find(
            (el) => el.type === "__body"
        );

        if (existingRoot) {
            return existingRoot;
        }

        // Create a root container if it doesn't exist
        const rootElement = {
            id: "__body",
            name: "Body",
            type: "__body",
            content: [],
            styles: {
                position: "relative",
                width: "100%",
                height: "100%",
                padding: "20px",
                backgroundColor: "#f5f5f5",
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gridAutoRows: "minmax(50px, auto)",
                gridGap: "16px",
                overflow: "auto",
            },
        };

        dispatch({
            type: "ADD_ELEMENT",
            payload: {
                containerId: null,
                elementDetails: rootElement,
            },
        });

        return rootElement;
    };

    onMount(() => {
        const rootElement = getRootElement();

        // If the root element has just been created, set it as the selected element
        if (state.editor.selectedElement.id !== rootElement.id) {
            dispatch({
                type: "CHANGE_CLICKED_ELEMENT",
                payload: {
                    elementDetails: rootElement,
                },
            });
        }
    });

    return (
        <div class="w-full h-full overflow-auto flex items-center justify-center p-8 bg-gray-100">
            <div
                class={clsx(
                    "rounded-lg shadow-lg overflow-hidden bg-white relative",
                    {
                        "border-2 border-blue-500":
                            state.editor.liveMode === false,
                    }
                )}
                style={{
                    width: `${dimensions().width}px`,
                    height: `${dimensions().height}px`,
                }}
            >
                {/* Grid Guidelines (only visible in edit mode) */}
                {!state.editor.liveMode && (
                    <div class="absolute inset-0 pointer-events-none z-0">
                        <div class="w-full h-full grid grid-cols-12 gap-4">
                            {Array(12)
                                .fill(0)
                                .map(() => (
                                    <div class="h-full bg-blue-100 opacity-20 border border-blue-200"></div>
                                ))}
                        </div>
                    </div>
                )}

                {/* This is the design grid area */}
                <div class="relative z-10 h-full">
                    <Container element={getRootElement()} />
                </div>
            </div>

            {/* Grid Size Controls (only visible in editor mode) */}
            {!state.editor.liveMode && (
                <div class="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md space-y-3">
                    <h3 class="font-medium text-sm">Canvas Size</h3>
                    <div class="flex space-x-4">
                        <div>
                            <label class="text-xs text-gray-600 block">
                                Width (px)
                            </label>
                            <input
                                type="number"
                                value={dimensions().width}
                                min={480}
                                max={1920}
                                step={10}
                                onInput={(e) => {
                                    const width = parseInt(
                                        e.currentTarget.value,
                                        10
                                    );
                                    setDimensions({ ...dimensions(), width });
                                }}
                                class="block w-20 px-2 py-1 border rounded text-sm"
                            />
                        </div>
                        <div>
                            <label class="text-xs text-gray-600 block">
                                Height (px)
                            </label>
                            <input
                                type="number"
                                value={dimensions().height}
                                min={320}
                                max={1080}
                                step={10}
                                onInput={(e) => {
                                    const height = parseInt(
                                        e.currentTarget.value,
                                        10
                                    );
                                    setDimensions({ ...dimensions(), height });
                                }}
                                class="block w-20 px-2 py-1 border rounded text-sm"
                            />
                        </div>
                    </div>

                    <div class="pt-2 border-t">
                        <button
                            class="w-full bg-blue-500 text-white text-xs py-1 px-2 rounded hover:bg-blue-600"
                            onClick={() =>
                                setDimensions({ width: 1200, height: 800 })
                            }
                        >
                            Reset Size
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
