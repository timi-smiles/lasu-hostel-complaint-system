import { NextResponse } from "next/server"
import { clearJWTCookie } from "@/lib/auth"

export async function POST() {
  try {
    // Clear JWT cookie
    await clearJWTCookie()
    
    return NextResponse.json({ 
      status: "success",
      message: "Logged out successfully" 
    })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ 
      status: "error",
      error: "Internal server error" 
    }, { status: 500 })
  }
}
