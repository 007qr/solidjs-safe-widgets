import { FaRegularSquareFull } from 'solid-icons/fa'

export default function ContainerPlaceHolder() {
    
    const handleDragStart = (e: DragEvent, type: string) => {
        if (type == null) return;
        e.dataTransfer?.setData('componentType', type);
    }

    return (
        <>
            <div draggable={true} on:dragstart={(e) => handleDragStart(e, 'container')} class="h-14 w-14 bg-amber-100 rounded-lg flex items-center justify-center">
                <FaRegularSquareFull size={38}/>
            </div>
        </>
    )
}