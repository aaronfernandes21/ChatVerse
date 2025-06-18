import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const deleteSeededUsers = async () => {
  try {
    await connectDB();

    // List of emails you used in seed data
    const seedEmails = [
      "emma.thompson@example.com",
      "olivia.miller@example.com",
      "sophia.davis@example.com",
      "ava.wilson@example.com",
      "isabella.brown@example.com",
      "mia.johnson@example.com",
      "charlotte.williams@example.com",
      "amelia.garcia@example.com",
      "james.anderson@example.com",
      "william.clark@example.com",
      "benjamin.taylor@example.com",
      "lucas.moore@example.com",
      "henry.jackson@example.com",
      "alexander.martin@example.com",
      "daniel.rodriguez@example.com",
    ];

    const result = await User.deleteMany({ email: { $in: seedEmails } });

    console.log(`✅ Deleted ${result.deletedCount} seeded users`);
  } catch (error) {
    console.error("❌ Error deleting seeded users:", error);
  }
};

deleteSeededUsers();
