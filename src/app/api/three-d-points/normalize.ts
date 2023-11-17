import { IPoint } from "@/types";

const normalizePoint = (data: IPoint[]): IPoint[] => {
  // Extract x, y, and z values into separate arrays
  const xValues = data.map((point) => point.x);
  const yValues = data.map((point) => point.y);
  const zValues = data.map((point) => point.z);

  // Find the min and max values for x, y, and z
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  const minZ = Math.min(...zValues);
  const maxZ = Math.max(...zValues);

  // Normalize the values
  const normalizedData = data.map((point) => ({
    x: (point.x - minX) / (maxX - minX),
    y: (point.y - minY) / (maxY - minY),
    z: (point.z - minZ) / (maxZ - minZ),
    metadata: point.metadata,
  }));

  return normalizedData;
};

export { normalizePoint };
