import React, { useEffect, useState } from "react";
import { Table, Container, Title, Text } from "@mantine/core";
import {
  cleanData,
  getMaxMinProductionByYear,
  getCropAverages,
  CropData,
  YearlyProduction,
  CropAverage,
} from "./utils";
import dataset from "./ManufacIndiaAgroDataset.json";

const YearlyTable: React.FC<{ data: YearlyProduction[] }> = ({ data }) => {
  return (
    <Table
      striped
      highlightOnHover
      mt="md"
      style={{
        border: "1px solid #ccc",
        borderCollapse: "collapse",
        width: "100%",
      }}
    >
      <thead style={{ backgroundColor: "#f9f9f9" }}>
        <tr>
          <th style={{ border: "1px solid #ccc", padding: "8px" }} scope="col">
            Year
          </th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }} scope="col">
            Crop with Max Production
          </th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }} scope="col">
            Crop with Min Production
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.year}>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {row.year}
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {row.maxCrop}
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {row.minCrop}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const CropAverageTable: React.FC<{ data: CropAverage[] }> = ({ data }) => {
  return (
    <Table
      striped
      highlightOnHover
      mt="md"
      style={{
        border: "1px solid #ccc",
        borderCollapse: "collapse",
        width: "100%",
      }}
    >
      <thead style={{ backgroundColor: "#f9f9f9" }}>
        <tr>
          <th style={{ border: "1px solid #ccc", padding: "8px" }} scope="col">
            Crop
          </th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }} scope="col">
            Average Yield
          </th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }} scope="col">
            Average Cultivation Area
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.cropName}>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {row.cropName}
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {row.averageYield}
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {row.averageArea}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const App: React.FC = () => {
  const [yearlyData, setYearlyData] = useState<YearlyProduction[]>([]);
  const [averageData, setAverageData] = useState<CropAverage[]>([]);

  useEffect(() => {
    const cleanedData: CropData[] = cleanData(dataset);
    setYearlyData(getMaxMinProductionByYear(cleanedData));
    setAverageData(getCropAverages(cleanedData));
  }, []);

  return (
    <Container>
      <Text ta="center" fw={700} mt="lg">
        Indian Agriculture Data Analysis
      </Text>
      <Title ta="center"  order={2} mt="lg">
        Yearly Production
      </Title>
      <YearlyTable data={yearlyData} />
      <Title ta="center" order={2} mt="lg">
        Crop Averages (1950-2020)
      </Title>
      <CropAverageTable data={averageData} />
    </Container>
  );
};

export default App;
