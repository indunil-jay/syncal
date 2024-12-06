import { signOut } from "@/app/(auth)/action";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  return (
    <div>
      <p>setting page</p>
      {JSON.stringify(session)}

      <form action={signOut}>
        <button type="submit">sign out</button>
      </form>
    </div>
  );
}
