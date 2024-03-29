import { createClient } from "@supabase/supabase-js";
import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { UseContextValue } from "./Context";

export const supabase = createClient(
  "https://bixywrvyrnxwfrpsaqxi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpeHl3cnZ5cm54d2ZycHNhcXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MjE4MTcsImV4cCI6MjAyNzI5NzgxN30.g65CCkRwgiNe7YdQkpbgx8ICVKH4d80i3ONv4_-c_x4"
);

export default function Sign() {
  const { setPhase, setUserLogIn } = UseContextValue();

  //If the signIn is correct then the Phase will change to loading page for preview
  React.useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        //  console.log("User signed in successfully:", session.user.email);
        setUserLogIn(session.user.email);
        setPhase("startPhase");
      }
    });
    return () => {
      authListener.unsubscribe;
    };
  }, []);

  return (
    <div className="signUpdiv">
      <div className="signUp">
        <h1>Galaxy Radio</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["google", "github", "twitter"]}
        />
      </div>
    </div>
  );
}
