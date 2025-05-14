// GameUi.js
"use client"
import { useEffect, useState } from "react"

export default function GameUi() {
  const [count, setCount] = useState(0)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    // ✅ Connect to correct WebSocket port
    const ws = new WebSocket("ws://localhost:3001")

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket server")
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === "update") {
        setCount(data.count)
      }
    }

    ws.onerror = (err) => {
      console.error("❌ WebSocket error", err)
    }

    setSocket(ws)

    return () => {
      ws.close()
    }
  }, [])

  const handleClick = (clickType) => {
    if (clickType === 'increment') {
      setCount(count + 1)
    } else if (clickType === 'decrement') {
      setCount(count - 1)
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(clickType)
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <h1 className="text-4xl font-bold">The count now is {count}</h1>
      <div className="flex flex-row gap-4 text-2xl">
        <button
          className="bg-[#000] text-white p-2 rounded-md hover:cursor-pointer hover:bg-[#333] duration-300"
          onClick={() => handleClick('increment')}
        >
          Increment
        </button>
        <button
          className="bg-[#000] text-white p-2 rounded-md hover:cursor-pointer hover:bg-[#333] duration-300"
          onClick={() => handleClick('decrement')}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
