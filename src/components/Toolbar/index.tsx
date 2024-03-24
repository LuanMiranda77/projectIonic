import { IonButton, IonHeader, IonIcon, IonLabel, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import React from "react";
import "./toolbar.css";

interface Props {
  title: string;
  actionButton?:()=>void;
}

const Toolbar: React.FC<Props> = ({ title, actionButton }) => {
  return (
    <IonHeader>
      <IonToolbar color="primary" className="toolbar">
        <IonRow>
          <IonTitle>{title}</IonTitle>
          <IonButton id="open-modal" expand="block" color='danger' className="font-bold" onClick={actionButton}>
            <IonIcon className="font-bold" icon={addCircleOutline} style={{ marginRight: "5px" }} />
            <IonLabel>Novo</IonLabel>
          </IonButton>
        </IonRow>
      </IonToolbar>
    </IonHeader>
  );
};

export default Toolbar;
