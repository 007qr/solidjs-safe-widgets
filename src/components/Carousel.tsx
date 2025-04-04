import { Component, createSignal, For, JSX, onCleanup, onMount, createEffect } from "solid-js";

// Define types for carousel item props
export type CarouselItemProps = {
  onNext: () => void;
};

// Define a type for carousel items that can be either direct JSX or render props
export type CarouselItem = JSX.Element | ((props: CarouselItemProps) => JSX.Element);

// Define types for the carousel props
export type CarouselProps = {
  children: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  itemsPerView?: number; // How many items to show at once
  scrollItems?: number; // How many items to scroll by (defaults to 1)
};

const Carousel: Component<CarouselProps> = (props) => {
  const [scrollPosition, setScrollPosition] = createSignal(0);
  const [isTransitioning, setIsTransitioning] = createSignal(false);
  const [itemsPerView, setItemsPerView] = createSignal(props.itemsPerView || 3);
  const [scrollItems, setScrollItems] = createSignal(props.scrollItems || 1);
  const [totalItems, setTotalItems] = createSignal(props.children.length);
  const [activeIndex, setActiveIndex] = createSignal(0);
  const [itemWidth, setItemWidth] = createSignal(0);
  const autoPlayInterval = props.autoPlayInterval || 5000;
  
  let carouselRef: HTMLDivElement | undefined;
  let containerRef: HTMLDivElement | undefined;
  let timer: number;
  
  // Calculate item width based on the container and items per view
  const calculateItemWidth = () => {
    if (!containerRef) return;
    const containerWidth = containerRef.offsetWidth;
    const gapSize = 16; // Gap between items (match your CSS gap value)
    const calculatedWidth = (containerWidth - (gapSize * (itemsPerView() - 1))) / itemsPerView();
    setItemWidth(calculatedWidth);
  };

  // Function to scroll right
  const scrollRight = () => {
    if (isTransitioning()) return;
    
    const nextIndex = Math.min(activeIndex() + scrollItems(), totalItems() - itemsPerView());
    if (nextIndex === activeIndex()) return;
    
    setIsTransitioning(true);
    setActiveIndex(nextIndex);
    
    // Reset the transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Function to scroll left
  const scrollLeft = () => {
    if (isTransitioning()) return;
    
    const nextIndex = Math.max(activeIndex() - scrollItems(), 0);
    if (nextIndex === activeIndex()) return;
    
    setIsTransitioning(true);
    setActiveIndex(nextIndex);
    
    // Reset the transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Function to jump to a specific index
  const scrollToIndex = (index: number) => {
    if (isTransitioning() || index === activeIndex()) return;
    
    const boundedIndex = Math.max(0, Math.min(index, totalItems() - itemsPerView()));
    
    setIsTransitioning(true);
    setActiveIndex(boundedIndex);
    
    // Reset the transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Update scroll position based on active index
  createEffect(() => {
    if (itemWidth() === 0) return;
    const gapSize = 16; // Match your CSS gap value
    setScrollPosition(activeIndex() * (itemWidth() + gapSize));
  });

  // Set up auto play if enabled and initial item width calculation
  onMount(() => {
    calculateItemWidth();
    
    if (props.autoPlay) {
      timer = window.setInterval(scrollRight, autoPlayInterval);
    }
    
    // Add resize listener to recalculate items per view and width
    const handleResize = () => {
      if (containerRef) {
        const containerWidth = containerRef.offsetWidth;
        // Adjust items per view based on container width
        if (containerWidth < 640) { // Small screen
          setItemsPerView(1);
        } else if (containerWidth < 3200) { // Medium screen
          setItemsPerView(2);
        } else { // Large screen
          setItemsPerView(Math.min(3, props.itemsPerView || 3));
        }
        
        // Recalculate item width
        calculateItemWidth();
        
        // Make sure activeIndex is still valid
        if (activeIndex() > totalItems() - itemsPerView()) {
          setActiveIndex(Math.max(0, totalItems() - itemsPerView()));
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial calculation
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  // Clean up the timer when component is unmounted
  onCleanup(() => {
    if (timer) {
      clearInterval(timer);
    }
  });

  // Function to render each carousel item
  const renderItem = (item: CarouselItem) => {
    if (typeof item === 'function') {
      return item({ onNext: scrollRight });
    }
    return item;
  };

  // Calculate the total number of page indicators
  const totalIndicators = () => {
    return Math.ceil((totalItems() - itemsPerView() + 1) / scrollItems());
  };

  // Calculate which indicator is active
  const activeIndicator = () => {
    return Math.floor(activeIndex() / scrollItems());
  };

  return (
    <div class="relative w-full" ref={carouselRef}>
      {/* Navigation Buttons */}
      {totalItems() > itemsPerView() && (
        <>
          <button 
            class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md"
            onClick={scrollLeft}
            disabled={activeIndex() === 0}
            aria-label="Scroll left"
            style={{ "opacity": activeIndex() === 0 ? "0.5" : "1" }}
          >
            ←
          </button>
          <button 
            class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md"
            onClick={scrollRight}
            disabled={activeIndex() >= totalItems() - itemsPerView()}
            aria-label="Scroll right"
            style={{ "opacity": activeIndex() >= totalItems() - itemsPerView() ? "0.5" : "1" }}
          >
            →
          </button>
        </>
      )}
      
      <div 
        ref={containerRef}
        class="overflow-hidden"
      >
        <div 
          class="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{ "transform": `translateX(-${scrollPosition()}px)` }}
        >
          <For each={props.children}>
            {(item) => (
              <div 
                class="flex-shrink-0" 
                style={{ 
                  "width": `${itemWidth()}px`,
                  "min-width": `${itemWidth()}px`, 
                  "max-width": `${itemWidth()}px`  
                }}
              >
                {renderItem(item)}
              </div>
            )}
          </For>
        </div>
      </div>
      
      {/* Carousel Indicators */}
      {props.showIndicators && totalIndicators() > 1 && (
        <div class="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
          
        </div>
      )}
    </div>
  );
};

export default Carousel;