import { Route, Redirect } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import '../theme/variables.css';

import {useContactCtx} from '../context/ContactContext';
import CategoryTab from '../pages/CategoryTab';
import IndexTab from '../pages/IndexTab';
import FormTab from '../pages/FormTab';

const icons = [ellipse, square, triangle]

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const Layout: React.FC = () => {

  const contactUiProps: any = useContactCtx()

  let [firstCategory] = Object.keys(contactUiProps.contactsByCategory)

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="">
            <IndexTab />
          </Route>
          <Route path="/add-contact">
            <FormTab />
          </Route>
          <Route path="/contacts">
            <IonTabs>
              <IonRouterOutlet>
                { contactUiProps.contactsByCategory && Object.keys(contactUiProps.contactsByCategory).map((category) => (
                  <Route key={category} exact path={`/contacts/${category}`}>
                    <CategoryTab title={capitalize(category)} category={category} />
                  </Route>
                )) }
                <Route exact path="/contacts">
                  <Redirect to={`/contacts/${firstCategory}`} />
                </Route>
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                { contactUiProps.contactsByCategory && Object.keys(contactUiProps.contactsByCategory).map((category) => (
                  <IonTabButton key={category} tab={category} href={`/contacts/${category}`}>
                    <IonIcon icon={icons[Math.floor(Math.random()*icons.length)]} />
                    <IonLabel>{ capitalize(category) }</IonLabel>
                  </IonTabButton>))}
              </IonTabBar>
            </IonTabs>
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default Layout
