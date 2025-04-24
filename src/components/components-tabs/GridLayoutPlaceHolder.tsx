import { FiGrid } from 'solid-icons/fi'
interface Props {

};

export default function GridLayoutPlaceHolder(props: Props) {
    const handleDragStart = (e: DragEvent, type: string) => {
        if (type == null) return;
        e.dataTransfer?.setData('componentType', type);
    }
    return (
        <>
            <div draggable={true} on:dragstart={(e) => handleDragStart(e, 'grid')} class="h-14 w-14 bg-amber-100 rounded-lg flex items-center justify-center">
                <FiGrid size={32}/>
            </div>
        </>
    )
}