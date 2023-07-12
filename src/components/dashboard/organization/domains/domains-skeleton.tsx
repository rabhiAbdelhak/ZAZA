import { Skeleton, Box } from '@mui/material'
import { useEffect, useState } from 'react'

function generateArrayOfLength(arrayLength = 3) {
  const length = Math.floor(Math.random() * arrayLength) + 1
  return Array.from({ length }, () => Math.floor(Math.random() * 10))
}

export default function DomainsSkeleton() {
  const [data, setDate] = useState(generateArrayOfLength)

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(generateArrayOfLength())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {data.map((el, index) => (
        <Skeleton
          key={el + index}
          variant="rectangular"
          height={50}
          sx={{ width: '100%', borderRadius: 1 }}
        />
      ))}
    </Box>
  )
}
