
import { type ClassValue, clsx } from "clsx"
import { Star } from "lucide-react"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className='flex flex-row justify-start'>
      {[...Array(rating)].map((_, index) => (
        <Star key={index} />
      ))}
    </div>
  )
}