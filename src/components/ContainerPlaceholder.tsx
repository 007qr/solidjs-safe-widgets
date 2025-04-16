import { FiBox } from "solid-icons/fi";

export default function ContainerPlaceholder() {
    const handleDragStart = (e: DragEvent, type: string) => {
        if (type == null) return;

        // Set the drag data
        e.dataTransfer?.setData("componentType", type);

        // Set effects
        e.dataTransfer!.effectAllowed = "copy";

        const dragIcon = document.createElement("div");
        dragIcon.innerHTML = "Container";
        dragIcon.className = "bg-blue-100 p-2 rounded text-sm opacity-70";
        document.body.appendChild(dragIcon);
        e.dataTransfer?.setDragImage(dragIcon, 0, 0);

        // Clean up the drag icon after a short delay
        setTimeout(() => {
            document.body.removeChild(dragIcon);
        }, 0);
    };

    return (
        <>
            <div
                draggable={true}
                onDragStart={(e) => handleDragStart(e, "container")}
                class="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center cursor-grab hover:bg-blue-200 transition-colors"
            >
                <FiBox size={40} class="text-blue-800" />
            </div>
        </>
    );
}
