
import { useState, useContext, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageContext } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { detectDisease } from "@/services/diseaseService";

export interface DiseaseResult {
  id: string;
  diseaseName: string;
  probability: number;
  symptoms: string;
  treatment: string;
  videoId: string;
}

interface ImageUploaderProps {
  onResultReceived: (result: DiseaseResult) => void;
}

export function ImageUploader({ onResultReceived }: ImageUploaderProps) {
  const { t } = useContext(LanguageContext);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!imageFile) {
      toast({
        title: "Error",
        description: "Please select an image first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, we would send the image to a backend API
      // Here we're using a mock service
      const result = await detectDisease(imageFile);
      onResultReceived(result);
      
      // Save to history
      const history = JSON.parse(localStorage.getItem("diseaseHistory") || "[]");
      history.push({
        id: result.id,
        diseaseName: result.diseaseName,
        imageUrl: selectedImage,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("diseaseHistory", JSON.stringify(history));
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImageFile(null);
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md mx-auto">
      <Card className="w-full overflow-hidden">
        <CardContent className="p-0">
          {selectedImage ? (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected leaf"
                className="w-full h-64 object-cover"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={handleReset}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Button>
            </div>
          ) : (
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-64 bg-muted/50 cursor-pointer hover:bg-muted transition-colors border-2 border-dashed rounded-md"
            >
              <div className="flex flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground mb-2"
                >
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                  <line x1="16" y1="5" x2="22" y2="5"></line>
                  <line x1="19" y1="2" x2="19" y2="8"></line>
                  <circle cx="9" cy="9" r="2"></circle>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                </svg>
                <p className="text-sm text-muted-foreground">
                  {t("upload_description")}
                </p>
              </div>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
        </CardContent>
      </Card>

      <Button 
        onClick={handleUpload} 
        disabled={!selectedImage || isLoading}
        className="w-full btn-gradient"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {t("loading")}
          </>
        ) : (
          t("detect_disease")
        )}
      </Button>
    </div>
  );
}
