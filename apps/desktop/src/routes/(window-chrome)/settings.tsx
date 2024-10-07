import { A, type RouteSectionProps, useLocation } from "@solidjs/router";
import { cx } from "cva";
import { For } from "solid-js";
import { Button } from "@cap/ui-solid";
import { commands } from "~/utils/tauri";

export default function (props: RouteSectionProps) {
  const location = useLocation();

  const handleSignOut = async () => {
    await commands.deleteAuthOpenSignin();
  };

  return (
    <div class="h-[calc(100vh-3rem)] flex flex-row divide-x divide-gray-200 text-[0.875rem] leading-[1.25rem]">
      <div class="h-full flex flex-col">
        <ul class="min-w-[12rem] h-full p-[0.625rem] space-y-2">
          <For
            each={[
              { href: "general", name: "General", icon: IconCapSettings },
              { href: "hotkeys", name: "Shortcuts", icon: IconCapHotkeys },
              {
                href: "recordings",
                name: "Previous Recordings",
                icon: IconLucideVideo,
              },
              {
                href: "screenshots",
                name: "Previous Screenshots",
                icon: IconLucideCamera,
              },
            ]}
          >
            {(item) => {
              const isActive = () => location.pathname.includes(item.href);
              return (
                <li>
                  <A
                    href={item.href}
                    class={cx(
                      "rounded-lg h-[2rem] px-[0.375rem] flex flex-row items-center gap-[0.375rem] transition-colors",
                      isActive()
                        ? "bg-blue-50 border border-blue-200 text-blue-700"
                        : "hover:bg-gray-100"
                    )}
                  >
                    <item.icon class="size-[1.25rem]" />
                    <span>{item.name}</span>
                  </A>
                </li>
              );
            }}
          </For>
        </ul>
        <div class="p-[0.625rem]">
          <Button onClick={handleSignOut} variant="secondary" class="w-full">
            Sign Out
          </Button>
        </div>
      </div>
      <div class="flex-1 bg-gray-50">{props.children}</div>
    </div>
  );
}
