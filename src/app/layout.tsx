import { Metadata } from "next";
import React, { Suspense } from "react";
import { Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@providers/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";

import { dataProvider } from "@providers/data-provider";
import "@/app/globals.css";
import { authProvider } from "@providers/auth-provider";
import { ThemeProvider } from "@providers/theme-provider";
import { ToastProvider } from "@providers/toast-provider";
import { TooltipProvider } from "@components/ui/tooltip";
export const metadata: Metadata = {
  title: "NextJS blog admin ✨ ",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <RefineKbarProvider>
            {/* <DevtoolsProvider> */}
              <ThemeProvider>
                <ToastProvider>
                  <TooltipProvider>
                    <Refine
                      routerProvider={routerProvider}
                      dataProvider={dataProvider}
                      authProvider={authProvider}
                      resources={[
                        {
                          name: "blog_posts",
                          list: "/blog-posts",
                          create: "/blog-posts/create",
                          edit: "/blog-posts/edit/:id",
                          show: "/blog-posts/show/:id",
                          meta: {
                            canDelete: true,
                          },
                        },
                        {
                          name: "categories",
                          list: "/categories",
                          create: "/categories/create",
                          edit: "/categories/edit/:id",
                          show: "/categories/show/:id",
                          meta: {
                            canDelete: true,
                          },
                        },
                      ]}
                      options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                        useNewQueryKeys: true,
                        projectId: "ar23uW-2f3NQb-C7rUPC",
                      }}
                    >
                      {children}

                      <RefineKbar />
                    </Refine>
                  </TooltipProvider>
                </ToastProvider>
              </ThemeProvider>
            {/* </DevtoolsProvider> */}
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
