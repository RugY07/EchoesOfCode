
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navbar() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="w-full py-4 px-6 bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-leafgreen-500 to-leafgreen-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="font-playfair font-bold text-xl">LeafSense</span>
        </Link>
        
        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                </svg>
              )}
            </Button>
            
            {isMenuOpen && (
              <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-2 animate-fade-in">
                <Link to="/" className="px-4 py-2 hover:bg-leafgreen-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/history" className="px-4 py-2 hover:bg-leafgreen-50 rounded-md" onClick={() => setIsMenuOpen(false)}>History</Link>
                <Link to="/ask-expert" className="px-4 py-2 hover:bg-leafgreen-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Ask Expert</Link>
                <div className="px-4 py-2">
                  <LanguageSwitcher />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <Link to="/" className="font-medium text-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/history" className="font-medium text-foreground hover:text-primary transition-colors">History</Link>
              <Link to="/ask-expert" className="font-medium text-foreground hover:text-primary transition-colors">Ask Expert</Link>
            </nav>
            <LanguageSwitcher />
          </div>
        )}
      </div>
    </header>
  );
}
