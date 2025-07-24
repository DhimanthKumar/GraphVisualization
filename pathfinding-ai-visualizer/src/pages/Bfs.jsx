import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraphContext } from "../context/graphcontext";
import {
  Button,
  Box,
  Flex,
  Text,
  Select,
  Spacer,
} from "@chakra-ui/react";
import GraphVisualizer from "../components/GraphVisualizer";

function Bfs() {
  const {
    adjMatrix,
    matrixLength,
    isDirected,
    startNode,
    setStartNode,
    endNode,
    setEndNode,
  } = useContext(GraphContext);

  const navigate = useNavigate();
  const [currentOrder, setCurrentOrder] = useState([]);
  const [visitOrder, setVisitOrder] = useState([]);
  const [shortestPath, setShortestPath] = useState([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (matrixLength === 0) navigate("/");
  }, [matrixLength, navigate]);

 const handleStartBFS = () => {
  console.log("🔵 Starting Level-by-Level BFS");

  const visited = Array(matrixLength).fill(false);
  const parent = Array(matrixLength).fill(null);
  const queue = [[startNode]];
  visited[startNode] = true;

  let visitedSoFar = [];
  setShortestPath([]);
  setIsDone(false);

  const bfsStep = () => {
    if (queue.length === 0) {
      console.log("✅ BFS Complete");
      setVisitOrder(visitedSoFar);
      setCurrentOrder([]);
      setIsDone(true);
      return;
    }

    const levelNodes = queue.shift();
    setCurrentOrder(levelNodes);
    setVisitOrder([...visitedSoFar]);

    setTimeout(() => {
      const nextLevel = [];
      let foundEnd = false;
      let finalLevel = [];

      for (const node of levelNodes) {
        if (foundEnd) break;

        finalLevel.push(node);

        if (node === endNode) {
          foundEnd = true;
          break;
        }

        for (let j = 0; j < matrixLength; j++) {
          if (adjMatrix[node][j] > 0 && !visited[j]) {
            visited[j] = true;
            nextLevel.push(j);
            parent[j] = node;
          }
        }
      }

      visitedSoFar = [...visitedSoFar, ...finalLevel];

      if (foundEnd) {
        setVisitOrder(visitedSoFar);
        setCurrentOrder([]);

        const path = [];
        let curr = endNode;
        while (curr !== null) {
          path.push(curr);
          curr = parent[curr];
        }
        path.reverse();
        setShortestPath(path);
        setIsDone(true);
        return;
      }

      if (nextLevel.length > 0) {
        queue.push(nextLevel);
      }

      bfsStep();
    }, 4000); // Delay for animation
  };

  bfsStep();
};


  return (
    <Flex direction="column" h="100vh">
      {/* Navbar */}
      <Box
        h="60px"
        bg="gray.700"
        color="white"
        display="flex"
        alignItems="center"
        px={6}
        gap={4}
      >
        <Button as={Link} to="/" variant="ghost" colorScheme="whiteAlpha">
          Edit Graph
        </Button>

        <Text>Start:</Text>
        <Select
  size="sm"
  w="60px"
  value={startNode}
  onChange={(e) => setStartNode(parseInt(e.target.value))}
  bg="white"
  color="black"
>
  {Array.from({ length: matrixLength }, (_, i) => (
    <option key={i} value={i}>
      {i}
    </option>
  ))}
</Select>

<Select
  size="sm"
  w="60px"
  value={endNode}
  onChange={(e) => setEndNode(parseInt(e.target.value))}
  bg="white"
  color="black"
>
  {Array.from({ length: matrixLength }, (_, i) => (
    <option key={i} value={i}>
      {i}
    </option>
  ))}
</Select>


        <Spacer />
        <Button colorScheme="blue" onClick={handleStartBFS}>
          Start BFS
        </Button>
      </Box>

      {/* Graph Visualizer */}
      <Flex flex="1" justify="center" align="center" p={4}>
        <GraphVisualizer
  adjMatrix={adjMatrix}
  isDirected={isDirected}
  visitOrder={visitOrder}
  currentOrder={currentOrder}
  shortestPath={shortestPath}
  isDone={isDone}
  startNode={startNode}
  endNode={endNode}
/>
      </Flex>
    </Flex>
  );
}

export default Bfs;
