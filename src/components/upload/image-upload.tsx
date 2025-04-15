
import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, ImagePlus, Loader2 } from "lucide-react";

type ImageUploadProps = {
  onAnalyze: (imageUrl: string) => void;
  isProcessing: boolean;
};

export function ImageUpload({ onAnalyze, isProcessing }: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (!file.type.includes('image')) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an image file",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    
    if (file) {
      if (!file.type.includes('image')) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an image file",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = () => {
    if (image) {
      onAnalyze(image);
    } else {
      toast({
        variant: "destructive",
        title: "No image selected",
        description: "Please upload an image first",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Chili Image</CardTitle>
        <CardDescription>Upload a clear image of chili to analyze for defects</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`relative flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg transition-colors ${
            isDragging ? "border-chili-500 bg-chili-50" : "border-gray-300"
          } ${image ? "bg-gray-50" : "bg-white"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {image ? (
            <div className="relative w-full h-full">
              <img 
                src={image} 
                alt="Uploaded chili" 
                className="w-full h-full object-contain" 
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-white/90"
                onClick={() => setImage(null)}
              >
                Change
              </Button>
            </div>
          ) : (
            <>
              <ImagePlus className="h-16 w-16 text-gray-400 mb-2" />
              <p className="text-center text-gray-500 mb-2">
                Drag and drop your image here, or click to browse
              </p>
              <Button onClick={handleButtonClick} variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Select Image
              </Button>
            </>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button
          variant="outline"
          onClick={() => setImage(null)}
          disabled={!image || isProcessing}
        >
          Clear
        </Button>
        <Button 
          onClick={handleAnalyze} 
          disabled={!image || isProcessing}
          className="bg-gradient-to-r from-chili-500 to-pepper-500 hover:from-chili-600 hover:to-pepper-600"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            "Analyze Chili"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
