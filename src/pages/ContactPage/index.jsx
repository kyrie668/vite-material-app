import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import Loading from "@/components/Loading";

const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .masonry {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0 30px;
    grid-auto-rows: 2px;
    align-items: end;
    .item {
      background: #f8f8fa;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: powderblue;
      cursor: pointer;
      transition: transform 0.2s ease-in-out;
      color: #fff;
      font-size: 1.2rem;
      font-weight: bold;
      border-radius: 0.5rem;
      height: 0px;
      &:hover {
        transform: scale(1.05);
      }
    }
    @media (min-width: 1280px) and (max-width: 1920px) {
      & {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    @media (min-width: 768px) and (max-width: 1280px) {
      & {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    @media (max-width: 768px) {
      & {
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 0 10px;
      }
    }
  }
  .load-more {
    font-weight: 400;
    color: #999;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
`;

function ContactPage() {
  const masonryRef = useRef(null);
  const loadRef = useRef(null);
  const total = 55;
  const [isResizing, setIsResizing] = useState(false); // 添加状态标记
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
    { id: 4, text: "Item 4" },
    { id: 5, text: "Item 5" },
    { id: 6, text: "Item 6" },
    { id: 7, text: "Item 7" },
    { id: 8, text: "Item 8" },
    { id: 9, text: "Item 9" },
    { id: 10, text: "Item 10" },
  ]);

  // 监听loadRef与窗口交互事件，有交互时更新列表
  const handleLoadMore = (loadNum = 10) => {
    if (loading) return;
    const masonry = masonryRef.current;

    // 生成loadNum条item数据
    let newItems = [];

    // 实际要添加的条数
    const addNum = Math.min(loadNum, total - items.length);
    if (addNum === 0) return;

    Array(addNum)
      .fill(null)
      .forEach((a, b) => {
        newItems.push({ id: items.length + b + 1, text: `Item ${items.length + b + 1}` });
      });
    setLoading(true);
    setItems([...items, ...newItems]);
    setTimeout(() => {
      const curItems = Array.from(masonry.querySelectorAll(".item"));
      const cols = getComputedStyle(masonry).gridTemplateColumns.split(" ").length;
      curItems.slice(curItems.length - loadNum).forEach((item, index) => {
        item.style.height = `${Math.floor(Math.random() * 200) + 100}px`;
        const gapRows = index >= cols ? 8 : 8;
        const rows = Math.ceil(item.clientHeight / 2) + gapRows;
        item.style.gridRowEnd = `span ${rows}`;
      });
      setLoading(false);
    }, 200);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target === loadRef.current && items.length < total) {
            handleLoadMore();
          }
        });
      },
      { threshold: 1 }
    );
    observer.observe(loadRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  useLayoutEffect(() => {
    let resizeTimeout;
    const masonry = masonryRef.current;
    const items = Array.from(masonry.querySelectorAll(".item"));
    items.forEach((item) => {
      item.style.height = `${Math.floor(Math.random() * 200) + 100}px`;
    });
    const calcRows = () => {
      const cols = getComputedStyle(masonry).gridTemplateColumns.split(" ").length;
      items.forEach((item, index) => {
        const gapRows = index >= cols ? 8 : 8;
        const rows = Math.ceil(item.clientHeight / 2) + gapRows;
        item.style.gridRowEnd = `span ${rows}`;
      });
    };

    const handleResize = () => {
      if (!isResizing) {
        setIsResizing(true);

        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          calcRows();
          setIsResizing(false);
        }, 200);
      }
    };

    calcRows();

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize, { passive: true });
    };
  }, [isResizing]);

  return (
    <GridWrapper>
      <div className="masonry" ref={masonryRef}>
        {items.map(({ id, text }, index) => (
          <div key={id} className="item">
            {text}
          </div>
        ))}
      </div>
      <em className="load-more" ref={loadRef}>
        {loading ? <Loading /> : "Not Anymore"}
      </em>
    </GridWrapper>
  );
}

export default ContactPage;
