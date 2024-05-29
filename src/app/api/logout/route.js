import { logout } from "@/lib/lib";

export async function POST(request) {
  console.log("Logout API called");
  await logout();
  return new Response(null, { status: 200 });
}
