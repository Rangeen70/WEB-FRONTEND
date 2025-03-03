import { atomWithStorage } from "jotai/utils";

export const authAtom = atomWithStorage("auth", {
  isAuthenticated: false,
  user: null,
  token: null,
});
