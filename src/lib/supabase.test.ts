import { afterEach, describe, expect, it, vi } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "./supabase";

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({ from: vi.fn() }))
}));

const envBackup = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
};

afterEach(() => {
  vi.clearAllMocks();
  process.env.NEXT_PUBLIC_SUPABASE_URL = envBackup.NEXT_PUBLIC_SUPABASE_URL;
  process.env.SUPABASE_SERVICE_ROLE_KEY = envBackup.SUPABASE_SERVICE_ROLE_KEY;
});

describe("createSupabaseAdminClient", () => {
  it("接続情報が欠けるとnullを返す", () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    expect(createSupabaseAdminClient()).toBeNull();
    expect(createClient).not.toHaveBeenCalled();
  });

  it("サービスロールでセッション永続化を無効にする", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-key";

    createSupabaseAdminClient();

    expect(createClient).toHaveBeenCalledWith("https://example.supabase.co", "service-role-key", {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  });
});
