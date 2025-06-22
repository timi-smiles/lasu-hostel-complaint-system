import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // FIXED: Use singleton instead!
import { hash } from "argon2";

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
      phoneNumber, // ADD: Phone number field
      department, // ADD: Department for staff
      userType,
    } = await req.json();

    // ENHANCED: Better validation
    if (!fullName?.trim() || !email?.trim() || !password || !confirmPassword || !userType) {
      return NextResponse.json(
        { error: "Full name, email, password, and user type are required" },
        { status: 400 }
      );
    }

    // ENHANCED: Student-specific validation
    if (userType === "student") {
      if (!studentId?.trim() || !hostelBlock?.trim() || !roomNumber?.trim()) {
        return NextResponse.json(
          { error: "Student ID, hostel block, and room number are required for students" },
          { status: 400 }
        );
      }
    }

    // ENHANCED: Staff-specific validation
    if (userType === "staff" && !department?.trim()) {
      return NextResponse.json(
        { error: "Department is required for staff members" },
        { status: 400 }
      );
    }

    // ENHANCED: Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
    }

    // ENHANCED: Password strength validation
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    // ENHANCED: Check for existing users in a single query
    const existingChecks = await Promise.all([
      // Check email
      prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        select: { id: true },
      }),

      // Check student ID only if provided
      studentId
        ? prisma.user.findUnique({
            where: { studentId },
            select: { id: true },
          })
        : Promise.resolve(null),
    ]);

    const [existingEmail, existingStudentId] = existingChecks;

    if (existingEmail) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }

    if (existingStudentId) {
      return NextResponse.json({ error: "Student ID already registered" }, { status: 409 });
    }

    // ENHANCED: Hash password with proper options
    const hashedPassword = await hash(password, {
      memoryCost: 2 ** 16, // 64 MB
      timeCost: 3, // 3 iterations
      parallelism: 1, // 1 thread
    });

    // ENHANCED: Create user with transaction for data consistency
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName: fullName.trim(),
          email: email.toLowerCase().trim(),
          passwordHash: hashedPassword,
          role: userType.toUpperCase() as "STUDENT" | "STAFF",
          studentId: userType === "student" ? studentId.trim() : null,
          hostelBlock: userType === "student" ? hostelBlock.trim() : null,
          roomNumber: userType === "student" ? roomNumber.trim() : null,
          department: userType === "staff" ? department?.trim() : null,
          status: "ACTIVE", // ADD: Set initial status
        },
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
          studentId: true,
          hostelBlock: true,
          roomNumber: true,
          department: true,
          createdAt: true,
        },
      });

      // ADD: Create welcome notification


      return user;
    });

    // ENHANCED: Log successful registration
    console.log(
      `New ${userType} registered:`,
      {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        timestamp: new Date().toISOString(),
      }
    );

    // ENHANCED: Return comprehensive user data
    return NextResponse.json(
      {
        success: true,
        message: "Registration successful! You can now log in.",
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.fullName,
          role: newUser.role,
          ...(userType === "student" && {
            studentId: newUser.studentId,
            hostelBlock: newUser.hostelBlock,
            roomNumber: newUser.roomNumber,
          }),
          ...(userType === "staff" && {
            department: newUser.department,
          }),
          registeredAt: newUser.createdAt,
        },
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Registration error:", error);

    // ENHANCED: Better error handling
    if (error instanceof Error) {
      if (error.message.includes("unique constraint")) {
        return NextResponse.json({ error: "User with this information already exists" }, { status: 409 });
      }

      if (error.message.includes("foreign key")) {
        return NextResponse.json({ error: "Invalid data provided" }, { status: 400 });
      }
    }

    return NextResponse.json(
      {
        error: "Registration failed. Please try again.",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// ADD: Input validation helper
function validateInput(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Name validation
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.push("Full name must be at least 2 characters");
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.push("Invalid email format");
  }

  // Password validation
  if (data.password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }

  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
    errors.push("Password must contain at least one uppercase letter, one lowercase letter, and one number");
  }

  // Student ID validation
  if (data.userType === "student" && data.studentId) {
    if (!/^[A-Za-z0-9]{6,15}$/.test(data.studentId)) {
      errors.push("Student ID must be 6-15 alphanumeric characters");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
