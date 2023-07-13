import { Auth } from "@/components/common";
import { useAuth } from "@/hooks";
import { LayoutProps } from "@/models/common";
import Link from "next/link";
import { useRouter } from "next/router";

export function AdminLayout({ children }: LayoutProps) {
  const { profile, logout } = useAuth();
  const router = useRouter();

  async function handleLogoutClick() {
    try {
      await logout();
      console.log("logout");
      router.push("/login");
    } catch (error) {
      console.log("failed to logout", error);
    }
  }

  return (
    <Auth>
      <h1>Admin Layout</h1>
      <div>Sidebar</div>

      <p>Profile: {JSON.stringify(profile)}</p>

      <button onClick={handleLogoutClick}>Logout</button>

      <Link href="/">
        <a>Home</a>
      </Link>

      <Link href="/about">
        <a>About</a>
      </Link>

      <div>{children}</div>
    </Auth>
  );
}
