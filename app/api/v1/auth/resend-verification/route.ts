
import { NextRequest, NextResponse } from "next/server";
import pool from "@/config/db.server";
import type { RowDataPacket } from "mysql2";
import crypto from "crypto";
import sendMailHelper from "@/app/helper/mails/send-mail.helper";

interface UserRow extends RowDataPacket {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isVerified: number;
}

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { success: false, error: "Email is required" },
                { status: 400 }
            );
        }

        const [rows] = await pool.query<UserRow[]>(
            "SELECT id, firstName, lastName, email, isVerified FROM users WHERE email = ?",
            [email]
        );

        const user = rows[0];

        if (!user) {
            return NextResponse.json(
                { success: false, error: "No account found with this email" },
                { status: 404 }
            );
        }

        if (user.isVerified) {
            return NextResponse.json(
                { success: false, error: "This account is already verified. Please log in." },
                { status: 400 }
            );
        }

        const verifyToken = crypto.randomBytes(32).toString("hex");
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        const baseUrl = request.nextUrl.origin;

        await pool.query(
            "UPDATE users SET otp = ?, otpExpiry = ? WHERE id = ?",
            [verifyToken, otpExpiry, user.id]
        );

        try {
            await sendMailHelper("VERIFY_USER", {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                verificationLink: `${baseUrl}/auth/verify-user?token=${verifyToken}`,
            });
        } catch (mailError) {
            console.error("Verification email failed:", mailError);

            return NextResponse.json(
                { success: false, error: "Failed to send verification email. Please try again later." },
                { status: 502 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Verification email sent." },
            { status: 200 }
        );

    } catch (error: unknown) {
        console.error("Resend verification error:", error);

        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
