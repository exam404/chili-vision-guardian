
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
                  <div className="text-center space-y-4">
                    <img 
                      src="https://images.unsplash.com/photo-1615486511884-4ab1db112fa3" 
                      alt="Healthy chili peppers" 
                      className="w-48 h-48 object-cover mx-auto rounded-lg shadow-md" 
                    />
                    <h3 className="text-lg font-medium text-gray-700">No Analysis Results Yet</h3>
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
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold">
                <span className="text-chili-400">Chili</span>
                <span className="text-pepper-400">Check</span>
              </h2>
              <p className="text-gray-400 mt-2">Revolutionizing chili detection with AI</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-4 mb-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
              <p className="text-gray-400">&copy; {new Date().getFullYear()} ChiliCheck. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
