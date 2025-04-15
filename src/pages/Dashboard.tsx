
import { useState } from "react";
import { ImageUpload } from "@/components/upload/image-upload";
import { ResultCard, AnalysisResult } from "@/components/dashboard/result-card";
import { MainNav } from "@/components/layout/main-nav";
import { analyzeImage } from "@/services/image-analysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  
  const handleAnalyze = async (imageUrl: string) => {
    setIsProcessing(true);
    try {
      const result = await analyzeImage(imageUrl);
      setResults(prev => [result, ...prev]);
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      <main className="flex-1 container py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Chili Analysis Dashboard</h1>
            <p className="text-gray-600">Upload and analyze chili images for plant health assessment</p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <ImageUpload onAnalyze={handleAnalyze} isProcessing={isProcessing} />
            
            <div>
              {results.length > 0 ? (
                <ResultCard result={results[0]} />
              ) : (
                <div className="h-full flex items-center justify-center p-8 border-2 border-dashed rounded-lg">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No Analysis Results Yet</h3>
                    <p className="text-gray-500">Upload an image to start analyzing your chili plants</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {results.length > 1 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Analysis History</h2>
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">All Results</TabsTrigger>
                  <TabsTrigger value="detected">Chili Detected</TabsTrigger>
                  <TabsTrigger value="defects">With Defects</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <div className="grid gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3">
                    {results.slice(1).map((result, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
                        <div className="aspect-video bg-gray-100 relative">
                          <img src={result.imageUrl} alt="Analyzed chili" className="w-full h-full object-cover" />
                          <div className="absolute top-2 right-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              result.isChili ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}>
                              {result.isChili ? "Detected" : "Not Detected"}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="font-medium">
                            {result.isChili 
                              ? `Chili detected (${(result.confidence * 100).toFixed(1)}%)`
                              : "No chili detected"}
                          </p>
                          {result.isChili && result.defects && (
                            <p className="text-sm text-gray-500 mt-1">
                              {result.defects.length} defect(s) found
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="detected">
                  <div className="grid gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3">
                    {results.slice(1)
                      .filter(r => r.isChili)
                      .map((result, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
                          <div className="aspect-video bg-gray-100 relative">
                            <img src={result.imageUrl} alt="Analyzed chili" className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Detected
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="font-medium">
                              Chili detected ({(result.confidence * 100).toFixed(1)}%)
                            </p>
                            {result.defects && (
                              <p className="text-sm text-gray-500 mt-1">
                                {result.defects.length} defect(s) found
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="defects">
                  <div className="grid gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3">
                    {results.slice(1)
                      .filter(r => r.isChili && r.defects && r.defects.length > 0)
                      .map((result, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
                          <div className="aspect-video bg-gray-100 relative">
                            <img src={result.imageUrl} alt="Analyzed chili" className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                {result.defects?.length} Defects
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="font-medium">
                              Defects detected:
                            </p>
                            <ul className="text-sm text-gray-500 mt-1 list-disc list-inside">
                              {result.defects?.map((defect, i) => (
                                <li key={i}>{defect.type}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
