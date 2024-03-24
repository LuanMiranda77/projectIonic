import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
} from "@ionic/react";
import { pencilOutline, trash, trashBinOutline } from "ionicons/icons";
import React from "react";
import ModalDefault from "../components/ModalDefault";
import Toolbar from "../components/Toolbar";
import { Task } from "../domain/task";
import useListTask from "../hooks/useListTask";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const { data, isOpen, setIsOpen, handleAdd, handleDel, setTask, task } = useListTask();
  return (
    <IonPage>
      <Toolbar
        title="Tarefas"
        actionButton={() => {
          setTask(new Task());
          setIsOpen(true);
        }}
      />
      <IonContent fullscreen>
        <IonListHeader>
          <div className="font-bold custom-id-label">Codigo</div>
          <IonLabel className="font-bold">Tarefas</IonLabel>
        </IonListHeader>
        <IonList>
          {data.length != 0 ? data.map((item, index) => (
            <IonItem key={index}>
              <div className="custom-id-label">{item.id}</div>
              <IonLabel>{item.name}</IonLabel>
              <IonButtons>
                <IonButton
                  title="Editar"
                  onClick={() => {
                    setIsOpen(true);
                    setTask(item);
                  }}
                >
                  <IonIcon icon={pencilOutline} color='primary'/>
                </IonButton>
                <IonButton title="Deletar" onClick={() => handleDel(index)}>
                  <IonIcon icon={trash} color='danger'/>
                </IonButton>
              </IonButtons>
            </IonItem>
          )):<IonLabel>Lista vazia</IonLabel>}
        </IonList>
        {/* <IonButton className="icon-button" id="open-action-sheet">
          Acionar
        </IonButton>
        <IonActionSheet
          trigger="open-action-sheet"
          header="Actions"
          buttons={[
            {
              text: "Delete",
              role: "destructive",
              data: {
                action: "delete",
              },
            },
            {
              text: "Edite",
              data: {
                action: "share",
              },
            },
            {
              text: "Cancel",
              role: "cancel",
              data: {
                action: "cancel",
              },
            },
          ]}
        ></IonActionSheet> */}
      </IonContent>
      <ModalDefault
        id="open-modal"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        confirmed={handleAdd}
        title="Adiconar tarefas"
        state={task}
        setState={setTask}
      />
    </IonPage>
  );
};

export default Tab1;
