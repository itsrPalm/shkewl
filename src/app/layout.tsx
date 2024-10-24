import { ThemeProvider } from "@/components/theme";
import { ReactQueryProvider } from "@/react-query/provider";
import { ReduxProvider } from "@/redux/provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./global.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdvancedPractice",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/group/create"
      signUpFallbackRedirectUrl="/group/create"
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${jakarta.className} bg-black z-40`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <ReduxProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </ReduxProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

// import { ThemeProvider } from "@/components/theme"
// import { ReactQueryProvider } from "@/react-query/provider"
// import { ReduxProvider } from "@/redux/provider"
// import { ClerkProvider } from "@clerk/nextjs"
// import { Plus_Jakarta_Sans } from "next/font/google"
// import { Toaster } from "sonner"
// import "./global.css"

// const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] })

// export const metadata = {
//   title: "AdvancedPractice",
//   description: "Generated by create next app",
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <ClerkProvider
//       signInUrl="/sign-in"
//       signUpUrl="/sign-up"
//       signInFallbackRedirectUrl="/group/create"
//       signUpFallbackRedirectUrl="/group/create"
//     >
//       <html lang="en" suppressHydrationWarning>
//         <body className={`${jakarta.className} bg-black`}>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="dark"
//             disableTransitionOnChange
//           >
//             <ReduxProvider>
//               <ReactQueryProvider>{children}</ReactQueryProvider>
//             </ReduxProvider>
//             <Toaster />
//           </ThemeProvider>
//         </body>
//       </html>
//     </ClerkProvider>
//   )
// }
