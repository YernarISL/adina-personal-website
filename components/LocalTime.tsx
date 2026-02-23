"use client"

import React from 'react'
import { useEffect, useState } from 'react'

const LocalTime = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      setTime(`${hours}:${minutes}`)
    }
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval)
    
  }, [])
  return <p className='text-sm text-muted-foreground'>{time} localtime</p>
}

export default LocalTime