import { FiType } from "solid-icons/fi";

export default function TextPlaceHolder() {
    
    const handleDragStart = (e: DragEvent, type: string) => {
        if (type == null) return;
        e.dataTransfer?.setData('componentType', type);
    }

    return (
        <>
            <div draggable={true} on:dragstart={(e) => handleDragStart(e, 'text')} class="h-14 w-14 bg-amber-100 rounded-lg flex items-center justify-center">
                <FiType size={40} class="text-muted-foreground" />
            </div>
        </>
    )
}