import connectDB from "./configs/mongodb.js"
import User from "./models/userModel.js";

const run = async () => {
    await connectDB();
    const newUser = await User.create({
      clerkId: "testClerkId",
      email: "test@example.com",
      photo: "https://example.com/photo.jpg",
      firstName: "Test",
      lastName: "User"
    });
    console.log("✅ New User Created:", newUser);
    process.exit();
};

run();
