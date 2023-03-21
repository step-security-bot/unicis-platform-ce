import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal, Button } from "react-daisyui";
import { useTranslation } from "next-i18next";
import type { ApiResponse } from "types";
import useTasks from "hooks/useTasks";
import { useFormik } from "formik";

const DeleteTask = ({
  taskId,
  visible,
  setVisible
}: {
  taskId: null | number;
  visible: boolean;
  setVisible: (visible: boolean) => void
}) => {
  const { mutateTasks } = useTasks()
  const { t } = useTranslation("common");

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async () => {
        const response = await axios.delete<ApiResponse<unknown>>(`/api/tasks`, {
            data: {
                taskId
            }
        });

       const { error } = response.data;

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success(t("task-deleted"));

      mutateTasks()
      formik.resetForm()
      setVisible(false)
    },
  });
  
  return (
    <Modal open={visible}>
      <form onSubmit={formik.handleSubmit} method="POST">
        <Modal.Header className="font-bold">{`Delete task`}</Modal.Header>
        <Modal.Body>
          <div className="mt-2 flex flex-col space-y-4">
            <p>{t("delete-task-warning")}</p>
          </div>
        </Modal.Body>
        <Modal.Actions>
          <Button
            type="submit"
            color="error"
            loading={formik.isSubmitting}
            active={formik.dirty}
          >
            {t("delete-task")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setVisible(!visible);
            }}
          >
            {t("close")}
          </Button>
        </Modal.Actions>
      </form>
    </Modal>
  );
};

export default DeleteTask;
