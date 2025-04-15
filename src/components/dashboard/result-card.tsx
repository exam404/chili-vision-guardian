
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export type ChiliDefect = {
  type: string;
  confidence: number;
  description: string;
};

export type AnalysisResult = {
  isChili: boolean;
  confidence: number;
  defects: ChiliDefect[] | null;
  imageUrl: string;
};

type ResultCardProps = {
  result: AnalysisResult | null;
};

export function ResultCard({ result }: ResultCardProps) {
  if (!result) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>AI-powered chili detection results</CardDescription>
          </div>
          <Badge className={result.isChili ? "bg-pepper-500" : "bg-chili-500"}>
            {result.isChili ? "Chili Detected" : "No Chili Detected"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {result.isChili ? (
          <>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-pepper-500" />
              <div>
                <p className="font-medium">Chili detected with {(result.confidence * 100).toFixed(1)}% confidence</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Defect Analysis</h3>
              {result.defects && result.defects.length > 0 ? (
                <div className="space-y-4">
                  {result.defects.map((defect, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">{defect.type}</h4>
                          <p className="text-sm text-gray-500">{defect.description}</p>
                          <Badge className="mt-2 bg-amber-100 text-amber-800 hover:bg-amber-200">
                            {(defect.confidence * 100).toFixed(1)}% confidence
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border p-4 bg-green-50">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <p className="text-green-700">No defects detected! Your chili looks healthy.</p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-2">
            <XCircle className="h-5 w-5 text-chili-500" />
            <div>
              <p className="font-medium">No chili detected in this image</p>
              <p className="text-sm text-gray-500">Please upload a clearer image of a chili pepper</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
