import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Terminal, ArrowRight, Book } from "@phosphor-icons/react"
import { motion } from "framer-motion"

function App() {
  const products = [
    {
      name: "3270Connect",
      description: "Traditional mainframe connectivity solution providing reliable TN3270 terminal emulation and secure access to IBM mainframe systems.",
      docsUrl: "https://3270connect.3270.io",
      features: [
        "TN3270/TN3270E Protocol Support",
        "SSL/TLS Encryption",
        "Session Management",
        "Scripting & Automation"
      ]
    },
    {
      name: "3270Web",
      description: "Modern web-based mainframe interface bringing 3270 terminal access to any browser with zero installation requirements.",
      docsUrl: "https://3270web.3270.io",
      features: [
        "Browser-Based Access",
        "Modern UI/UX",
        "Cross-Platform Compatible",
        "RESTful API Integration"
      ]
    }
  ]

  return (
    <div className="min-h-screen scanlines relative">
      <div className="relative z-10">
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
              {'>'} MAINFRAME CONNECTIVITY SOLUTIONS
            </p>
            <div className="mt-4 text-sm text-muted-foreground font-mono">
              [SYSTEM READY] © 2024 - ALL SYSTEMS OPERATIONAL
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
                  SYSTEM MESSAGE: Select a product to access technical documentation and implementation guides.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Terminal size={32} weight="bold" className="text-primary terminal-glow" />
                        <div className="text-xs text-muted-foreground font-mono">
                          [ACTIVE]
                        </div>
                      </div>
                      <CardTitle className="text-2xl md:text-3xl font-bold tracking-wide uppercase terminal-glow-intense text-primary">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-card-foreground/80 text-sm md:text-base font-mono leading-relaxed">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between">
                      <div className="mb-6">
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
                  IBM 3270 COMPATIBLE TERMINAL EMULATION & WEB SOLUTIONS
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
      </div>
    </div>
  )
}

export default App