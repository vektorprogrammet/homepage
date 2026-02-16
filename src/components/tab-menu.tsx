import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@mantine/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";

export function TabMenu<T extends string>({
  tabs,
  activeTab,
  setActiveTab,
  className,
}: {
  tabs: Array<T>;
  activeTab: T;
  setActiveTab: (tab: T) => void;
  className?: string;
}) {
  const isSmallScreen = useMediaQuery("(max-width: 1023px)");
  const [isOpen, setIsOpen] = useState(false);

  if (isSmallScreen) {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild className="relative mb-4 flex flex-row">
          <Button
            className={cn(
              "flex h-8 w-36 cursor-default items-center justify-between rounded-md bg-vektor-darkblue px-2 text-white",
              className,
            )}
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            <div className="flex w-full items-center justify-between">
              {activeTab ?? "Select Tab"}
              <ChevronDown className="ml-2" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="m-1 w-full rounded-md bg-white shadow-sm">
          {tabs.map((tab) => {
            const chosenStyle =
              activeTab === tab
                ? "font-semibold text-vektor-darkblue"
                : "hover:text-vektor-light-blue";
            return (
              <div key={tab}>
                <DropdownMenuLabel
                  className={`rouned-md w-full cursor-pointer px-2 py-1 ${chosenStyle}`}
                  onClick={() => {
                    setActiveTab(tab);
                    setIsOpen(false);
                  }}
                >
                  {tab}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </div>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex flex-row md:flex-col">
      {tabs.map((tab) => {
        const chosenStyle =
          activeTab === tab
            ? "bg-vektor-darkblue text-white hover:bg-vektor-darkblue"
            : "bg-transparent hover:bg-vektor-light-blue dark:text-white";
        return (
          <div key={tab}>
            <Button
              type="button"
              className={`my-1 w-32 rounded-full border-none text-black shadow-none ${chosenStyle}`}
              onClick={() => {
                setActiveTab(tab);
              }}
            >
              {tab}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
