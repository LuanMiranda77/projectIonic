import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { arrowUndoOutline } from "ionicons/icons";
import React, { useEffect, useRef } from "react";
import { Task } from "../../domain/task";
interface Props {
  isOpen: boolean;
  title: string;
  id: string;
  confirmed: (params: Task) => void;
  state: Task;
  setState: (state: Task) => void;
  onClose: () => void;
}

const ModalDefault: React.FC<Props> = ({ isOpen, onClose, confirmed, id, title, setState, state }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const inputRef = useRef<HTMLIonInputElement>(null);

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      confirmed(state);
    }
  }

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        inputRef.current!.setFocus();
      }, 300); 
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color='danger' onClick={() => onClose()}>
              <IonIcon icon={arrowUndoOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              color='primary'
              strong
              onClick={() => {
                confirmed(state);
              }}
            >
              Salvar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            ref={inputRef}
            label="Nome da tarefa"
            labelPlacement="stacked"
            type="text"
            placeholder="Digite o nome"
            value={state.name}
            onIonChange={(e) => {
              const id = state.id != 0 ? state.id : 0;
              setState({ ...state, id: id, name: "" + e.target.value });
            }}
          />
        </IonItem>
      </IonContent>
    </IonModal>
  );
};

export default ModalDefault;
