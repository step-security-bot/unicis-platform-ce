import type { NextPageWithLayout } from "types";
import type {InferGetServerSidePropsType} from "next"
import { Button } from "react-daisyui";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { Task } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { CreateTask, Tasks, DeleteTask, EditTask } from "@/components/interfaces/Task";
import styled from 'styled-components'

import { getOwnedTeams } from "models/team";
import { getSession } from "@/lib/session";

const AllTasks: NextPageWithLayout<
InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ teams }) => {
  const [visible, setVisible] = useState(false);

  const [deleteVisible, setDeleteVisible] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<null | number>(null)

  const [editVisible, setEditVisible] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState<Task>({} as Task)
  const { t } = useTranslation("common");

  return (
    <>
      <div className="flex items-center justify-between">
        <h4>{t("all-tasks")}</h4>
        <Button
          size="sm"
          color="primary"
          className="text-white"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          {t("create-task")}
        </Button>
      </div>
      <CreateTask visible={visible} setVisible={setVisible} teams={teams}/>
      <EditTask visible={editVisible} setVisible={setEditVisible} teams={teams} task={taskToEdit}/>
      <DeleteTask visible={deleteVisible} setVisible={setDeleteVisible} taskId={taskToDelete}/>
      <Tasks 
        setTaskToDelete={setTaskToDelete}
        setDeleteVisible={setDeleteVisible}
        setTaskToEdit={setTaskToEdit}
        setEditVisible={setEditVisible}
      />
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, res, locale }: GetServerSidePropsContext = context;

  const session = await getSession(req, res);

  //deleteCookie("pending-invite", { req, res });
  //TODO: should delete getOwnedTeams
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
      teams: await getOwnedTeams(session?.user.id as string),
    },
  };
};

// export async function getStaticProps({ locale }: GetServerSidePropsContext) {
//   return {
//     props: {
//       ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
//     },
//   };
// }

export default AllTasks;
