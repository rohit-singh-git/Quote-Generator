
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [quote, setQuote] = useState(null)
  const [author, setAuthor] = useState("")

  const API = import.meta.env.VITE_API_KEY

  const getQuote = async () => {
    try {
      const data = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": API
        }
      })

      if (!data.ok) {
        console.error("Could not fetch quote now.")
      }

      const response = await data.json()

      setQuote(response[0].quote)
      setAuthor(response[0].author)

    } catch (error) {
      console.error("Error fetching quote: ", error)
    }
  }

  useEffect(() => {
    getQuote()
  }, [])

  return (
    <div>
      {quote && (
        <div>
          <h2 className='quote'>Quote</h2>
          <h4>{quote}</h4>
          <h2 className='author'>Author</h2>
          <h4>{author}</h4>
        </div>
      )}

      <button onClick={getQuote}>Get Quote</button>
    </div>
  )
}

export default App
