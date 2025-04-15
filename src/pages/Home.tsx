
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/layout/main-nav";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="container py-16 md:py-24 lg:py-32 space-y-8">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter">
                <span className="text-chili-600">Revolutionary</span> Chili Analysis <span className="text-pepper-600">Technology</span>
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                ChiliCheck uses advanced AI to detect chili peppers and identify defects, 
                helping farmers and enthusiasts grow healthier plants and produce better harvests.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-chili-500 to-pepper-500 hover:from-chili-600 hover:to-pepper-600">
                    Try ChiliCheck Now
                  </Button>
                </Link>
                <a href="#learn-more">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl shadow-chili-100">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
                alt="Fresh chili peppers" 
                className="w-full h-auto object-cover" 
              />
            </div>
          </div>
        </section>

        <section id="learn-more" className="bg-gray-50 py-16">
          <div className="container space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">How ChiliCheck Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our intelligent system analyzes images of chili plants to identify defects and provide actionable insights.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-chili-100 text-chili-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl">Upload</h3>
                <p className="text-gray-600">Upload clear images of your chili plants or peppers from your device.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pepper-100 text-pepper-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl">Analyze</h3>
                <p className="text-gray-600">Our AI system automatically analyzes your images to detect chilis and identify any defects.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-chili-100 text-chili-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl">Results</h3>
                <p className="text-gray-600">Get instant feedback on plant health, detect defects, and learn how to address issues.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold">
                <span className="text-chili-400">Chili</span>
                <span className="text-pepper-400">Check</span>
              </h2>
              <p className="text-gray-400 mt-2">Revolutionizing chili detection with AI</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-4 mb-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
              <p className="text-gray-400">&copy; {new Date().getFullYear()} ChiliCheck. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
