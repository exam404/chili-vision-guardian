
import { ChiliDefect } from "@/components/dashboard/result-card";

// In a real application, this would use an actual ML model or API
// For this demo, we'll mock the image analysis functionality

const DEFECT_TYPES: ChiliDefect[] = [
  {
    type: "Leaf Curl",
    confidence: 0.89,
    description: "Leaves are curling which may indicate water stress or viral infection."
  },
  {
    type: "Anthracnose",
    confidence: 0.76,
    description: "Dark, sunken lesions on fruits indicating fungal infection."
  },
  {
    type: "Bacterial Spot",
    confidence: 0.82,
    description: "Small, dark spots on leaves and fruits caused by bacteria."
  },
  {
    type: "Powdery Mildew",
    confidence: 0.91,
    description: "White, powdery growth on leaves affecting plant health."
  },
  {
    type: "Sunscald",
    confidence: 0.68,
    description: "Whitish, papery patches on fruits due to excessive sun exposure."
  }
];

export async function analyzeImage(imageUrl: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock analysis result
  const isChili = Math.random() > 0.2; // 80% chance it's a chili
  const hasDefects = Math.random() > 0.5; // 50% chance it has defects
  
  // If it's not a chili, return no defects
  if (!isChili) {
    return {
      isChili,
      confidence: 0.7 + Math.random() * 0.25, // 70-95% confidence
      defects: null,
      imageUrl
    };
  }
  
  // If it's a chili with no defects
  if (!hasDefects) {
    return {
      isChili,
      confidence: 0.8 + Math.random() * 0.19, // 80-99% confidence
      defects: null,
      imageUrl
    };
  }
  
  // It's a chili with defects
  // Select 1-3 random defects
  const numDefects = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...DEFECT_TYPES].sort(() => 0.5 - Math.random());
  const selectedDefects = shuffled.slice(0, numDefects);
  
  return {
    isChili,
    confidence: 0.85 + Math.random() * 0.14, // 85-99% confidence
    defects: selectedDefects,
    imageUrl
  };
}
