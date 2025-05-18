
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { LanguageContext } from "@/contexts/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="flex items-center space-x-2 rounded-full bg-secondary px-2 py-1">
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        className={`rounded-full px-3 py-1 text-xs ${language === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
        onClick={() => setLanguage("en")}
      >
        EN
      </Button>
      <Button
        variant={language === "hi" ? "default" : "ghost"}
        size="sm"
        className={`rounded-full px-3 py-1 text-xs ${language === "hi" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
        onClick={() => setLanguage("hi")}
      >
        हि
      </Button>
    </div>
  );
}
