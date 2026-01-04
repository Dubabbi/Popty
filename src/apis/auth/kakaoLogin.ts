import { supabase } from "@/supabase/client";

export async function signInWithKakao() {
  const redirectTo = `${window.location.origin}/auth/callback`;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo,
      scopes: "profile_nickname profile_image",
    },
  });

  if (error) throw error;
}
