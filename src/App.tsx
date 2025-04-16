import { createSignal, createEffect } from "solid-js";
import "./App.module.css";
import { EditorProvider, useEditor } from "./providers/editor-provider";
import ComponentsTabs from "./components/compoenents-tabs";
import DesignGrid from "./components/DesignGrid";
import PropertiesPanel from "./components/PropertiesPanel";

function AppContent() {
    const { state, dispatch } = useEditor();
    const [liveMode, setLiveMode] = createSignal<boolean>(false);

    // Sync live mode with the editor state
    createEffect(() => {
        dispatch({
            type: "TOGGLE_LIVE_MODE",
            payload: { liveMode: liveMode() },
        });
    });

    // Reset function to clear the canvas
    const handleReset = () => {
        if (
            confirm(
                "Are you sure you want to clear the canvas? This action cannot be undone."
            )
        ) {
            // Find the body element
            const bodyElement = state.editor.elements.find(
                (el) => el.type === "__body"
            );
            if (bodyElement) {
                // Update it with empty content
                dispatch({
                    type: "UPDATE_ELEMENT",
                    payload: {
                        elementDetails: {
                            ...bodyElement,
                            content: [],
                        },
                    },
                });
            }
        }
    };

    // Undo/redo are placeholders for now
    const handleUndo = () => {
        alert("Undo functionality would be implemented here");
    };

    const handleRedo = () => {
        alert("Redo functionality would be implemented here");
    };

    return (
        <div class="flex h-screen w-screen overflow-hidden">
            {/* Left Sidebar - Components */}
            <div class="w-64 h-full border-r bg-white p-4 overflow-y-auto">
                <h1 class="text-2xl font-bold mb-4">Components</h1>
                <ComponentsTabs />
            </div>

            {/* Main Content Area */}
            <div class="flex-1 h-full overflow-hidden relative">
                <div class="absolute top-0 left-0 right-0 bg-white border-b p-2 flex justify-between items-center z-10">
                    <div class="flex items-center gap-4">
                        <h1 class="text-xl font-medium">Design Canvas</h1>
                        <div class="flex items-center space-x-2 text-sm">
                            <select
                                class="border rounded px-2 py-1 text-sm"
                                title="Device size"
                            >
                                <option>Desktop</option>
                                <option>Tablet</option>
                                <option>Mobile</option>
                            </select>
                            <button
                                class="px-3 py-1 rounded text-sm bg-gray-100 hover:bg-gray-200"
                                onClick={handleUndo}
                            >
                                Undo
                            </button>
                            <button
                                class="px-3 py-1 rounded text-sm bg-gray-100 hover:bg-gray-200"
                                onClick={handleRedo}
                            >
                                Redo
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button
                            onClick={handleReset}
                            class="px-3 py-1 rounded text-sm bg-red-100 text-red-600 hover:bg-red-200"
                        >
                            Clear Canvas
                        </button>
                        <button
                            onClick={() => setLiveMode(!liveMode())}
                            class="px-3 py-1 rounded text-sm bg-blue-500 text-white hover:bg-blue-600"
                        >
                            {liveMode() ? "Edit Mode" : "Live Preview"}
                        </button>
                        <button class="px-3 py-1 rounded text-sm bg-green-500 text-white hover:bg-green-600">
                            Save
                        </button>
                    </div>
                </div>

                {/* Design Grid */}
                <div class="pt-12 h-full">
                    <DesignGrid />
                </div>
            </div>

            {/* Right Sidebar - Properties */}
            <div class="w-72 h-full border-l bg-white p-4 overflow-y-auto">
                <h1 class="text-2xl font-bold mb-4">Properties</h1>
                <PropertiesPanel />
            </div>
        </div>
    );
}

function App() {
    return (
        <EditorProvider>
            <AppContent />
        </EditorProvider>
    );
}

export default App;
