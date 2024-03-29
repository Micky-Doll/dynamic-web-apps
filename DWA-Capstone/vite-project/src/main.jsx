import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "./store";
import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import ErrorPage from "./error-page";
import HomePage from "./routes/HomePage.jsx";
import { supabase } from "./client.js";
import SeasonPage from "./routes/SeasonPage.jsx";
import Show from "./routes/ShowPage.jsx";
import FavouritesPage from "./routes/FavouritesPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "show/:showId",
        element: <Show />,
      },
      {
        path: "show/:showId/season/:seasonId",
        element: <SeasonPage />,
      },
      {
        path: "favourites/",
        element: <FavouritesPage />,
      },
    ],
  },
]);

function Authentication() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google", "facebook", "twitter"]}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div>
      <Authentication />
    </div>
  </React.StrictMode>
);
