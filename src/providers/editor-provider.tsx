import {
    createContext,
    createEffect,
    JSX,
    useContext,
    createSignal,
} from "solid-js";
import { createStore } from "solid-js/store";
import { EditorAction } from "./editor-action";

export type ElementStyles = {
    [key: string]: string | number;
};

export type EditorElement = {
    id: string;
    name: string;
    type: string;
    content: EditorElement[] | { innerText: string } | any;
    styles: ElementStyles;
};

export type Editor = {
    elements: EditorElement[];
    selectedElement: EditorElement;
    liveMode: boolean;
};

export type EditorState = {
    editor: Editor;
};

type EditorContextType = {
    state: EditorState;
    dispatch: (action: EditorAction) => void;
};

const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider(props: { children: JSX.Element }) {
    const [liveMode, setLiveMode] = createSignal<boolean>(false);

    // Create an initial state with an empty editor
    const [state, setState] = createStore<EditorState>({
        editor: {
            elements: [],
            selectedElement: {
                id: "",
                name: "",
                type: "",
                content: [],
                styles: {},
            },
            liveMode: liveMode(),
        },
    });

    // Update liveMode when it changes
    createEffect(() => {
        setState("editor", "liveMode", liveMode());
    });

    // Function to dispatch actions to update the state
    const dispatch = (action: EditorAction) => {
        switch (action.type) {
            case "ADD_ELEMENT":
                // Handle adding an element to a container
                if (action.payload.containerId) {
                    const updatedElements = addElementToContainer(
                        state.editor.elements,
                        action.payload.containerId,
                        action.payload.elementDetails
                    );
                    setState("editor", "elements", updatedElements);
                } else {
                    // Add the element to the root of the editor
                    setState("editor", "elements", [
                        ...state.editor.elements,
                        action.payload.elementDetails,
                    ]);
                }
                break;

            case "UPDATE_ELEMENT":
                // Update an element's properties
                const updatedElements = updateElement(
                    state.editor.elements,
                    action.payload.elementDetails
                );
                setState("editor", "elements", updatedElements);
                break;

            case "DELETE_ELEMENT":
                // Delete an element
                const filteredElements = deleteElement(
                    state.editor.elements,
                    action.payload.elementDetails.id
                );
                setState("editor", "elements", filteredElements);
                break;

            case "CHANGE_CLICKED_ELEMENT":
                // Set the selected element
                setState(
                    "editor",
                    "selectedElement",
                    action.payload.elementDetails
                );
                break;

            case "TOGGLE_LIVE_MODE":
                // Toggle live mode or set to specific value
                if (action.payload) {
                    setLiveMode(action.payload.liveMode);
                } else {
                    setLiveMode(!liveMode());
                }
                break;

            default:
                break;
        }
    };

    // Helper function to add an element to a container
    const addElementToContainer = (
        elements: EditorElement[],
        containerId: string,
        newElement: EditorElement
    ): EditorElement[] => {
        return elements.map((element) => {
            if (element.id === containerId) {
                return {
                    ...element,
                    content: Array.isArray(element.content)
                        ? [...element.content, newElement]
                        : [newElement],
                };
            }

            // If this element has children, recursively check them
            if (Array.isArray(element.content)) {
                return {
                    ...element,
                    content: addElementToContainer(
                        element.content,
                        containerId,
                        newElement
                    ),
                };
            }

            return element;
        });
    };

    // Helper function to update an element
    const updateElement = (
        elements: EditorElement[],
        updatedElement: EditorElement
    ): EditorElement[] => {
        return elements.map((element) => {
            if (element.id === updatedElement.id) {
                return updatedElement;
            }

            // If this element has children, recursively check them
            if (Array.isArray(element.content)) {
                return {
                    ...element,
                    content: updateElement(element.content, updatedElement),
                };
            }

            return element;
        });
    };

    // Helper function to delete an element
    const deleteElement = (
        elements: EditorElement[],
        elementId: string
    ): EditorElement[] => {
        return elements.filter((element) => {
            // Don't filter out the root element
            if (element.type === "__body") {
                if (Array.isArray(element.content)) {
                    element.content = deleteElement(element.content, elementId);
                }
                return true;
            }

            if (element.id === elementId) {
                return false;
            }

            // If this element has children, recursively check them
            if (Array.isArray(element.content)) {
                element.content = deleteElement(element.content, elementId);
            }

            return true;
        });
    };

    return (
        <EditorContext.Provider value={{ state, dispatch }}>
            {props.children}
        </EditorContext.Provider>
    );
}

// Custom hook to use the editor context
export function useEditor() {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error("useEditor must be used within an EditorProvider");
    }
    return context;
}

export default EditorProvider;