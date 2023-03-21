import {
  HomeIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  UsersIcon,
  KeyIcon,
  CheckIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  EyeSlashIcon,
  BuildingOffice2Icon,
  ClipboardDocumentCheckIcon,
  ArrowRightOnRectangleIcon,
  DocumentMagnifyingGlassIcon,
  ArrowUpOnSquareIcon,
  QueueListIcon,
  ShieldExclamationIcon,
  QuestionMarkCircleIcon,
  CheckBadgeIcon,
  BuildingStorefrontIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import NavItem from "./NavItem";
import TeamNav from "../interfaces/Team/TeamNav";
import useTeam from "hooks/useTeam";

export default function Sidebar() {
  const router = useRouter();
  const { t } = useTranslation("common");

  const slug = router.query.slug as string;

  const { team } = useTeam(slug);

  return (
    <>
      <aside
        className="transition-width fixed top-0 left-0 z-20 flex h-full w-64 flex-shrink-0 flex-col pt-16 duration-75 lg:flex"
        aria-label="Sidebar"
      >
        <div className="relative flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white pt-0">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex-1 space-y-1 divide-y bg-white px-3">
              <ul className="space-y-2 pb-2">
                <li>
                  <form action="#" method="GET" className="lg:hidden">
                    <label htmlFor="mobile-search" className="sr-only">
                      {t("search")}
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                          className="h-5 w-5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M152.941 391.317c.812-.469 1.307-.202 1.752.57l3.92 6.789c.471.816.303 1.353-.507 1.82l-8.753 5.054c-.672.388-1.437.467-2.125.07l-7.666-4.427c-.956-.552-1.13-.95-.24-1.688.706-.585 1.479-1.092 2.255-1.577 1.238-.774 2.507-1.497 3.77-2.226l7.594-4.385" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="email"
                        id="mobile-search"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:ring-cyan-600"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </li>

                <li>
                  <NavItem
                    href="/dashboard"
                    text="Dashboard"
                    icon={HomeIcon}
                    active={router.pathname === "/dashboard"}
                  />
                </li>
                <li className="menu-title">
                  <span>Privacy</span>
                </li>
                    <li>
                      <NavItem
                        href="/tasks"
                        text="Task Manager"
                        icon={ClipboardDocumentCheckIcon}
                        active={router.pathname === "/tasks"}
                      />
                      <NavItem
                        href="/csc"
                        text="CSC"
                        icon={ClipboardDocumentCheckIcon}
                        active={router.pathname === "/csc"}
                      />
                      <NavItem
                        href="/rpa"
                        text="Record of Processing Activities"
                        icon={ClipboardDocumentCheckIcon}
                        active={router.pathname === "/rpa"}
                      />
                    </li>
                    <li>
                      <NavItem
                        href="/tia"
                        text="Transfer Impact Assessment"
                        icon={ArrowUpOnSquareIcon}
                        active={router.pathname === "/tia"}
                      />
                    </li>
                    <li>
                      <NavItem
                        href="/dpia"
                        text="Data Protection Impact Assessment"
                        icon={DocumentMagnifyingGlassIcon}
                        active={router.pathname === "/privacy"}
                      />
                    </li>
                    <li>
                      <NavItem
                        href="/pqc"
                        text="Self Assessment Questionnaire"
                        icon={QuestionMarkCircleIcon}
                        active={router.pathname === "/saq"}
                      />
                    </li>
                
                <li className="menu-title">
                  <span>Cybersecurity</span>
                </li>
                <li>
                  <NavItem
                    href="/security"
                    text="Cybersecurity Management System"
                    icon={LockClosedIcon}
                    active={router.pathname === "/security"}
                  />
                </li>
                <li>
                  <NavItem
                    href="/security"
                    text="Gap Analysis"
                    icon={ShieldExclamationIcon}
                    active={router.pathname === "/security"}
                  />
                </li>
                <li>
                  <NavItem
                    href="/security"
                    text="Vendor Assessment Questionnaire"
                    icon={CheckBadgeIcon}
                    active={router.pathname === "/security"}
                  />
                </li>
                <li className="menu-title">
                  <span>Compliance</span>
                </li>
                <li>
                  <NavItem
                    href="/compliance"
                    text="Benchmark Report"
                    icon={ShieldCheckIcon}
                    active={router.pathname === "/compliance"}
                  />
                </li>
                <li>
                  <NavItem
                    href="/compliance"
                    text="Interactive Awareness Training"
                    icon={AcademicCapIcon}
                    active={router.pathname === "/compliance"}
                  />
                </li>
                <li>
                  <NavItem
                    href="/compliance"
                    text="Vendor Report"
                    icon={BuildingStorefrontIcon}
                    active={router.pathname === "/compliance"}
                  />
                </li>
              </ul>

               
              <div className="space-y-2 pt-2">
                <NavItem
                    href="/teams"
                    text="Teams"
                    icon={UsersIcon}
                    active={router.pathname === "/teams"}
                  />
              
              {team && (
                <div className="space-y-2 pt-2">
                  <NavItem
                    href="javascript:void(0);"
                    text={team.name}
                    icon={BuildingOffice2Icon}
                    active={false}
                  />
                  <TeamNav slug={slug} />
                </div>
              )}

                <NavItem
                  href="/account"
                  text="Account"
                  icon={UserIcon}
                  active={router.pathname === "/account"}
                />
                <NavItem
                  href="#"
                  text="Logout"
                  icon={ArrowLeftOnRectangleIcon}
                  onClick={() => signOut()}
                  active={false}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div
        className="fixed inset-0 z-10 hidden bg-gray-900 opacity-50"
        id="sidebarBackdrop"
      />
    </>
  );
}
