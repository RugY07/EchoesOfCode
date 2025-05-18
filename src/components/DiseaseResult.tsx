
import { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LanguageContext } from "@/contexts/LanguageContext";
import { DiseaseResult as DiseaseResultType } from "@/components/ImageUploader";

interface DiseaseResultProps {
  result: DiseaseResultType;
  onReset: () => void;
}

export function DiseaseResult({ result, onReset }: DiseaseResultProps) {
  const { t } = useContext(LanguageContext);
  
  return (
    <div className="w-full space-y-6 animate-fade-in">
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary/10">
          <CardTitle className="text-xl">
            {t("results")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-medium">{t("disease_name")}</h3>
            <p className="text-lg font-bold text-primary">{result.diseaseName}</p>
            <div className="mt-1 h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-1000 ease-in-out" 
                style={{ width: `${result.probability * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground text-right">
              {Math.round(result.probability * 100)}% {t("confidence")}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">{t("symptoms")}</h3>
            <p className="text-foreground">{result.symptoms}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium">{t("suggested_treatment")}</h3>
            <p className="text-foreground">{result.treatment}</p>
          </div>

          <div className="pt-2">
            <h3 className="text-lg font-medium">{t("watch_tutorial")}</h3>
            <div className="aspect-video w-full mt-2 rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${result.videoId}`}
                title={`Treatment tutorial for ${result.diseaseName}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={onReset} className="btn-gradient">
          {t("upload_image")}
        </Button>
      </div>
    </div>
  );
}
