import {
  CheckIcon,
  DocumentMagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import {   updatedStatus } from '../../redux/features/tasks/taskSlice';

const MyTasks = () => {
  const dispatch = useDispatch();
 const {tasks} = useSelector((state) => state.tasksSlice);
  return (
    <div>
      <h1 className="text-xl my-3">My Tasks</h1>
      <div className=" h-[750px] overflow-auto space-y-3">
       {
        tasks.map((task) => (
          <div
          key={task.id}
          className="bg-secondary/10 rounded-md p-3 flex justify-between"
        >
          <h1>{task.title}</h1>
          <div className="flex gap-3">
            <button className="grid place-content-center" title="Details">
              <DocumentMagnifyingGlassIcon className="w-5 h-5 text-primary" />
            </button>
            <button onClick={() => dispatch(updatedStatus({ id: task.id, status: "done" }))} className="grid place-content-center" title="Done">
              <CheckIcon className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
        ))
       }
      </div>
    </div>
  );
};

export default MyTasks;
