import localforage from "localforage";

localforage.config({
  driver: localforage.INDEXEDDB,
  name: "Daily Tool", 
  storeName: "Planner",
  description: "save save save",
});

export default localforage;
