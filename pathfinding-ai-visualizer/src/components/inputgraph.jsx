import {
  Box,
  Checkbox,
  Text,
  SimpleGrid,
  VStack,
  Button,
  NumberInput,
  NumberInputField,
  HStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { GraphContext } from "../context/graphcontext";

function InputGraph() {
  const {
    adjMatrix,
    setAdjMatrix,
    isDirected,
    setIsDirected,
    isWeighted,
    setIsWeighted,
    isCreated,
    setIsCreated,
    matrixLength,
    setMatrixLength,
    setStartNode,
    setEndNode
  } = useContext(GraphContext);

  const [tempMatrix, setTempMatrix] = useState([]);

  // Load existing matrix if available
  useEffect(() => {
    if (matrixLength > 0) {
      const matrix = Array.from({ length: matrixLength }, (_, i) =>
        Array.from({ length: matrixLength }, (_, j) =>
          adjMatrix?.[i]?.[j] ?? 0
        )
      );
      setTempMatrix(matrix);
    }
  }, [matrixLength]);

  // Update matrix input cell
  const handleMatrixChange = (i, j, valueStr) => {
    const trimmed = valueStr.trim();
    const finalValue =
      trimmed.length === 0
        ? 0
        : trimmed.endsWith("0")
        ? 0
        : 1;

    const newMatrix = tempMatrix.map((row) => [...row]);

    if (!isWeighted) {
      newMatrix[i][j] = finalValue;
      if (!isDirected) newMatrix[j][i] = finalValue;
    } else {
      const weight = Number(valueStr);
      if (!isNaN(weight)) {
        newMatrix[i][j] = weight;
        if (!isDirected) newMatrix[j][i] = weight;
      }
    }

    setTempMatrix(newMatrix);
  };

  // Save to context and localStorage
  const handleSubmit = () => {
    setAdjMatrix(tempMatrix);
    setIsCreated(true);
    localStorage.setItem("adjMatrix", JSON.stringify(tempMatrix));
    localStorage.setItem("isDirected", isDirected);
    localStorage.setItem("isWeighted", isWeighted);
    localStorage.setItem("matrixLength", matrixLength);
    setStartNode(0);
    localStorage.setItem("startNode", 0);

    setEndNode(matrixLength - 1);
    localStorage.setItem("endNode", matrixLength - 1);

    alert("Matrix saved to context!");
  };

  // Clear everything
  const handleClear = () => {
  const clearedMatrix = Array.from({ length: matrixLength }, () =>
    Array(matrixLength).fill(0)
  );
  setTempMatrix(clearedMatrix);
  setStartNode(null)
  setEndNode(null)
  localStorage.setItem("startNode", null);
localStorage.setItem("endNode",null);
};


  return (
    <Box>
      <VStack align="start" spacing={4}>
        <Text fontSize="xl" fontWeight="bold">
          Graph Configuration
        </Text>

        <HStack>
          <Text>Enter Number of Nodes</Text>
          <NumberInput
            value={matrixLength}
            onChange={(valueStr) => {
              const num = Number(valueStr);
              if (num >= 1 && num <= 20) {
                setMatrixLength(num);
              } else if (valueStr === "") {
                setMatrixLength(0);
              }
            }}
            onBlur={() => {
              if (matrixLength > 20) setMatrixLength(20);
              else if (matrixLength < 1) setMatrixLength(1);
            }}
          >
            <NumberInputField placeholder="Number of nodes (max 20)" />
          </NumberInput>
        </HStack>

        <Checkbox
          isChecked={isDirected}
          onChange={(e) => setIsDirected(e.target.checked)}
        >
          Directed
        </Checkbox>

        <Checkbox
          isChecked={isWeighted}
          onChange={(e) => setIsWeighted(e.target.checked)}
        >
          Weighted
        </Checkbox>

        {matrixLength > 0 && (
          <>
            <Text fontWeight="semibold">Adjacency Matrix</Text>
            <SimpleGrid columns={matrixLength} spacing={1}>
              {tempMatrix.map((row, i) =>
                row.map((_, j) => (
                  <NumberInput
                    key={`${i}-${j}`}
                    size="sm"
                    value={tempMatrix[i][j]}
                    onChange={(valueStr) => handleMatrixChange(i, j, valueStr)}
                    clampValueOnBlur={false}
                    maxW="60px"
                    min={0}
                    step={1}
                  >
                    <NumberInputField textAlign="center" />
                  </NumberInput>
                ))
              )}
            </SimpleGrid>

            <HStack spacing={4} mt={2}>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Save Matrix
              </Button>
              <Button colorScheme="red" onClick={handleClear}>
                Clear Matrix
              </Button>
            </HStack>
          </>
        )}
      </VStack>
    </Box>
  );
}

export default InputGraph;
