import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import {
  type AccountMode,
  getAccountModeLabel,
} from "@core/constants/accountModes";

const STORAGE_KEY = "zurqa-prototype-auth";

type StoredAuth = {
  isLoggedIn: boolean;
  activeMode: AccountMode | null;
};

type LegacyStoredAuth = {
  isLoggedIn?: boolean;
  isEditor?: boolean;
  isAdmin?: boolean;
  activeMode?: AccountMode | null;
};

type AuthContextValue = {
  isLoggedIn: boolean;
  activeMode: AccountMode | null;
  activeModeLabel: string | null;
  isJournalist: boolean;
  isMediaPractitioner: boolean;
  isEditor: boolean;
  isAdmin: boolean;
  canManageContent: boolean;
  canManageTerms: boolean;
  canContributeContent: boolean;
  login: () => void;
  logout: () => void;
  toggleAccountMode: (mode: AccountMode) => void;
  /** @deprecated استخدم toggleAccountMode — يُبقى للتوافق المؤقت */
  toggleEditor: () => void;
  /** @deprecated استخدم toggleAccountMode — يُبقى للتوافق المؤقت */
  toggleAdmin: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function resolveActiveMode(raw: LegacyStoredAuth): AccountMode | null {
  if (raw.activeMode) return raw.activeMode;
  if (raw.isAdmin) return "admin";
  if (raw.isEditor) return "editor";
  return null;
}

function readStoredAuth(): StoredAuth {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { isLoggedIn: false, activeMode: null };
    }
    const parsed = JSON.parse(raw) as LegacyStoredAuth;
    return {
      isLoggedIn: Boolean(parsed.isLoggedIn),
      activeMode: resolveActiveMode(parsed),
    };
  } catch {
    return { isLoggedIn: false, activeMode: null };
  }
}

function writeStoredAuth(state: StoredAuth) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [auth, setAuth] = useState<StoredAuth>(readStoredAuth);

  const persist = useCallback(
    (updater: StoredAuth | ((prev: StoredAuth) => StoredAuth)) => {
      setAuth((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        writeStoredAuth(next);
        return next;
      });
    },
    [],
  );

  const login = useCallback(() => {
    persist((prev) => ({ ...prev, isLoggedIn: true }));
  }, [persist]);

  const logout = useCallback(() => {
    persist({ isLoggedIn: false, activeMode: null });
  }, [persist]);

  const toggleAccountMode = useCallback(
    (mode: AccountMode) => {
      persist((prev) => ({
        ...prev,
        isLoggedIn: true,
        activeMode: prev.activeMode === mode ? null : mode,
      }));
    },
    [persist],
  );

  const toggleEditor = useCallback(() => {
    toggleAccountMode("editor");
  }, [toggleAccountMode]);

  const toggleAdmin = useCallback(() => {
    toggleAccountMode("admin");
  }, [toggleAccountMode]);

  const value = useMemo<AuthContextValue>(() => {
    const isJournalist = auth.activeMode === "journalist";
    const isMediaPractitioner = auth.activeMode === "media_practitioner";
    const isEditor = auth.activeMode === "editor";
    const isAdmin = auth.activeMode === "admin";

    return {
      isLoggedIn: auth.isLoggedIn,
      activeMode: auth.activeMode,
      activeModeLabel: getAccountModeLabel(auth.activeMode),
      isJournalist,
      isMediaPractitioner,
      isEditor,
      isAdmin,
      canManageContent: isEditor || isAdmin,
      canManageTerms: isEditor || isAdmin,
      canContributeContent:
        isJournalist || isMediaPractitioner || isEditor || isAdmin,
      login,
      logout,
      toggleAccountMode,
      toggleEditor,
      toggleAdmin,
    };
  }, [auth, login, logout, toggleAccountMode, toggleEditor, toggleAdmin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
