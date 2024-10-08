import { useRef } from "react";
import { useIntersectionObserver } from "../../hooks";

const InfiniteScroller = ({
  children,
  hasMore,
  loadMore,
  ...otherProps
}: any) => {
  const ref = useRef(null);
  useIntersectionObserver({
    onIntersect: loadMore,
    enabled: hasMore,
    target: ref,
  });
  return (
    <div {...otherProps} className="w-full">
      {children}
      {hasMore && (
        <div
          className="d-flex justify-content-center w-100"
          style={{ padding: "20px", visibility: "hidden" }}
          ref={ref}
          id="lala"
        >
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
};

export default InfiniteScroller;
