import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-[calc(60vh-8rem)] flex items-center justify-center">
      <SignIn />
    </div>
  )
}