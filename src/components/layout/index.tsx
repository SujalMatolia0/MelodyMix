import React from "react";
import { AppShell } from "@mantine/core";
import { useAtom } from "jotai";
import { NavbarAtom } from "~/lib/jotai";

interface MainLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  navbar?: React.ReactNode;
}

export const MainLayout = ({
  children,
  footer,
  header,
  navbar,
}: MainLayoutProps) => {
  const [NavbarState] = useAtom(NavbarAtom);

  return (
    <AppShell
      header={
        header
          ? {
              height: 60,
              collapsed: false,
            }
          : { height: 0, collapsed: true }
      }
      footer={
        footer
          ? {
              height: 60,
              collapsed: false,
            }
          : { height: 0, collapsed: true }
      }
      navbar={
        navbar
          ? {
              width: 300,
              breakpoint: "sm",
              collapsed: {
                mobile: !NavbarState,
                desktop: !!NavbarState,
              },
            }
          : {
              width: 0,
              breakpoint: "sm",
              collapsed: { mobile: true, desktop: true },
            }
      }
      padding={0}
    >
      {header && <AppShell.Header withBorder={true}>{header}</AppShell.Header>}

      {navbar && (
        <AppShell.Navbar zIndex={999} h="100%" withBorder={true}>
          {navbar}
        </AppShell.Navbar>
      )}

      <AppShell.Main>{children}</AppShell.Main>

      {footer && <AppShell.Footer zIndex={1000} withBorder={false}>{footer}</AppShell.Footer>}
    </AppShell>
  );
};
