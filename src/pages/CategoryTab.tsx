import { IonContent, IonSearchbar, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonButtons, IonBackButton, IonButton } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useState } from 'react'
import { useContactCtx } from '../context/ContactContext';
import { searchOutline } from 'ionicons/icons';
import Contacts from '../components/Contacts';

const CategoryTab: React.FC<any> = ({
  category,
  title,
}) => {

  console.log(title, category)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const contactUiProps: any = useContactCtx()

  const onIonCancel = () => {
    contactUiProps.searchContact({ searchText: "", category: ""  }); 
    setShowSearchBar(!showSearchBar)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          { !showSearchBar && <>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>{ title }</IonTitle>
          </>}
          { showSearchBar && <IonSearchbar 
            value={String(contactUiProps?.search?.searchText)} 
            onIonChange={e => contactUiProps.searchContact({ searchText: String(e?.detail?.value), category  })} 
            debounce={500}
            onIonCancel={onIonCancel} 
            showCancelButton="always" animated /> }
          { !showSearchBar && <IonButtons slot="end">
              <IonButton onClick={() => setShowSearchBar(!showSearchBar)}><IonIcon icon={searchOutline} /></IonButton>
            </IonButtons> }
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{ title }</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Contacts contacts={contactUiProps?.contactsByCategory[category]?.contacts || []} />
        {/*-- fab placed to the bottom end --*/}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href={"/add-contact"}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default CategoryTab
