export interface CropData {
  year: string;
  cropName: string;
  production: number;
  yield: number;
  area: number;
}

export interface YearlyProduction {
  year: string;
  maxCrop: string;
  minCrop: string;
}

export interface CropAverage {
  cropName: string;
  averageYield: number;
  averageArea: number;
}

export const cleanData = (data: any[]): CropData[] => {
  return data.map((item) => ({
    year: item.Year.replace("Financial Year (Apr - Mar), ", ""),
    cropName: item["Crop Name"],
    production: parseFloat(item["Crop Production (UOM:t(Tonnes))"]) || 0,
    yield: parseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0,
    area: parseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0,
  }));
};

export const getMaxMinProductionByYear = (data: CropData[]): YearlyProduction[] => {
  const grouped = data.reduce((acc, row) => {
    const { year, cropName, production } = row;
    if (!acc[year]) acc[year] = { max: { cropName, production: -Infinity }, min: { cropName, production: Infinity } };

    if (production > acc[year].max.production) acc[year].max = { cropName, production };
    if (production < acc[year].min.production) acc[year].min = { cropName, production };

    return acc;
  }, {} as Record<string, { max: { cropName: string; production: number }; min: { cropName: string; production: number } }>);

  return Object.entries(grouped).map(([year, values]) => ({
    year,
    maxCrop: values.max.cropName,
    minCrop: values.min.cropName,
  }));
};

export const getCropAverages = (data: CropData[]): CropAverage[] => {
  const cropGrouped = data.reduce((acc, row) => {
    const { cropName, yield: cropYield, area } = row;

    if (!acc[cropName]) acc[cropName] = { totalYield: 0, totalArea: 0, count: 0 };
    acc[cropName].totalYield += cropYield || 0;
    acc[cropName].totalArea += area || 0;
    acc[cropName].count += 1;

    return acc;
  }, {} as Record<string, { totalYield: number; totalArea: number; count: number }>);

  return Object.entries(cropGrouped).map(([cropName, stats]) => ({
    cropName,
    averageYield: parseFloat((stats.totalYield / stats.count).toFixed(3)),
    averageArea: parseFloat((stats.totalArea / stats.count).toFixed(3)),
  }));
};