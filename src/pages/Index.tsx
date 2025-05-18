
import { useState, useContext } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { DiseaseResult as DiseaseResultComponent } from "@/components/DiseaseResult";
import { DiseaseResult } from "@/components/ImageUploader";
import { Navbar } from "@/components/Navbar";
import { LanguageContext } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useContext(LanguageContext);
  const [result, setResult] = useState<DiseaseResult | null>(null);

  const handleResultReceived = (result: DiseaseResult) => {
    setResult(result);
    // Scroll to results
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 mx-auto">
          {!result ? (
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="hero-gradient mx-auto w-24 h-24 mb-6 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-leafgreen-600"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-4">{t("welcome")}</h1>
              <p className="text-xl text-foreground/80 mb-8">{t("app_description")}</p>
              
              <div className="max-w-md mx-auto">
                <ImageUploader onResultReceived={handleResultReceived} />
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <DiseaseResultComponent result={result} onReset={handleReset} />
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 LeafSense. {t("all_rights_reserved")}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
