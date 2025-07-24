// src/App.jsx
import { Flex, Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Bfs from "./pages/Bfs";
import Dfs from "./pages/Dfs";
import Dijkstra from "./pages/Dijkstra";
import AStar from "./pages/AStar";
import BestFirst from "./pages/Bestfirst";
import InputGraph from "./components/inputgraph";
import { Link } from "react-router-dom";

function App() {
  return (
    <Flex minH="100vh" w="100vw"> {/* ✅ Ensures full screen width & height */}
      {/* Sidebar stays fixed on the left */}
      <Sidebar />

      {/* Right Section: Top Navbar + Content */}
      <Flex direction="column" flex="1" minW={0}> {/* ✅ flex=1 and minW=0 to allow shrinkage */}
        {/* Top Navbar */}
        
      <Box> {/* Optional padding for spacing */}
      <Link to={'/'}></Link>
  </Box>
        {/* Main Content */}
        <Box flex="1" p={8} bg="gray.100" w="100%">
          <Routes>
            <Route path="/bfs" element={<Bfs />} />
            <Route path="/dfs" element={<Dfs />} />
            <Route path="/dijkstra" element={<Dijkstra />} />
            <Route path="/astar" element={<AStar />} />
            <Route path="/best-first-search" element={<BestFirst />} />
            <Route path='/'  element={<InputGraph/>}/>
          </Routes>
        </Box>
      </Flex>
    </Flex>
  );
}

export default App;
