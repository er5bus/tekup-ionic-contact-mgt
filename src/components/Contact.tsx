import './Contact.css';
import moment from 'moment'
import {
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { call, person } from 'ionicons/icons';


interface ContainerProps {
  firstName: string;
  lastName: string;
  firstPhoneNumber: string;
  secondPhoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

const Contact: React.FC<ContainerProps> = ({
  firstName,
  lastName,
  firstPhoneNumber,
  secondPhoneNumber,
  createdAt,
  updatedAt
}) => {
  return (
    <IonCard class="coworker-card">
      <IonCardContent>
        <IonList lines="none">
          <IonItem>
            <IonIcon icon={person} slot="start"></IonIcon>
            <IonLabel>
              <h1>{firstName} {lastName}</h1>
              <p> Created at {moment(createdAt||(new Date())).format('MM/DD/YYYY')} </p>
              <p> Updated at {moment(updatedAt||(new Date())).format('MM/DD/YYYY')} </p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={call} slot="start"></IonIcon>
            <IonLabel>
              <h2>{ firstPhoneNumber }</h2>
              <p>First Mobile phone</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={call} slot="start"></IonIcon>
            <IonLabel>
              <h2>{ secondPhoneNumber }</h2>
              <p>Second Mobile phone</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default Contact;
