import { useEffect, useState } from 'react'

export function FetchWebsite() {
  const [content, setContent] = useState<string>('Loading...')

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch('https://3270.io/')
        const html = await response.text()
        
        const prompt = `I need to extract the key features of 3270Connect from this website HTML.
Look for feature lists, bullet points, or descriptions related to 3270Connect functionality.

Website HTML:
${html}

Please extract and list the main features of 3270Connect in a clean bullet point format.
Focus on technical capabilities and key selling points.`
        
        const features = await window.spark.llm(prompt, 'gpt-4o-mini')
        setContent(features)
      } catch (error) {
        setContent('Error: ' + (error as Error).message)
      }
    }
    
    fetchContent()
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
      {content}
    </div>
  )
}
