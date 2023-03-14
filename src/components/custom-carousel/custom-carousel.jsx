import "./custom-carousel.styles.scss";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

import ScrollContainer from "react-indiana-drag-scroll";

import React, { useEffect } from "react";
export function CarouselItem({ children, width }) {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
}

export default function CustomCarousel({
  children,
  HideIndicators,
  // autoCycle,
}) {
  // useEffect(() => {
  //   if (autoCycle) {
  //     const interval = setInterval(() => {
  //       updateIndex(activeIndex + 1);
  //     }, 3000);
  //     return () => clearInterval(interval);
  //   }
  // }, []);
  // const options = { horizontal: true, vertical: false, hideScrollbars: true };
  // const scrollContainer = useScrollContainer(options);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  function updateIndex(newIndex) {
    if (newIndex < 0) {
      setActiveIndex(React.Children.count(children) - 1);
      return;
    }
    if (newIndex === React.Children.count(children)) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex(newIndex);
  }

  return (
    <ScrollContainer horizontal={true} vertical={false} hideScrollbars>
      <div className="custom-carousel" {...handlers}>
        {/* <div className="arrow-navigation">
        <img
          src="/left.png"
          alt="left arrow"
          onClick={() => updateIndex(activeIndex - 1)}
        />
        <img
          src="/right.png"
          alt="right arrow"
          onClick={() => updateIndex(activeIndex + 1)}
        />
      </div> */}
        <div
          className="inner"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, { width: "100%" });
          })}
        </div>
        <div className={`indicators ${HideIndicators && "hide"}`}>
          {React.Children.map(children, (child, index) => {
            return (
              <div
                key={index}
                className={`switch ${index === activeIndex && "current"}`}
                onClick={() => {
                  updateIndex(index);
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </ScrollContainer>
  );
}
