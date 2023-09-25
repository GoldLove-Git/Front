import { Outlet, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "../components/Header";

const queryClient = new QueryClient();

const MainLayout = () => {
  const location = useLocation();

  return (
    <>
      <div className="">
        <QueryClientProvider client={queryClient}>
          {location.pathname !== "/" && location.pathname !== "/signup" ? (
            <Header />
          ) : null}
          <Outlet />
        </QueryClientProvider>
      </div>
    </>
  );
};

export default MainLayout;
