
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function MainNav() {
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleLogout() {
    // Mock logout function
    toast({
      title: "Logged out successfully",
      description: "See you soon!",
    });
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span className="text-chili-600">Chili</span>
              <span className="text-pepper-600">Check</span>
            </span>
          </Link>
          <nav className="flex items-center space-x-4 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-chili-500">Home</Link>
            <Link to="/dashboard" className="transition-colors hover:text-chili-500">Dashboard</Link>
          </nav>
        </div>
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="border-chili-200 text-chili-600 hover:bg-chili-50 hover:text-chili-700"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
