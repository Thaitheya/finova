
import { Skeleton } from './ui/skeleton'

const Feedback = () => {
  return (
     <div className='flex flex-col gap-4 justify-content justify-items-center bg-[#1E1E1E] p-4'>
        <div className="flex w-fit items-center gap-4">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <div className="grid gap-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
     </div>
  )
}

export default Feedback