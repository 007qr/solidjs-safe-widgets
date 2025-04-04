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
    const [translateX, setTranslateX] = createSignal(0);
    const [isTransitioning, setIsTransitioning] = createSignal(false);
    const [totalItems, setTotalItems] = createSignal(props.children.length);
    const [visibleCards, setVisibleCards] = createSignal(0);
    const [currentPosition, setCurrentPosition] = createSignal(0);
    const autoPlayInterval = props.autoPlayInterval || 5000;
    
    // Default card dimensions and gap
    const cardWidth = props.cardWidth || 640;
    const cardHeight = props.cardHeight || 632;
    const cardGap = props.cardGap || 72;

    let carouselRef: HTMLDivElement | undefined;
    let containerRef: HTMLDivElement | undefined;
    let contentRef: HTMLDivElement | undefined;
    let timer: number;

    // Calculate how many cards are visible
    const calculateVisibleCards = () => {
        if (!containerRef) return;
        const containerWidth = containerRef.offsetWidth;
        const cardTotalWidth = cardWidth + cardGap;
        const visible = Math.floor(containerWidth / cardTotalWidth);
        setVisibleCards(visible);
    };

    // Function to scroll right
    const scrollRight = () => {
        if (isTransitioning()) return;
        
        // Calculate how many positions we can move
        const maxPosition = Math.max(0, totalItems() - visibleCards());
        const nextPosition = Math.min(currentPosition() + 1, maxPosition);
        
        // Only scroll if we're not at the end
        if (nextPosition === currentPosition()) return;
        
        setCurrentPosition(nextPosition);
        setTranslateX(-(cardWidth + cardGap) * nextPosition);
        setIsTransitioning(true);
        
        // Reset the transition state after animation completes
        setTimeout(() => setIsTransitioning(false), 300);
    };

    // Function to scroll left
    const scrollLeft = () => {
        if (isTransitioning()) return;
        
        // Calculate next position (can't go below 0)
        const nextPosition = Math.max(0, currentPosition() - 1);
        
        // Only scroll if we're not at the beginning
        if (nextPosition === currentPosition()) return;
        
        setCurrentPosition(nextPosition);
        setTranslateX(-(cardWidth + cardGap) * nextPosition);
        setIsTransitioning(true);
        
        // Reset the transition state after animation completes
        setTimeout(() => setIsTransitioning(false), 300);
    };

    // Set up auto play if enabled and calculate initial visible cards
    onMount(() => {
        calculateVisibleCards();
        
        // Add window resize listener
        const handleResize = () => {
            calculateVisibleCards();
            
            // When resizing, ensure we don't have invalid position
            const maxPosition = Math.max(0, totalItems() - visibleCards());
            if (currentPosition() > maxPosition) {
                setCurrentPosition(maxPosition);
                setTranslateX(-(cardWidth + cardGap) * maxPosition);
            }
        };
        
        window.addEventListener('resize', handleResize);
        
        if (props.autoPlay) {
            timer = window.setInterval(scrollRight, autoPlayInterval);
        }
        
        // Clean up event listeners and timers
        onCleanup(() => {
            window.removeEventListener('resize', handleResize);
            if (timer) {
                clearInterval(timer);
            }
        });
    });

    // Function to render each carousel item
    const renderItem = (item: CarouselItem) => {
        if (typeof item === "function") {
            return item({ onNext: scrollRight });
        }
        return item;
    };

    // Calculate if we should show the left/right buttons
    const showLeftButton = () => currentPosition() > 0;
    const showRightButton = () => currentPosition() < (totalItems() - visibleCards());

    return (
        <div class="relative overflow-hidden p-4" ref={carouselRef}>
            <div class="max-w-6xl" ref={containerRef}>
                {/* Carousel content */}
                <div 
                    class="flex transition-transform duration-300 ease-in-out" 
                    style={{ transform: `translateX(${translateX()}px)` }}
                    ref={contentRef}
                >
                    <For each={props.children}>
                        {(item) => (
                            <div 
                                style={{
                                    "margin-right": `${cardGap}px`
                                }}
                            >
                                {renderItem(item)}
                            </div>
                        )}
                    </For>
                </div>
            </div>

            {/* Left button */}
            <button 
                class="absolute left-0 top-1/2 p-2 rounded-full z-30 -translate-y-1/2 bg-white text-lg text-black" 
                style={{ 
                    transform: `translateX(${showLeftButton() ? '0' : '-100%'}) translateZ(0px)` 
                }}
                onClick={scrollLeft}
                disabled={!showLeftButton()}
                aria-label="Previous slide"
            >
                 ←
            </button>
            
            {/* Right button */}
            <button 
                class="absolute right-0 top-1/2 p-2 rounded-full z-30 -translate-y-1/2 bg-white text-lg text-black" 
                style={{ 
                    transform: `translateX(${showRightButton() ? '0' : '100%'}) translateZ(0px)` 
                }}
                onClick={scrollRight}
                disabled={!showRightButton()}
                aria-label="Next slide"
            >
                →
            </button>
            

        </div>
    );
};

export default Carousel;