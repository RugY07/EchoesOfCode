
import { createContext, useState, ReactNode } from "react";

type Language = "en" | "hi";

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

// Add all the translations here
const translations: Translations = {
  en: {
    upload_image: "Upload Image",
    detect_disease: "Detect Disease",
    history: "History",
    ask_expert: "Ask Expert",
    welcome: "Welcome to LeafSense",
    app_description: "AI-powered plant disease detection",
    upload_description: "Upload an image of a plant leaf to detect diseases",
    results: "Results",
    disease_name: "Disease Name",
    symptoms: "Symptoms",
    suggested_treatment: "Suggested Treatment",
    watch_tutorial: "Watch Tutorial",
    view_history: "View History",
    ask_question: "Ask a Question",
    loading: "Analyzing your image...",
    no_history: "No history found",
    submit: "Submit",
    your_question: "Your Question",
  },
  hi: {
    upload_image: "छवि अपलोड करें",
    detect_disease: "रोग का पता लगाएं",
    history: "इतिहास",
    ask_expert: "विशेषज्ञ से पूछें",
    welcome: "लीफसेंस में आपका स्वागत है",
    app_description: "एआई-संचालित पौधे की बीमारी का पता लगाना",
    upload_description: "रोगों का पता लगाने के लिए पौधे के पत्ते की एक छवि अपलोड करें",
    results: "परिणाम",
    disease_name: "रोग का नाम",
    symptoms: "लक्षण",
    suggested_treatment: "सुझाया गया उपचार",
    watch_tutorial: "ट्यूटोरियल देखें",
    view_history: "इतिहास देखें",
    ask_question: "प्रश्न पूछें",
    loading: "आपकी छवि का विश्लेषण किया जा रहा है...",
    no_history: "कोई इतिहास नहीं मिला",
    submit: "जमा करें",
    your_question: "आपका प्रश्न",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
