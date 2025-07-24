import { createContext, useState } from "react";

export const GraphContext = createContext();

export const GraphProvider = ({ children }) => {
  const [adjMatrix, setAdjMatrix] = useState(() => {
    const saved = localStorage.getItem("adjMatrix");
    return saved ? JSON.parse(saved) : [];
  });

  const [isDirected, setIsDirected] = useState(() => {
    return localStorage.getItem("isDirected") === "true";
  });

  const [isWeighted, setIsWeighted] = useState(() => {
    return localStorage.getItem("isWeighted") === "true";
  });

  const [matrixLength, setMatrixLength] = useState(() => {
    const savedLength = localStorage.getItem("matrixLength");
    return savedLength ? parseInt(savedLength) : 0;
  });

  const [isCreated, setIsCreated] = useState(adjMatrix.length > 0);
  const [startNode, setStartNode] = useState(() => {
  const savedStart = localStorage.getItem("startNode");
  return savedStart !== null ? parseInt(savedStart) : null;
});

const [endNode, setEndNode] = useState(() => {
  const savedEnd = localStorage.getItem("endNode");
  return savedEnd !== null ? parseInt(savedEnd) : null;
});

  return (
    <GraphContext.Provider
      value={{
        adjMatrix,
        setAdjMatrix,
        isDirected,
        setIsDirected,
        isWeighted,
        setIsWeighted,
        matrixLength,
        setMatrixLength,
        isCreated,
        setIsCreated,
        startNode,
        setStartNode,
        endNode,setEndNode,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};
