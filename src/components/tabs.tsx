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

interface TabProps {
  divisions: Array<DivisionList>;
  tabState: number;
  setOpenTab: (number: number) => void;
}

interface DivisionList {
  name: string;
  number: number;
}

export const Tabs = ({ divisions, tabState, setOpenTab }: TabProps) => {
  const isSmallScreen = useMediaQuery("(max-width: 860px)");
  const [isOpen, setIsOpen] = useState(false);

  if (isSmallScreen) {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild className="relative mb-4 flex flex-row">
          <Button
            className="flex h-8 w-36 cursor-default items-center justify-between rounded-md bg-vektor-darkblue px-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            <div className="flex w-full items-center justify-between">
              {divisions.find((data) => tabState === data.number)?.name ??
                "Select Tab"}
              <ChevronDown className="ml-2" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="m-1 w-full rounded-md bg-white shadow-sm">
          {divisions.map((data) => {
            const chosenStyle =
              tabState === data.number
                ? "font-semibold text-vektor-darkblue"
                : "hover:text-vektor-light-blue";
            return (
              <div key={data.number}>
                <DropdownMenuLabel
                  className={`rouned-md w-full cursor-pointer px-2 py-1 ${chosenStyle}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(data.number);
                    setIsOpen(false);
                  }}
                >
                  {data.name}
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
      {divisions.map((data) => {
        const chosenStyle =
          tabState === data.number
            ? "bg-vektor-darkblue text-white hover:bg-vektor-darkblue"
            : "bg-transparent hover:bg-vektor-light-blue dark:text-white";
        return (
          <div key={data.name}>
            <Button
              type="button"
              className={`my-1 w-32 rounded-full border-none text-black shadow-none ${chosenStyle}`}
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(data.number);
              }}
            >
              {data.name}
            </Button>
          </div>
        );
      })}
    </div>
  );
};
