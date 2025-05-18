
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageContext } from "@/contexts/LanguageContext";

const NotFound = () => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl mb-8">{t("page_not_found")}</p>
        <Button asChild className="btn-gradient">
          <Link to="/">{t("back_to_home")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
