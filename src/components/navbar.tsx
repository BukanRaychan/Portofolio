// import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
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
import logo from "@/assets/images/logo.png";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useWorks } from "@/context/works-context";
import InsertDriveFile from "@mui/icons-material/InsertDriveFile";
// import { Logo } from "@/components/icons";

export const Navbar = () => {
  const sectionIds = siteConfig.navItems.map((item) => item.href);
  const activeSection = useScrollSpy(sectionIds, 60);
  const { resetActiveWork } = useWorks();

  return (
    <HeroUINavbar
      maxWidth="2xl"
      classNames={{
        base: "sticky",
        wrapper: "!py-0 h-[60px] !min-h-0 ",
        content: "h-auto !py-0 !min-h-0 !items-center ",
        item: "!py-0",
      }}
    >
      <NavbarContent className="basis-1/5 md:basis-full flex gap-16" justify="start">
        <img src={logo} alt={"Logo"} className={`w-8 scale-auto`} />
        <div className="hidden md:flex gap-16 justify-center">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href} className="!py-0">
              <Link
                onClick={() => {
                  scrollToSection(item.href);
                  if (item.href == "works") resetActiveWork();
                }}
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

      <NavbarContent className="basis-full flex md:hidden" >
        <div className="mx-auto">
          <Button
            className=""
            as="a"
            href={
              "https://drive.google.com/uc?export=download&id=1oH3qMamQM7yTF819GqR5VBopzJ0Z_zKg"
            }
            color="primary"
          >
            <InsertDriveFile />
            <span className="font-semibold">Download CV</span>
          </Button>
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden md:flex basis-1/5 md:basis-full "
        justify="end"
      >
        <NavbarItem className="hidden md:flex gap-2">
          <ThemeSwitch className="hidden absolute" />
          <Button
            as="a"
            href={
              "https://drive.google.com/uc?export=download&id=1oH3qMamQM7yTF819GqR5VBopzJ0Z_zKg"
            }
            color="primary"
          >
            <InsertDriveFile />
            <span className="font-semibold">Download CV</span>
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch className="hidden absolute" />
        <NavbarMenuToggle icon="" />
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
