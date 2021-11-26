import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { callOutline } from 'ionicons/icons';

const IndexTab: React.FC<any> = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle> Tekup DS Ionic </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"> Tekup DS Ionic </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonImg src="assets/contacts.svg" />
        {/*-- fab placed to the bottom end --*/}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href="/contacts">
            <IonIcon icon={callOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default IndexTab
