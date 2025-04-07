import { children, JSX } from "solid-js";
import { cn } from "../../utils/cn";
import { ClassValue } from "clsx";

export default function Card(props: {class: ClassValue, children: JSX.Element}) {
    const c = children(() => props.children);

    return (<>
    <div class={cn("max-lg:min-w-[362px] max-lg:min-h-[582px] max-lg:w-full max-lg:h-full relative overflow-hidden min-w-[740px] min-h-[473px] w-[740px] h-[632px] rounded-[48px] flex items-center justify-center", props.class)}>

        {c()}
    </div>
    </>)
}