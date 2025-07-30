'use client'
import { useSession } from "next-auth/react"
 
export default function UserAvatar() {
  const { data: session } = useSession();

 
  if (!session?.user) return null
 
  return (
    <div>
      <p>{session.user.role}</p>
    </div>
  )
}