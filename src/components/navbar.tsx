// import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
// import { Input } from "@heroui/input";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
// import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import scrollToSection from "@/utils/scrollToSection.ts";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { useScrollSpy } from "@/hooks/useScrollSpy";
// import { Logo } from "@/components/icons";

export const Navbar = () => {
  const sectionIds = siteConfig.navItems.map((item) => item.href);
  const activeSection = useScrollSpy(sectionIds, 60);
  return (
    <HeroUINavbar
      maxWidth="xl"
      classNames={{
        base: "sticky",
        wrapper: "!py-0 h-[60px] !min-h-0 ",
        content: "h-auto !py-0 !min-h-0 items-center",
        item: "!py-0",
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <div className="hidden sm:flex gap-16 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href} className="!py-0">
              <Link
                onClick={() => scrollToSection(item.href)}
                href={`#${item.href}`}
                className={clsx(
                  "cursor-pointer transition-all duration-200",
                  activeSection === item.href
                    ? "text-primary font-semibold"
                    : "text-foreground/80"
                )}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  activeSection === item.href
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                onClick={() => scrollToSection(item.href)}
                href={`#${item.href}`}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
