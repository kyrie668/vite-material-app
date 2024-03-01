import React, { useState, useMemo, useEffect } from "react";

import "./index.less";
// import { ipcRenderer } from "electron";
// const { ipcRenderer } = require('electron')

function OthersPage() {
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const total = useMemo(() => {
    return detail.reduce((pre, next, index, arr) => {
      return pre + next.count;
    }, 0);
  }, [detail]);

  const onAdd = () => {
    // setDetail([...detail, { name: "test111", count: 1 }]);
    // ipcRenderer.send("min-app");
    // window.ipcRenderer.send("min-app");
    // console.log(window.ipcRenderer.on("min-app",()=>{}));
    window.ipcRenderer?.send("window-min");
    console.log(window.electron);
  };

  // 获取数据
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDetail([
        { name: "apple", count: 10 },
        { name: "banana", count: 20 },
        { name: "orange", count: 30 },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="test" style={{ display: "flex", flexDirection: "column" }}>
      <div className={`nano-title`}>my test</div>

      <div>
        {detail.map((item, index) => (
          <div key={index}>
            {item.name} x {item.count}
          </div>
        ))}
      </div>
      <div className="nano-footer">Current Total is {total}</div>
      <button onClick={onAdd} className="nano-content">
        Add A Item
      </button>
    </div>
  );
}

export default OthersPage;
