import { Storage } from "@ionic/storage";
import { useEffect, useState } from "react";
import { Task } from "../domain/task";

function useListTask() {
  const storage = new Storage();
  const chave = "lista";
  const [data, setData] = useState<Array<Task>>(new Array<Task>());
  const [task, setTask] = useState<Task>(new Task());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const createDatabase = async () => {
    try {
      await storage.create();
      console.log("Database created successfully");
    } catch (error) {
      console.error("Error creating database:", error);
    }
  };

  async function handleList() {
    try {
      await createDatabase();
      const list = await storage.get(chave);
      if (list) {
        setData([...list] as Array<Task>);
      }
    } catch (error) {
      await storage.set(chave, new Array<Task>());
      console.log("Error ao carregar a lista", error);
    }
  }
  async function handleAdd(task: Task) {
    try {
      await createDatabase();
      const list = [...data];

      if (task.id != 0) {
        list[task.id - 1] = task;
        setData(list);
      } else {
        task.id = list.length + 1;
        list.push(task);
        setData(list);
      }
      console.log(list, task);
      await storage.set(chave, list);
      setIsOpen(false);
      await handleList();
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDel(id: any) {
    try {
      await createDatabase();
      data.splice(id, 1);
      await storage.set(chave, data);
      await handleList();
      console.log(data);
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
    }
  }
  useEffect(() => {
    handleList();
  }, []);

  // useEffect(() => {
  //   handleList();
  // }, [data]);
  return {
    data,
    setData,
    handleAdd,
    handleDel,
    task,
    setTask,
    isOpen,
    setIsOpen,
  };
}

export default useListTask;
