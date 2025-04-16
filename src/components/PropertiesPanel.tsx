import { createSignal, For, Show, createEffect } from "solid-js";
import { useEditor } from "../providers/editor-provider";

export default function PropertiesPanel() {
  const { state, dispatch } = useEditor();
  const [activeTab, setActiveTab] = createSignal("style");
  const [customProperty, setCustomProperty] = createSignal("");
  const [customValue, setCustomValue] = createSignal("");

  // Update element style and immediately show the changes
  const updateElementStyle = (property: string, value: string) => {
    // Clone the selected element
    const selectedElement = { ...state.editor.selectedElement };
    
    // Update the style property
    selectedElement.styles = {
      ...selectedElement.styles,
      [property]: value
    };
    
    // Dispatch update
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: selectedElement
      }
    });
  };

  // Add a custom property to the element
  const addCustomProperty = () => {
    if (!customProperty() || !customValue()) return;
    
    updateElementStyle(customProperty(), customValue());
    setCustomProperty("");
    setCustomValue("");
  };

  const layoutStyles = [
    { name: "Width", property: "width", type: "text" },
    { name: "Height", property: "height", type: "text" },
    { name: "Padding", property: "padding", type: "text" },
    { name: "Margin", property: "margin", type: "text" },
  ];

  const gridStyles = [
    { name: "Grid Column", property: "gridColumn", type: "text" },
    { name: "Grid Row", property: "gridRow", type: "text" },
  ];

  const appearanceStyles = [
    { name: "Background", property: "backgroundColor", type: "color" },
    { name: "Border Width", property: "borderWidth", type: "text" },
    { name: "Border Style", property: "borderStyle", type: "select", options: ["none", "solid", "dashed", "dotted"] },
    { name: "Border Color", property: "borderColor", type: "color" },
    { name: "Border Radius", property: "borderRadius", type: "text" },
  ];

  const textStyles = [
    { name: "Text Color", property: "color", type: "color" },
    { name: "Font Size", property: "fontSize", type: "text" },
    { name: "Font Weight", property: "fontWeight", type: "select", options: ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
    { name: "Text Align", property: "textAlign", type: "select", options: ["left", "center", "right", "justify"] },
    { name: "Line Height", property: "lineHeight", type: "text" },
  ];

  // Determine if we have a selected element
  const hasSelectedElement = () => 
    state.editor.selectedElement && 
    state.editor.selectedElement.id !== "" &&
    !state.editor.liveMode;

  return (
    <div class="px-1">
      <Show 
        when={hasSelectedElement()}
        fallback={<p class="text-gray-500 text-sm">Select an element to edit its properties.</p>}
      >
        <div class="space-y-4">
          <div class="flex justify-between">
            <h2 class="text-lg font-medium text-gray-800">
              {state.editor.selectedElement.name}
            </h2>
            <span class="px-2 py-1 text-xs bg-gray-100 rounded-md">
              {state.editor.selectedElement.type}
            </span>
          </div>

          <div class="flex border-b">
            <button
              class={`py-2 px-4 focus:outline-none ${
                activeTab() === "style" 
                  ? "border-b-2 border-blue-500 font-medium" 
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("style")}
            >
              Style
            </button>
            <button
              class={`py-2 px-4 focus:outline-none ${
                activeTab() === "layout" 
                  ? "border-b-2 border-blue-500 font-medium" 
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("layout")}
            >
              Layout
            </button>
            <button
              class={`py-2 px-4 focus:outline-none ${
                activeTab() === "advanced" 
                  ? "border-b-2 border-blue-500 font-medium" 
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("advanced")}
            >
              Advanced
            </button>
          </div>

          <Show when={activeTab() === "style"}>
            <div class="space-y-4">
              <div class="space-y-2">
                <h3 class="text-sm font-medium text-gray-700">Appearance</h3>
                <div class="bg-gray-50 rounded-md p-3 space-y-2">
                  <For each={appearanceStyles}>
                    {(style) => (
                      <div class="grid grid-cols-2 gap-2 items-center">
                        <label class="text-xs text-gray-600">{style.name}</label>
                        {style.type === "select" ? (
                          <select
                            value={state.editor.selectedElement.styles[style.property] || ""}
                            onChange={(e) => 
                              updateElementStyle(style.property, e.currentTarget.value)
                            }
                            class="w-full px-2 py-1 text-xs border rounded bg-white"
                          >
                            <For each={style.options}>
                              {(option) => <option value={option}>{option}</option>}
                            </For>
                          </select>
                        ) : style.type === "color" ? (
                          <div class="flex items-center space-x-1">
                            <input
                              type="color"
                              value={state.editor.selectedElement.styles[style.property] || "#ffffff"}
                              onInput={(e) => 
                                updateElementStyle(style.property, e.currentTarget.value)
                              }
                              class="w-6 h-6 rounded border"
                            />
                            <input
                              type="text"
                              value={state.editor.selectedElement.styles[style.property] || ""}
                              onInput={(e) => 
                                updateElementStyle(style.property, e.currentTarget.value)
                              }
                              class="flex-1 px-2 py-1 text-xs border rounded"
                            />
                          </div>
                        ) : (
                          <input
                            type={style.type}
                            value={state.editor.selectedElement.styles[style.property] || ""}
                            onInput={(e) => 
                              updateElementStyle(style.property, e.currentTarget.value)
                            }
                            class="w-full px-2 py-1 text-xs border rounded"
                          />
                        )}
                      </div>
                    )}
                  </For>
                </div>
              </div>
              
              <Show when={state.editor.selectedElement.type === "text"}>
                <div class="space-y-2">
                  <h3 class="text-sm font-medium text-gray-700">Typography</h3>
                  <div class="bg-gray-50 rounded-md p-3 space-y-2">
                    <For each={textStyles}>
                      {(style) => (
                        <div class="grid grid-cols-2 gap-2 items-center">
                          <label class="text-xs text-gray-600">{style.name}</label>
                          {style.type === "select" ? (
                            <select
                              value={state.editor.selectedElement.styles[style.property] || ""}
                              onChange={(e) => 
                                updateElementStyle(style.property, e.currentTarget.value)
                              }
                              class="w-full px-2 py-1 text-xs border rounded bg-white"
                            >
                              <For each={style.options}>
                                {(option) => <option value={option}>{option}</option>}
                              </For>
                            </select>
                          ) : style.type === "color" ? (
                            <div class="flex items-center space-x-1">
                              <input
                                type="color"
                                value={state.editor.selectedElement.styles[style.property] || "#000000"}
                                onInput={(e) => 
                                  updateElementStyle(style.property, e.currentTarget.value)
                                }
                                class="w-6 h-6 rounded border"
                              />
                              <input
                                type="text"
                                value={state.editor.selectedElement.styles[style.property] || ""}
                                onInput={(e) => 
                                  updateElementStyle(style.property, e.currentTarget.value)
                                }
                                class="flex-1 px-2 py-1 text-xs border rounded"
                              />
                            </div>
                          ) : (
                            <input
                              type={style.type}
                              value={state.editor.selectedElement.styles[style.property] || ""}
                              onInput={(e) => 
                                updateElementStyle(style.property, e.currentTarget.value)
                              }
                              class="w-full px-2 py-1 text-xs border rounded"
                            />
                          )}
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              </Show>
            </div>
          </Show>
          
          <Show when={activeTab() === "layout"}>
            <div class="space-y-4">
              <div class="space-y-2">
                <h3 class="text-sm font-medium text-gray-700">Size & Spacing</h3>
                <div class="bg-gray-50 rounded-md p-3 space-y-2">
                  <For each={layoutStyles}>
                    {(style) => (
                      <div class="grid grid-cols-2 gap-2 items-center">
                        <label class="text-xs text-gray-600">{style.name}</label>
                        <input
                          type="text"
                          value={state.editor.selectedElement.styles[style.property] || ""}
                          onInput={(e) => 
                            updateElementStyle(style.property, e.currentTarget.value)
                          }
                          class="w-full px-2 py-1 text-xs border rounded"
                        />
                      </div>
                    )}
                  </For>
                </div>
              </div>
              
              <div class="space-y-2">
                <h3 class="text-sm font-medium text-gray-700">Grid Position</h3>
                <div class="bg-gray-50 rounded-md p-3 space-y-2">
                  <For each={gridStyles}>
                    {(style) => (
                      <div class="grid grid-cols-2 gap-2 items-center">
                        <label class="text-xs text-gray-600">{style.name}</label>
                        <input
                          type="text"
                          value={state.editor.selectedElement.styles[style.property] || ""}
                          onInput={(e) => 
                            updateElementStyle(style.property, e.currentTarget.value)
                          }
                          placeholder={style.property === "gridColumn" ? "span 3" : "span 1"}
                          class="w-full px-2 py-1 text-xs border rounded"
                        />
                      </div>
                    )}
                  </For>
                  <div class="pt-2 text-xs text-gray-500">
                    <p>Grid column examples: "span 3", "2 / 5", etc.</p>
                    <p>Grid row examples: "span 2", "1 / 3", etc.</p>
                  </div>
                </div>
              </div>
            </div>
          </Show>
          
          <Show when={activeTab() === "advanced"}>
            <div class="space-y-2">
              <h3 class="text-sm font-medium text-gray-700">Custom CSS Properties</h3>
              <div class="bg-gray-50 rounded-md p-3 space-y-3">
                <p class="text-xs text-gray-500">
                  Add any CSS property to customize the element.
                </p>
                <div class="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Property name"
                    value={customProperty()}
                    onInput={(e) => setCustomProperty(e.currentTarget.value)}
                    class="w-full px-2 py-1 text-xs border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={customValue()}
                    onInput={(e) => setCustomValue(e.currentTarget.value)}
                    class="w-full px-2 py-1 text-xs border rounded"
                  />
                </div>
                <button 
                  class="w-full mt-2 py-1 text-xs bg-blue-500 text-white hover:bg-blue-600 rounded disabled:opacity-50"
                  onClick={addCustomProperty}
                  disabled={!customProperty() || !customValue()}
                >
                  Add Property
                </button>
                
                <div class="mt-4 border-t pt-3">
                  <h4 class="text-xs font-medium mb-2">Current Custom Properties</h4>
                  <div class="max-h-40 overflow-y-auto">
                    <For each={Object.entries(state.editor.selectedElement.styles || {})}>
                      {([key, value]) => (
                        <div class="flex justify-between items-center py-1 text-xs border-b border-gray-100">
                          <span class="text-gray-600">{key}:</span>
                          <span class="font-mono">{value as string}</span>
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              </div>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
}
