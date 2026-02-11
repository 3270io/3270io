import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Terminal, ArrowRight, Book, FastForward, GithubLogo, Image as ImageIcon, CaretLeft, CaretRight } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { product3270ConnectImages, product3270WebImages } from "@/lib/dashboard-image"

function App() {
  const [bootComplete, setBootComplete] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const [showImages, setShowImages] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<"3270Connect" | "3270Web" | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const bootSequence = [
    "SYSTEM INITIALIZATION...",
    "LOADING CORE MODULES...",
    "CONNECTING TO MAINFRAME...",
    "ESTABLISHING TN3270 PROTOCOL...",
    "VERIFYING SSL/TLS CERTIFICATES...",
    "LOADING 3270CONNECT MODULE... [OK]",
    "LOADING 3270WEB MODULE... [OK]",
    "INITIALIZING SESSION MANAGER...",
    "SYSTEM READY - ALL SERVICES OPERATIONAL",
  ]

  useEffect(() => {
    if (currentLine < bootSequence.length) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1)
      }, 350)
      return () => clearTimeout(timer)
    } else {
      const finalTimer = setTimeout(() => {
        setBootComplete(true)
      }, 800)
      return () => clearTimeout(finalTimer)
    }
  }, [currentLine, bootSequence.length])

  useEffect(() => {
    const handleKeyPress = () => {
      if (currentLine >= bootSequence.length) {
        setBootComplete(true)
      }
    }

    const handleClick = () => {
      if (currentLine >= bootSequence.length) {
        setBootComplete(true)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('click', handleClick)
    }
  }, [currentLine, bootSequence.length])

  const products = [
    {
      name: "3270Connect" as const,
      description: "Repeatable scripted workflows to replicate human 3270 online integration with unlimited scale. Web dashboard, API and CLI for functional and non-functional testing of Mainframe 3270 Online applications.",
      docsUrl: "https://3270connect.3270.io",
      githubUrl: "https://github.com/3270io/3270Connect",
      features: [
        "Define & execute automated workflows via configuration files",
        "Capture 3270 terminal screen state for documentation & troubleshooting",
        "Execute multiple workflows in parallel for optimized testing",
        "Headless mode for CI/CD & background automation",
        "Verbose output mode with failure-only logging for diagnostics",
        "API server enabling load testing & advanced automation scenarios"
      ],
      images: product3270ConnectImages
    },
    {
      name: "3270Web" as const,
      description: "Web-based 3270 terminal interface in Go with session recording to a 3270Connect-compatible workflow.",
      docsUrl: "https://3270web.3270.io",
      githubUrl: "https://github.com/3270io/3270Web",
      features: [
        "Web UI for interactive 3270 terminal sessions with detailed logging",
        "Virtual keyboard support for comprehensive terminal interaction",
        "Full 3270 terminal settings to support any mainframe backend session",
        "Record sessions to workflow.json compatible with 3270Connect",
        "Load & playback workflow.json for automated session replay",
        "Docker image with GHCR workflow for containerized deployment"
      ],
      images: product3270WebImages
    }
  ]

  const handleShowImages = (productName: "3270Connect" | "3270Web") => {
    setCurrentProduct(productName)
    setCurrentImageIndex(0)
    setShowImages(true)
  }

  const handleImagesOpenChange = (open: boolean) => {
    setShowImages(open)
  }

  const currentImages = currentProduct === "3270Connect" ? product3270ConnectImages : product3270WebImages

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)
  }

  return (
    <div className="min-h-screen scanlines relative">
      <AnimatePresence mode="wait">
        {!bootComplete ? (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background flex items-center justify-center p-6"
          >
            <div className="w-full max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <Terminal size={64} weight="bold" className="text-primary terminal-glow-intense animate-pulse" />
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-wide uppercase terminal-glow-intense">
                    3270.IO
                  </h1>
                  <p className="text-sm text-primary/70 terminal-glow font-mono">
                    OPEN SOURCE MAINFRAME CONNECTIVITY SYSTEM
                  </p>
                </div>
              </div>
              
              <div className="border-2 border-primary/40 bg-card/50 p-6 md:p-8 card-glow font-mono">
                <div className="space-y-3">
                  {bootSequence.slice(0, currentLine).map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-accent terminal-glow shrink-0">{'>'}</span>
                      <span className="text-primary/90 terminal-glow text-sm md:text-base">
                        {line}
                      </span>
                    </motion.div>
                  ))}
                  {currentLine < bootSequence.length && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-accent terminal-glow">{'>'}</span>
                      <span className="text-primary terminal-glow-intense">█</span>
                    </motion.div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                {currentLine >= bootSequence.length && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center md:text-left"
                  >
                    <p className="text-accent terminal-glow font-mono text-sm">
                      [PRESS ANY KEY TO CONTINUE]
                    </p>
                  </motion.div>
                )}
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="ml-auto"
                >
                  <Button
                    onClick={() => setBootComplete(true)}
                    variant="outline"
                    size="sm"
                    className="border-accent/50 text-accent hover:bg-accent/10 hover:border-accent terminal-glow hover:amber-glow font-mono text-xs tracking-wider group"
                  >
                    <FastForward size={16} weight="bold" className="mr-2 group-hover:animate-pulse" />
                    [ SKIP ]
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
        <header className="border-b-2 border-primary/30 py-8 px-6 md:px-12 lg:px-24">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-4">
              <Terminal size={48} weight="bold" className="text-primary terminal-glow-intense" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide uppercase terminal-glow-intense glow-pulse">
                3270.io
              </h1>
            </div>
            <p className="text-lg md:text-xl text-primary/80 terminal-glow font-medium tracking-wide">
              {'>'} OPEN SOURCE MAINFRAME CONNECTIVITY SOLUTIONS
            </p>
            <div className="mt-4 text-sm text-muted-foreground font-mono">
              [SYSTEM READY] © Since 2023 - ALL SYSTEMS OPERATIONAL
            </div>
          </motion.div>
        </header>

        <main className="py-12 md:py-16 lg:py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-12"
            >
              <div className="border-2 border-primary/30 p-4 mb-8 card-glow">
                <p className="text-primary terminal-glow font-mono text-sm md:text-base">
                  SYSTEM MESSAGE: Select a product to access technical documentation and usage guides.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:items-start">
              {products.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="h-full border-2 border-primary/40 bg-card card-glow hover:card-glow-hover transition-all duration-300 flex flex-col">
                    <CardHeader className="flex-none">
                      <div className="flex items-start justify-between mb-2">
                        <Terminal size={32} weight="bold" className="text-primary terminal-glow" />
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-accent/80 font-mono tracking-wider">
                            [OPEN SOURCE]
                          </div>
                          <a 
                            href={product.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                            aria-label={`View ${product.name} on GitHub`}
                          >
                            <GithubLogo 
                              size={24} 
                              weight="bold" 
                              className="text-primary terminal-glow hover:text-accent hover:amber-glow transition-all duration-300 hover:scale-110" 
                            />
                          </a>
                        </div>
                      </div>
                      <CardTitle className="text-2xl md:text-3xl font-bold tracking-wide uppercase terminal-glow-intense text-primary">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-card-foreground/80 text-sm md:text-base font-mono leading-relaxed h-[6.5rem]">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="mb-6 pt-4">
                        <div className="text-xs text-muted-foreground font-mono mb-3 tracking-wide">
                          {'>'} KEY FEATURES:
                        </div>
                        <ul className="space-y-2">
                          {product.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-card-foreground/90 font-mono flex items-start gap-2">
                              <span className="text-accent mt-1">▸</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardContent className="pt-0 flex-none">
                      <div className="flex flex-col gap-3">
                        <a 
                          href={product.docsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button 
                            className="w-full bg-transparent border-2 border-primary text-primary hover:bg-primary/10 hover:border-accent hover:text-accent terminal-glow hover:amber-glow transition-all duration-300 font-mono font-bold tracking-widest uppercase group"
                            size="lg"
                          >
                            <Book size={20} weight="bold" className="mr-2" />
                            [ DOCUMENTATION ]
                            <ArrowRight size={20} weight="bold" className="ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </a>
                        <Button 
                          onClick={() => handleShowImages(product.name)}
                          className="w-full bg-transparent border-2 border-accent text-accent hover:bg-accent/10 hover:border-accent hover:text-accent terminal-glow hover:amber-glow transition-all duration-300 font-mono font-bold tracking-widest uppercase group"
                          size="lg"
                        >
                          <ImageIcon size={20} weight="bold" className="mr-2" />
                          [ SHOW IMAGES ]
                          <ArrowRight size={20} weight="bold" className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-12 border-t-2 border-primary/30 pt-8"
            >
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground font-mono">
                  ┌────────────────────────────────────────────────────────────┐
                </p>
                <p className="text-sm text-primary/70 font-mono">
                  Hammering and Connecting to 3270 Terminals since 2023
                </p>
                <p className="text-sm text-muted-foreground font-mono">
                  └────────────────────────────────────────────────────────────┘
                </p>
              </div>
            </motion.div>
          </div>
        </main>

        <footer className="border-t-2 border-primary/30 py-6 px-6 md:px-12 lg:px-24 mt-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-mono">
              <div>
                [STATUS: ONLINE] | [UPTIME: 99.9%] | [LATENCY: {'<'}10ms]
              </div>
              <div className="text-center md:text-right">
                3270.io - Enterprise Mainframe Solutions
              </div>
            </div>
          </div>
        </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showImages} onOpenChange={handleImagesOpenChange}>
        <DialogContent className="w-[96vw] sm:w-[98vw] h-[92svh] sm:h-[95vh] max-w-[1600px] max-h-[95svh] sm:max-h-[95vh] p-0 border-2 border-primary/40 bg-card overflow-hidden flex flex-col">
          <DialogHeader className="p-4 sm:p-6 border-b-2 border-primary/30 flex flex-row flex-wrap items-center justify-between gap-2 sm:gap-3 space-y-0 shrink-0">
            <DialogTitle className="text-lg sm:text-2xl font-bold tracking-wide uppercase terminal-glow-intense text-primary font-mono flex items-center gap-2 sm:gap-3 flex-wrap">
              <ImageIcon weight="bold" className="text-primary terminal-glow size-7 sm:size-8" />
              {currentProduct} IMAGES
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0 overflow-auto p-4 sm:p-6 relative">
            <div className="w-full">
              <div className="relative">
                <img 
                  src={currentImages[currentImageIndex].url}
                  alt={currentImages[currentImageIndex].alt}
                  className="w-full h-auto max-h-[60svh] sm:max-h-none object-contain sm:object-cover rounded border-2 border-primary/30 card-glow"
                  loading="lazy"
                />
                {currentImages.length > 1 && (
                  <>
                    <Button
                      onClick={handlePrevImage}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-card/90 border-2 border-primary hover:bg-primary/10 hover:border-accent text-primary hover:text-accent terminal-glow hover:amber-glow transition-all duration-300"
                      size="icon"
                      aria-label="Previous image"
                    >
                      <CaretLeft size={24} weight="bold" />
                    </Button>
                    <Button
                      onClick={handleNextImage}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-card/90 border-2 border-primary hover:bg-primary/10 hover:border-accent text-primary hover:text-accent terminal-glow hover:amber-glow transition-all duration-300"
                      size="icon"
                      aria-label="Next image"
                    >
                      <CaretRight size={24} weight="bold" />
                    </Button>
                  </>
                )}
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-center text-muted-foreground font-mono text-sm">
                  {'>'} {currentImages[currentImageIndex].caption}
                </p>
                {currentImages.length > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    {currentImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'w-8 bg-accent terminal-glow' 
                            : 'w-2 bg-primary/40 hover:bg-primary/60'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
