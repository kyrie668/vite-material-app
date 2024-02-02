import React, { useState, useMemo, useEffect } from "react";

import "./index.less";

function OthersPage() {
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const total = useMemo(() => {
    return detail.reduce((pre, next, index, arr) => {
      return pre + next.count;
    }, 0);
  }, [detail]);

  const onAdd = () => {
    setDetail([...detail, { name: "test", count: 1 }]);
  };

  return (
    <div className="test" style={{ display: "flex", flexDirection: "column" }}>
      <div className={`nano-title`} >my test</div>
      <button onClick={onAdd} className="nano-content">
        Add A Item
      </button>
      <div className="nano-footer">Current Total is {total}</div>
    </div>
  );
}

export default OthersPage;
