"use server";

import pool from "@/lib/db";
import { initDatabase } from "@/lib/init-db";

export async function submitForm(formData: {
  name: string;
  email: string;
  phonenumber: string;
  country: string;
  appurl: string;
}) {
  try {
    // Ensure table exists (initDatabase likely handles multiple tables now)
    await initDatabase();

    const query = `
      INSERT INTO asousertable (name, email, phonenumber, country, appurl)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;

    const values = [
      formData.name,
      formData.email,
      formData.phonenumber,
      formData.country,
      formData.appurl,
    ];

    const result = await pool.query(query, values);
    const asoId = result.rows[0].id;

    // Update formfilledtable status to 1
    await pool.query(
      "UPDATE formfilledtable SET status = 1, updated_at = CURRENT_TIMESTAMP WHERE email = $1",
      [formData.email]
    );

    // Also link the account if it exists
    const accountRes = await pool.query(
      "SELECT id FROM creatednewusertable WHERE email = $1",
      [formData.email]
    );
    if (accountRes.rows.length > 0) {
      await pool.query(
        "UPDATE formfilledtable SET user_id = $1 WHERE email = $2",
        [accountRes.rows[0].id, formData.email]
      );
    }
    
    return { 
      success: true, 
      id: asoId,
      message: "Enquiry submitted and saved to database." 
    };
  } catch (error) {
    console.error("Database submission error:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to save data." 
    };
  }
}

export async function checkFormStatus(email: string) {
  try {
    // Join with asousertable to get the submission ID
    const query = `
      SELECT f.status, a.id as aso_id 
      FROM formfilledtable f
      LEFT JOIN asousertable a ON f.email = a.email
      WHERE f.email = $1
      ORDER BY a.created_at DESC
      LIMIT 1
    `;
    const res = await pool.query(query, [email]);
    
    if (res.rows.length > 0) {
      return { 
        success: true, 
        status: res.rows[0].status, 
        id: res.rows[0].aso_id 
      };
    }
    return { success: true, status: 0, id: null }; // Default to not filled
  } catch (error) {
    console.error("Check form status error:", error);
    return { success: false, status: 0, id: null };
  }
}
