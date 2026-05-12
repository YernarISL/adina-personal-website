"use client"

import React from 'react'
import { useEffect, useState } from 'react'

const LocalTime = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const baliTime = now.toLocaleString("en-US", {
        timeZone: "Asia/Makassar",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      })

      setTime(baliTime)
    }
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval)
    
  }, [])
  return <p className='text-sm text-muted-foreground'>{time} localtime</p>
}

export default LocalTime