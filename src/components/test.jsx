import React, { useState } from "react";

class TimeTravelingHashmap {
  constructor() {
    this.store = new Map();
  }

  put(key, timestamp, value) {
    if (!this.store.has(key)) {
      this.store.set(key, []);
    }
    this.store.get(key).push([timestamp, value]);
  }

  get(key, timestamp) {
    const entries = this.store.get(key);
    if (!entries) return null;

    let left = 0;
    let right = entries.length - 1;
    let result = null;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const [midTimestamp, midValue] = entries[mid];

      if (midTimestamp === timestamp) {
        return midValue;
      } else if (midTimestamp < timestamp) {
        result = midValue;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  }
}

function TimeTravelingHashmapDemo() {
  const [tth] = useState(() => new TimeTravelingHashmap());
  const [key, setKey] = useState("");
  const [timestamp, setTimestamp] = useState(0);
  const [value, setValue] = useState("");
  const [getTimestamp, setGetTimestamp] = useState(0);
  const [getKey, setGetKey] = useState("");
  const [log, setLog] = useState([]);

  const handlePut = () => {
    tth.put(key, timestamp, value);
    setLog((prev) => [`put("${key}", ${timestamp}, "${value}")`, ...prev]);
    setKey("");
    setTimestamp(0);
    setValue("");
  };

  const handleGet = () => {
    const result = tth.get(getKey, getTimestamp);
    setLog((prev) => [`get("${getKey}", ${getTimestamp}) -> ${result}`, ...prev]);
    setGetKey("");
    setGetTimestamp(0);
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem", maxWidth: "600px", background: 'white', color: 'black', height: '100vh' }}>
      <h2>🕰️ Time Traveling HashMap (Interactive)</h2>

      <div style={{ marginBottom: "1rem" }}>
        <h4>Put value</h4>
        <input placeholder="key" value={key} onChange={(e) => setKey(e.target.value)} />
        <input
          type="number"
          placeholder="timestamp"
          value={timestamp}
          onChange={(e) => setTimestamp(parseInt(e.target.value))}
        />
        <input placeholder="value" value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={handlePut}>Put</button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <h4>Get value</h4>
        <input placeholder="key" value={getKey} onChange={(e) => setGetKey(e.target.value)} />
        <input
          type="number"
          placeholder="timestamp"
          value={getTimestamp}
          onChange={(e) => setGetTimestamp(parseInt(e.target.value))}
        />
        <button onClick={handleGet}>Get</button>
      </div>

      <h4>Log</h4>
      <pre style={{ background: "#f0f0f0", padding: "1rem", minHeight: "150px" }}>
        {log.length > 0 ? log.join("\n") : "No operations yet."}
      </pre>
    </div>
  );
}

export default TimeTravelingHashmapDemo;
