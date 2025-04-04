import {
    Component,
    createSignal,
    For,
    JSX,
    onCleanup,
    onMount,
    createEffect,
} from "solid-js";

// Define types for carousel item props
export type CarouselItemProps = {
    onNext: () => void;
};

// Define a type for carousel items that can be either direct JSX or render props
export type CarouselItem =
    | JSX.Element
    | ((props: CarouselItemProps) => JSX.Element);

// Define types for the carousel props
export type CarouselProps = {
    children: CarouselItem[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showIndicators?: boolean;
    cardWidth?: number; // Individual card width in pixels
    cardHeight?: number; // Individual card height in pixels
    cardGap?: number; // Gap between cards in pixels
};

const Carousel: Component<CarouselProps> = (props) => {
    // Default card dimensions and gap
    const cardWidth = props.cardWidth || 740;
    const cardHeight = props.cardHeight || 632;
    const cardGap = props.cardGap || 72;

    const [translateX, setTranslateX] = createSignal(0);
    const [isTransitioning, setIsTransitioning] = createSignal(false);
    const [totalItems, setTotalItems] = createSignal(props.children.length);
    const [visibleCards, setVisibleCards] = createSignal(0);
    const [currentPosition, setCurrentPosition] = createSignal(0);
    const [containerWidth, setContainerWidth] = createSignal(0);
    const [initialOffset, setInitialOffset] = createSignal(0);
    const [maxScrollPosition, setMaxScrollPosition] = createSignal(0);
    const autoPlayInterval = props.autoPlayInterval || 5000;

    let carouselRef: HTMLDivElement | undefined;
    let containerRef: HTMLDivElement | undefined;
    let contentRef: HTMLDivElement | undefined;
    let timer: number;

    // Calculate visible cards and initial positioning
    const calculateLayout = () => {
        if (!containerRef) return;
        
        const contWidth = containerRef.offsetWidth;
        setContainerWidth(contWidth);
        
        // Calculate how many cards can be fully visible
        const cardTotalWidth = cardWidth + cardGap;
        const visible = Math.max(1, Math.floor((contWidth + cardGap) / cardTotalWidth));
        setVisibleCards(visible);
        
        // Calculate center offset to start the carousel centered
        const centerOffset = Math.max(0, (contWidth - cardWidth) / 2);
        setInitialOffset(centerOffset);
        
        // Calculate the maximum scrolling position
        const totalContentWidth = totalItems() * (cardWidth + cardGap) - cardGap;
        const maxScroll = Math.max(0, totalContentWidth - contWidth + centerOffset/2 + cardGap/2);
        setMaxScrollPosition(maxScroll);
        
        // Reset current position and set initial translation
        setCurrentPosition(0);
        setTranslateX(centerOffset);
    };

    // Function to scroll right
    const scrollRight = () => {
        if (isTransitioning()) return;
        
        const currentTranslate = translateX();
        const scrollAmount = cardWidth + cardGap;
        
        // Calculate the next position, ensuring we don't go past the maximum
        const nextTranslate = Math.max(
            initialOffset() - maxScrollPosition(),
            currentTranslate - scrollAmount
        );
        
        // Only scroll if we're not at the end
        if (nextTranslate === currentTranslate) return;
        
        setTranslateX(nextTranslate);
        setCurrentPosition(currentPosition() + 1);
        setIsTransitioning(true);
        
        // Reset the transition state after animation completes
        setTimeout(() => setIsTransitioning(false), 300);
    };

    // Function to scroll left
    const scrollLeft = () => {
        if (isTransitioning()) return;
        
        const currentTranslate = translateX();
        const scrollAmount = cardWidth + cardGap;
        
        // Calculate the next position, ensuring we don't go past the initial offset
        const nextTranslate = Math.min(
            initialOffset(),
            currentTranslate + scrollAmount
        );
        
        // Only scroll if we're not at the beginning
        if (nextTranslate === currentTranslate) return;
        
        setTranslateX(nextTranslate);
        setCurrentPosition(currentPosition() - 1);
        setIsTransitioning(true);
        
        // Reset the transition state after animation completes
        setTimeout(() => setIsTransitioning(false), 300);
    };

    // Function to handle navigation to a specific dot/indicator
    const goToPosition = (position: number) => {
        if (isTransitioning()) return;
        
        const scrollAmount = (cardWidth + cardGap) * position;
        const nextTranslate = initialOffset() - scrollAmount;
        
        setTranslateX(nextTranslate);
        setCurrentPosition(position);
        setIsTransitioning(true);
        
        setTimeout(() => setIsTransitioning(false), 300);
    };

    // Setup auto play if enabled and calculate initial layout with a slight delay to ensure DOM is ready
    onMount(() => {
        // Use requestAnimationFrame to ensure the DOM is fully rendered
        requestAnimationFrame(() => {
            calculateLayout();
            
            // Add debounced window resize listener for performance
            let resizeTimer: number;
            const handleResize = () => {
                clearTimeout(resizeTimer);
                resizeTimer = window.setTimeout(() => {
                    calculateLayout();
                }, 250);
            };
            
            window.addEventListener('resize', handleResize);
            
            if (props.autoPlay) {
                timer = window.setInterval(scrollRight, autoPlayInterval);
            }
            
            // Clean up event listeners and timers
            onCleanup(() => {
                window.removeEventListener('resize', handleResize);
                clearTimeout(resizeTimer);
                if (timer) {
                    clearInterval(timer);
                }
            });
        });
    });

    // Recalculate layout when children change
    createEffect(() => {
        setTotalItems(props.children.length);
        if (containerRef) calculateLayout();
    });

    // Function to render each carousel item
    const renderItem = (item: CarouselItem) => {
        if (typeof item === "function") {
            return item({ onNext: scrollRight });
        }
        return item;
    };

    // Calculate if we should show the left/right buttons
    const showLeftButton = () => translateX() < initialOffset();
    const showRightButton = () => translateX() > initialOffset() - maxScrollPosition();

    return (
        <div class="relative overflow-hidden p-4" ref={carouselRef}>
            <div class="max-w-7xl mx-auto" ref={containerRef}>
                {/* Carousel content */}
                <div 
                    class="flex transition-transform duration-300 ease-in-out" 
                    style={{ transform: `translateX(${translateX()}px)` }}
                    ref={contentRef}
                >
                    <For each={props.children}>
                        {(item, index) => (
                            <div 
                                style={{
                                    "margin-right": index() < totalItems() - 1 ? `${cardGap}px` : "0"
                                }}
                                class="flex-shrink-0"
                            >
                                {renderItem(item)}
                            </div>
                        )}
                    </For>
                </div>
            </div>

            {/* Left button */}
            <button 
                class="absolute left-4 top-1/2 p-2 rounded-full z-30 -translate-y-1/2 bg-white text-lg text-black shadow-md" 
                style={{ 
                    opacity: showLeftButton() ? "1" : "0",
                    visibility: showLeftButton() ? "visible" : "hidden",
                    transition: "opacity 0.3s, visibility 0.3s"
                }}
                onClick={scrollLeft}
                disabled={!showLeftButton()}
                aria-label="Previous slide"
            >
                 ←
            </button>
            
            {/* Right button */}
            <button 
                class="absolute right-4 top-1/2 p-2 rounded-full z-30 -translate-y-1/2 bg-white text-lg text-black shadow-md" 
                style={{ 
                    opacity: showRightButton() ? "1" : "0",
                    visibility: showRightButton() ? "visible" : "hidden",
                    transition: "opacity 0.3s, visibility 0.3s"
                }}
                onClick={scrollRight}
                disabled={!showRightButton()}
                aria-label="Next slide"
            >
                →
            </button>

            {/* Indicators (optional) */}
            {props.showIndicators && (
                <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    <For each={Array(totalItems() - visibleCards() + 1).fill(0)}>
                        {(_, i) => (
                            <button
                                class="w-2 h-2 rounded-full transition-colors duration-200"
                                classList={{
                                    "bg-white": currentPosition() === i(),
                                    "bg-white/50": currentPosition() !== i()
                                }}
                                onClick={() => goToPosition(i())}
                                aria-label={`Go to slide ${i() + 1}`}
                            />
                        )}
                    </For>
                </div>
            )}
        </div>
    );
};

export default Carousel;