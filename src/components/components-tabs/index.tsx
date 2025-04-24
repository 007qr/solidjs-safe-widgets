import { For, JSX } from "solid-js";
import TextPlaceHolder from "./TextPlaceHolder";
import ContainerPlaceHolder from "./ContainerPlaceHolder";
import GridLayoutPlaceHolder from "./GridLayoutPlaceHolder";

type Props = {};

const ComponentsTabs = (props: Props) => {
    const elements: {
        Component: () => JSX.Element;
        label: string;
        id: string;
        group: "layout" | "elements";
    }[] = [
        {
            Component: () => <TextPlaceHolder />,
            label: 'Text',
            id: 'text',
            group: 'elements'
        },
        {
            Component: () => <ContainerPlaceHolder />,
            label: 'Container',
            id: 'container',
            group: 'layout'
        },
        {
            Component: () => <GridLayoutPlaceHolder />,
            label: 'Grid',
            id: 'grid',
            group: 'layout'
        }
    ];

    return (
        <div class="flex flex-col gap-2.5">
            <h2 class="text-xl font-bold">Layout</h2>
            <div class="flex flex-wrap gap-2">
                <For
                    each={elements.filter(
                        (element) => element.group == "layout"
                    )}
                >
                    {(element) => (
                        <div class="flex-col items-center justify-center flex">
                            {element.Component()}
                            <span class="text-muted-foreground">
                                {element.label}
                            </span>
                        </div>
                    )}
                </For>
            </div>

            <h2 class="text-xl font-bold">Element</h2>
            <div class="flex flex-wrap gap-2">
                <For
                    each={elements.filter(
                        (element) => element.group == "elements"
                    )}
                >
                    {(element) => (
                        <div class="flex-col items-center justify-center flex">
                            {element.Component()}
                            <span class="text-muted-foreground">
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