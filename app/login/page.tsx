import { createClient } from "@/lib/supabase/server";
import { LoginView } from "./LoginView";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("logo_url")
    .eq("id", 1)
    .single();

  return <LoginView logo={data?.logo_url ?? null} />;
}
