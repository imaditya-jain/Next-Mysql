
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/config/db.server";
import type { ResultSetHeader } from "mysql2";
import crypto from "crypto";
import sendMailHelper from "@/app/helper/mails/send-mail.helper";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { firstName, lastName, email, password } = body;

        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verifyToken = crypto.randomBytes(32).toString("hex")
        const otp = verifyToken
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000)
        const baseUrl = request.nextUrl.origin

        const [response] = await pool.query<ResultSetHeader>(
            "INSERT INTO users (firstName, lastName, email, password, otp, otpExpiry) VALUES (?, ?, ?, ?, ?, ?)",
            [firstName, lastName, email, hashedPassword, otp, otpExpiry]
        );

        const data = {
            name: `${firstName} ${lastName}`,
            email: email,
            verificationLink: `${baseUrl}/auth/verify-user?token=${verifyToken}`
        }

        try {
            await sendMailHelper('VERIFY_USER', data)
        } catch (mailError) {
            console.error("Verification email failed:", mailError);

            return NextResponse.json(
                {
                    success: true,
                    emailSent: false,
                    message: "Account created, but the verification email failed. Please request a new verification email.",
                    userId: response.insertId,
                },
                { status: 201 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                emailSent: true,
                message: "Registration successful, Verification email sent",
                userId: response.insertId,
            },
            { status: 201 }
        );

    } catch (error: unknown) {
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "ER_DUP_ENTRY"
        ) {
            return NextResponse.json(
                { success: false, error: "Email already exists" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}