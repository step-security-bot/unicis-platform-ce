import React from "react";
import Link from "next/link";
import Lozenge from '@atlaskit/lozenge';
import { SimpleTag as Tag } from '@atlaskit/tag';
import statuses from "@/components/defaultLanding/data/statuses.json"
import type { TaskWithRpaProcedure } from "types";
import { Button } from "react-daisyui";
import { useTranslation } from "next-i18next";
import usePagination from "hooks/usePagination";
import { TailwindTableWrapper } from "sharedStyles";

const RpaTable = ({
  slug,
  tasks,
  perPage,
  editHandler,
  deleteHandler,
}: {
  slug: string;
  tasks: Array<TaskWithRpaProcedure>;
  perPage: number;
  editHandler: (task: TaskWithRpaProcedure) => void
  deleteHandler: (task: TaskWithRpaProcedure) => void
}) => {
  const { t } = useTranslation("common");
  const {
    currentPage,
    totalPages,
    pageData,
    goToPreviousPage,
    goToNextPage,
    prevButtonDisabled,
    nextButtonDisabled,
  } = usePagination<TaskWithRpaProcedure>(tasks, perPage);

  return (
    <>
      <TailwindTableWrapper>
        <div
          className="overflow-x-auto"
        >
          <table className="w-full table-fixed text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  {t("rpa")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("status")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("rpa-dpo")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("rpa-review")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("rpa-data-tranfer")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("rpa-category")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((task, index) =>
                <tr key={index} className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  <td className="px-6 py-3">
                    <Link href={`/teams/${slug}/tasks/${task.taskNumber}`}>
                      <div className="flex items-center justify-start space-x-2">
                        <span className="underline">{task.title}</span>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-3">
                    <Lozenge>{statuses.find(({ value }) => value === task.status)?.label}</Lozenge>
                  </td>
                  <td className="px-6 py-3">
                    <span>{task.properties.rpa_procedure[0].dpo.label}</span>
                  </td>
                  <td className="px-6 py-3">
                    <Tag text={task.properties.rpa_procedure[0].reviewDate} />
                  </td>
                  <td className="px-6 py-3">
                    <>
                      {task.properties.rpa_procedure[3].datatransfer
                        ? <Lozenge appearance="success">Enabled</Lozenge>
                        : <Lozenge appearance="removed">Disabled</Lozenge>
                      }
                    </>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex flex-col">
                      {task.properties.rpa_procedure[1].specialcategory.map((category, index) => <Tag key={index} text={category.label} />)}
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="btn-group">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          editHandler(task)
                        }}
                      >
                        {t("edit-task")}
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          deleteHandler(task)
                        }}
                      >
                        {t("delete-task")}
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {pageData.length
          ? <div className="flex justify-center w-30">
            <div className="btn-group join grid grid-cols-10">
              <button className="join-item btn btn-outline col-span-4" onClick={goToPreviousPage} disabled={prevButtonDisabled}>Previous page</button>
              <button className="join-item btn btn-outline col-span-2">{`${currentPage}/${totalPages}`}</button>
              <button className="join-item btn btn-outline col-span-4" onClick={goToNextPage} disabled={nextButtonDisabled}>Next</button>
            </div>
          </div>
          : null
        }
      </TailwindTableWrapper>
    </>
  )
}

export default RpaTable