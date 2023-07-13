import { authApi } from "@/api-client";
import useSWR from "swr";
import { PublicConfiguration } from "swr/_internal/dist/index";

const MILLISECOND_PER_HOUR = 60 * 60 * 1000;

export function useAuth(options?: Partial<PublicConfiguration>) {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR("/profile", {
    dedupingInterval: MILLISECOND_PER_HOUR,
    revalidateOnFocus: false,
    ...options,
  });

  const firstLoading = profile === undefined && error === undefined;

  async function login() {
    await authApi.login({
      username: "test1",
      password: "123123",
    });

    await mutate();
  }

  async function logout() {
    await authApi.logout();
    mutate(null, false);
  }

  return { profile, error, login, logout, firstLoading };
}
