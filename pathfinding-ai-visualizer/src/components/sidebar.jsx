// src/components/Sidebar.jsx
import { Box, Text, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <Box
      w="250px"
      bg="gray.800"
      color="white"
      p={4}
      minH="100vh"
      boxShadow="md"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Pathfinding Visualizer
      </Text>
      <VStack align="start" spacing={2}>
        <Button as={Link} to="/bfs" variant="ghost" colorScheme="whiteAlpha" w="full">
          BFS
        </Button>
        <Button as={Link} to="/dfs" variant="ghost" colorScheme="whiteAlpha" w="full">
          DFS
        </Button>
        <Button as={Link} to="/dijkstra" variant="ghost" colorScheme="whiteAlpha" w="full">
          Dijkstra
        </Button>
        <Button as={Link} to="/astar" variant="ghost" colorScheme="whiteAlpha" w="full">
          A*
        </Button>
        <Button as={Link} to="/best-first-search" variant="ghost" colorScheme="whiteAlpha" w="full">
          Best First Search
        </Button>
      </VStack>
    </Box>
  );
}

export default Sidebar;
