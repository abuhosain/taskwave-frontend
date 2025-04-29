import {
  CheckIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { updatedStatus, userTasks } from "../../redux/features/tasks/taskSlice";
import { useEffect, useState } from "react";
import TaskDetailsModal from "./taskDetailsModal";
const MyTasks = () => {
  const dispatch = useDispatch();
  const { userSpecificTasks, tasks } = useSelector((state) => state.tasksSlice);
  const { name: userName } = useSelector((state) => state.userSlice);
  const [isOpen, setIsOpen] = useState(false);
  const [taskId, setTaskId] = useState(0);

  const handleModal = (id) => {
    setIsOpen(true);
    setTaskId(id);
  }

  useEffect(() => {
    dispatch(userTasks(userName));
  }, [userName, dispatch, tasks]);
  return (
    <div>
      <TaskDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} id={taskId} />
      <h1 className="text-xl my-3">My Tasks</h1>
      <div className=" h-[750px] overflow-auto space-y-3">
        {userSpecificTasks?.map((task) => (
          <div
            key={task.id}
            className="bg-secondary/10 rounded-md p-3 flex justify-between"
          >
            <h1>{task.title}</h1>
            <div className="flex gap-3">
              <button
                onClick={() => handleModal(task?.id)}
                className="grid place-content-center"
                title="Details"
              >
                <DocumentMagnifyingGlassIcon className="w-5 h-5 text-primary" />
              </button>
              <button
                onClick={() =>
                  dispatch(updatedStatus({ id: task.id, status: "done" }))
                }
                className="grid place-content-center"
                title="Done"
              >
                <CheckIcon className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
