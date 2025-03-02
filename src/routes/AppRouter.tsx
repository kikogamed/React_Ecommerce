import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LottieHandler } from '@components/feedback';
// Pages
const Home = lazy(() => import("@pages/Home"));
const Categories = lazy(() => import("@pages/Categories"));
const About = lazy(() => import("@pages/About"));
const Products = lazy(() => import("@pages/products"));
const Login = lazy(() => import("@pages/login"));
const Register = lazy(() => import("@pages/register"));
const Account = lazy(() => import("@pages/Account"));
const Orders = lazy(() => import("@pages/Orders"));
const ProfileLayout = lazy(() => import('@layouts/profileLayout/profileLayout'));

// error
import Error from '@pages/error';

// layouts
const MainLayout = lazy(() => import('@layouts/MainLayouts/MainLayouts'));
import Cart from '@pages/Cart';
import Wishlist from '@pages/wishlist';
import ProtectedRoute from '@components/Auth/ProtectedRoute';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Suspense fallback={<LottieHandler type="layoutLoading" />}>
        <MainLayout/>
      </Suspense>,
      errorElement: <Error></Error>,
      children: [
        {
          index: true,
          element: <Suspense fallback={<LottieHandler type="loading" />}>
            <Home></Home>
          </Suspense>
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<LottieHandler type="loading" />}>
                <Cart></Cart>
              </Suspense>
            </ProtectedRoute>
          )
        },
        {
          path: "wishlist",
          element: ( 
            <ProtectedRoute>
              <Suspense fallback={<LottieHandler type="loading" />}>
                <Wishlist />
              </Suspense>
            </ProtectedRoute>
          )
        },
        {
          path: "categories",
          element: <Suspense fallback={<LottieHandler type="loading" />}>
            <Categories></Categories>
          </Suspense>
        },
        {
          path: "about",
          element: <Suspense fallback={<LottieHandler type="loading" />}>
            <About></About>
          </Suspense>
        },
        {
          path: "categories/products/:prefix",
          element: <Suspense fallback={<LottieHandler type="loading" />}>
            <Products></Products>
          </Suspense>,
          // loader is function to deal with page before loading it
          loader: ({params}) => {
            // if user send category and it's not string or has number or 
            // special char 
            // show error to user
            if(typeof params.prefix !== "string" ||
               !/^[a-z]+$/i.test(params.prefix)
            ) {
              throw new Response("Bad Request", {
                statusText: "Category Not Found!",
                status: 400,
              });
            }
            // return true means continue to page
            // loader must has return
            return true;
          }
        },
        {
          path: "login",
          element: <Suspense fallback={<LottieHandler type="loading" />}>
            <Login></Login>
          </Suspense>
        },
        {
          path: "register",
          element: <Suspense fallback={<LottieHandler type="loading" />}>
            <Register/>
          </Suspense>
        },
        {
          path: "profile",
          element: (
          <ProtectedRoute>
            <Suspense fallback={<LottieHandler type="loading" />}>
                <ProfileLayout />
            </Suspense>
          </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              path: "",
              element: (
                <Suspense fallback={<LottieHandler type="loading" />}>
                  <Account />
                </Suspense>
              )
            }, 
            {
              path: "orders",
              element: (
                <Suspense fallback={<LottieHandler type="loading" />}>
                  <Orders />
                </Suspense>
              )
            }
          ]
        },
      ]
    }
]);

const AppRouter = () => {
  return <RouterProvider router={router}/>
}

export default AppRouter;