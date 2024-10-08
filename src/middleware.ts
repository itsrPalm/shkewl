import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/group(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const baseHost = `${process.env.DOMAIN}`;
  const host = req.headers.get("host");
  const reqPath = req.nextUrl.pathname;
  const origin = req.nextUrl.origin;
  if (isProtectedRoute(req)) auth().protect();
  if (!baseHost.includes(host as string) && reqPath.includes("/group")) {
    const response = await fetch(`${origin}/api/domain?host=${host}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("DATA[MIDDLEWARE]: ", data.clone);
    if (data.status === 200 && data) {
      return NextResponse.rewrite(
        new URL(
          reqPath,
          `http${process.env.NODE_ENV == "production" ? "s" : ""}://${data.domain}/${reqPath}`,
        ),
      );
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
// import { NextResponse } from "next/server"

// const isProtectedRoute = createRouteMatcher(["/group(.*)"])

// export default clerkMiddleware(async (auth, req) => {
//   const baseHost = `${process.env.DOMAIN}` // You might want to adjust this for different environments (dev/staging/production)
//   const host = req.headers.get("host") as string
//   const reqPath = req.nextUrl.pathname
//   const origin = req.nextUrl.origin

//   // Handle protected routes (check if user is signed in)
//   if (isProtectedRoute(req)) {
//     const session = await auth()

//     // If user is not signed in, redirect to sign-in
//     if (!session.userId) {
//       return NextResponse.redirect(new URL("/sign-in", req.nextUrl))
//     }
//   }

//   // Domain redirection logic for multi-tenancy or subdomains
//   if (!baseHost.includes(host) && reqPath.includes("/group")) {
//     try {
//       const response = await fetch(`${origin}/api/domain?host=${host}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })

//       // Handle the case where domain is resolved successfully
//       if (response.ok) {
//         const data = await response.json()
//         return NextResponse.rewrite(
//           new URL(reqPath, `https://${data.domain}/${reqPath}`),
//         )
//       }
//     } catch (error) {
//       console.error("Error fetching domain information:", error)
//       // Handle fetch errors (optional: return a custom error page or message)
//     }
//   }

//   // Continue with the next response if no rewriting is needed
//   return NextResponse.next()
// })

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// }
