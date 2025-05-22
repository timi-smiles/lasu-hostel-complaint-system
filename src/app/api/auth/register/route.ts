
import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma"; // Adjust the import path as necessary
import { hash } from "argon2";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      studentId,
      hostelBlock,
      roomNumber,
      userType,
    } = await req.json();

    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !userType ||
      (userType === "student" && (!studentId || !hostelBlock || !roomNumber))
    ) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }

    if (studentId) {
      const existingStudentId = await prisma.user.findUnique({
        where: { studentId },
      });

      if (existingStudentId) {
        return NextResponse.json({ error: "Student ID already registered" }, { status: 409 });
      }
    }

    const hashedPassword = await hash(password); // Argon2 hashing

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash: hashedPassword,
        role: userType.toUpperCase(), // 'STUDENT' or 'STAFF'
        studentId: userType === "student" ? studentId : null,
        hostelBlock: userType === "student" ? hostelBlock : null,
        roomNumber: userType === "student" ? roomNumber : null,
      },
    });

    return NextResponse.json(
      { message: "Registration successful", user: { id: newUser.id, email: newUser.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
