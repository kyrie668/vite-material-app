import { useEffect, useRef } from "react";

const cb = (entries, instance) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      element.classList.remove("opaque");
      element.classList.add("come-in");
      instance.unobserve(element);
    }
  });
};


const useScrollContent = (callback = cb) => {
  const contentRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(callback);
    if (contentRef.current) {
      const elements = Array.from(contentRef.current.children);
      elements.forEach((ele) => {
        ele.classList.add("opaque");
        observer.observe(ele);
      });
    }
    return () => observer.disconnect();
  }, [callback]);

  return contentRef;
};

export default useScrollContent;
