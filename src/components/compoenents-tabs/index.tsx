import { For, JSX } from "solid-js";
import TextPlaceHolder from "./TextPlaceHolder";
import ContainerPlaceholder from "../ContainerPlaceholder";

const ComponentsTabs = () => {
    const elements: {
        Component: () => JSX.Element;
        label: string;
        id: string;
        group: "layout" | "elements";
    }[] = [
        {
            Component: () => <ContainerPlaceholder />,
            label: "Container",
            id: "container",
            group: "layout",
        },
        {
            Component: () => <TextPlaceHolder />,
            label: "Text",
            id: "text",
            group: "elements",
        },
    ];

    return (
        <div class="flex flex-col gap-2.5">
            <h2 class="text-2xl">Layout</h2>
            <div class="flex flex-wrap gap-2">
                <For
                    each={elements.filter(
                        (element) => element.group == "layout"
                    )}
                >
                    {(element) => (
                        <div class="flex-col items-center justify-center flex">
                            {element.Component()}
                            <span class="text-sm mt-1 text-gray-600">
                                {element.label}
                            </span>
                        </div>
                    )}
                </For>
            </div>

            <h2 class="text-2xl mt-6">Elements</h2>
            <div class="flex flex-wrap gap-2">
                <For
                    each={elements.filter(
                        (element) => element.group == "elements"
                    )}
                >
                    {(element) => (
                        <div class="flex-col items-center justify-center flex">
                            {element.Component()}
                            <span class="text-sm mt-1 text-gray-600">
                                {element.label}
                            </span>
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
};

export default ComponentsTabs;
