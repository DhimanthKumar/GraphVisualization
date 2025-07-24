import React, { useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

function GraphVisualizer({
  adjMatrix,
  isDirected = false,
  visitOrder = [],
  currentOrder = [],
  shortestPath = [],
  isDone = false,
  startNode = null,
  endNode = null,
}) {
  const n = adjMatrix.length;
  const radius = 150;
  const centerX = 300;
  const centerY = 200;

  const { nodes: computedNodes, edges: computedEdges } = useMemo(() => {
    const visitedSet = new Set(visitOrder);
    const currentSet = new Set(currentOrder);

    const nodes = [];
    const edges = [];

    for (let i = 0; i < n; i++) {
      const angle = (2 * Math.PI * i) / n;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // Background color (priority: current > visited > default)
      let background = "#ffffff";
      if (isDone || currentSet.has(i)) {
        background = currentSet.has(i) ? "#feb2b2" : background; // light red
      }
      if (visitedSet.has(i)) {
        background = "#bee3f8"; // light blue
      }

      // Border color
      let borderColor = "#2B6CB0"; // default blue
      if (i === startNode) borderColor = "#22543D"; // dark green
      if (i === endNode) borderColor = "#553C9A";   // dark purple

      nodes.push({
        id: `${i}`,
        data: { label: `N${i}` },
        position: { x, y },
        style: {
  width: 50,
  height: 50,
  borderRadius: "50%",
  background,
  color: "#2B6CB0",
  border: `3px solid ${borderColor}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  transition: "background 0.5s ease, border-color 0.5s ease", // <- Added
},

      });
    }

    // Create edges
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (adjMatrix[i][j]) {
          if (!isDirected && j < i) continue;

          const isInShortestPath =
            isDone &&
            shortestPath.length > 1 &&
            shortestPath.includes(i) &&
            shortestPath.includes(j) &&
            Math.abs(shortestPath.indexOf(i) - shortestPath.indexOf(j)) === 1;

          const label = isDirected ? `${adjMatrix[i][j]}` : "";

          edges.push({
            id: `e${i}-${j}`,
            source: `${i}`,
            target: `${j}`,
            animated: isInShortestPath,
            label,
            style: {
              stroke: isInShortestPath ? "gold" : "#2B6CB0",
              strokeWidth: isInShortestPath ? 4 : 2,
              transition: "all 0.3s ease",
              fontWeight: "bold",
            },
            markerEnd: isDirected
              ? {
                  type: MarkerType.ArrowClosed,
                  color: isInShortestPath ? "gold" : "#2B6CB0",
                }
              : undefined,
          });
        }
      }
    }

    return { nodes, edges };
  }, [
    adjMatrix,
    isDirected,
    visitOrder,
    currentOrder,
    shortestPath,
    isDone,
    startNode,
    endNode,
  ]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: "400px" }}>
        <ReactFlow
          nodes={computedNodes}
          edges={computedEdges}
          fitView
          nodesDraggable={false}
          panOnDrag
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {/* Visit Order Strip */}
      {visitOrder.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            border: "2px solid #2B6CB0",
            borderRadius: "8px",
            background: "#f0f4f8",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#2B6CB0",
              fontSize: "16px",
              marginBottom: "10px",
            }}
          >
            Visited Nodes:
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {visitOrder.map((node, index) => (
              <div
                key={index}
                style={{
                  background: "#bee3f8",
                  color: "#2B6CB0",
                  padding: "8px 14px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                {node}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GraphVisualizer;
