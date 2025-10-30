import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SliderImage } from "../../features/slider/slider.model";
import { useRef, useState } from "react";

interface SliderPorps {
  slideImages: SliderImage[];
}

export default function Slider({ slideImages }: SliderPorps) {
  const [active, setActive] = useState<number>(0);
  const startX = useRef<number | null>(null);

  const n = slideImages.length;

  function nextSlide(move: number) {
    const nextIdx = (active + move + n) % n;
    setActive(nextIdx);
  }

  function handleStart(e: React.MouseEvent | React.TouchEvent) {
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    startX.current = x;
  }

  function handleEnd(e: React.MouseEvent | React.TouchEvent) {
    if (startX.current === null) return;
    const endX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - startX.current;

    const threshold = 50;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) nextSlide(-1);
      else nextSlide(1);
    }

    startX.current = null;
  }

  function handleCancel() {
    startX.current = null;
  }
  return (
    <div className="w-full md:w-4/6 md:h-90 flex md:gap-3 justify-self-center">
      <button onClick={() => nextSlide(-1)} className="flex z-50 justify-center items-center cursor-pointer md:w-20 text-orange-400">
        <ChevronLeft size={40} />
      </button>
      <div
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onMouseLeave={handleCancel}
        onTouchCancel={handleCancel}
        className="flex-1 relative flex justify-center items-center text-white overflow-hidden rounded-2xl cursor-grab"
      >
        <div className="flex w-full h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${active * 100}%)` }}>
          {slideImages.map((obj, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0">
              <img className="w-full h-full object-fill" src={obj.url_image} alt="" draggable="false" />
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => nextSlide(1)} className="flex z-50 justify-center items-center cursor-pointer md:w-20 text-orange-400">
        <ChevronRight size={40} />
      </button>
    </div>
  );
}
