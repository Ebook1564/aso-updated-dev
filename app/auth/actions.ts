"use server";

import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function signupAction(formData: any) {
    const { firstName, userEmail, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
        return { success: false, message: "Security keys do not match." };
    }

    try {
        // Hash passwords for secure storage
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

        const query = `
            INSERT INTO creatednewusertable (username, email, password, repassword)
            VALUES ($1, $2, $3, $4)
            RETURNING id;
        `;
        const values = [firstName, userEmail, hashedPassword, hashedConfirmPassword];
        
        await pool.query(query, values);
        return { success: true, message: "Identity enrolled successfully. Initialize portal access." };
    } catch (error: any) {
        console.error("Signup error:", error);
        if (error.code === '23505') {
            return { success: false, message: "Identity already exists in protocol." };
        }
        return { success: false, message: "Encryption protocol failure." };
    }
}

export async function loginAction(formData: any) {
    const { userEmail, password } = formData;

    try {
        // Search for identity in the primary database
        const userQuery = `SELECT * FROM creatednewusertable WHERE email = $1`;
        const userResult = await pool.query(userQuery, [userEmail]);

        if (userResult.rows.length === 0) {
            return { success: false, message: "Identity not detected." };
        }

        const user = userResult.rows[0];
        // Compare with stored hash
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return { success: false, message: "Security key rejected." };
        }

        // Log session start in userlogintable as requested
        const logQuery = `
            INSERT INTO userlogintable (user_id, email, password)
            VALUES ($1, $2, $3);
        `;
        // Logging the user_id (FK), email, and the hashed password associated with the account
        await pool.query(logQuery, [user.id, userEmail, user.password]);

    } catch (error: any) {
        if (error.digest?.startsWith('NEXT_REDIRECT')) throw error;
        console.error("Login error:", error);
        return { success: false, message: "Portal synchronization error." };
    }
    
    // Redirect to initialization flow
    redirect("/get-started");
}
