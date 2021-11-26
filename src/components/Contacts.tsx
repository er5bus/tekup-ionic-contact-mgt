import { isArray, isEmpty } from 'lodash'

import {ContactType} from '../store';
import { IonText } from "@ionic/react"
import Contact from './Contact';
import './Contacts.css';

interface ContainerProps {
  contacts: Array<ContactType>;
}

const Contacts: React.FC<ContainerProps> = ({ contacts }) => {
  return (
    <div>
      { (isArray(contacts) && !isEmpty(contacts)) && contacts.map((contact, i) => <Contact key={i} {...contact} />) }
      { (isEmpty(contacts)) && <><br /><IonText color="info" className="ion-padding ion-padding-top">No contact found</IonText></> }
    </div>
  );
};

export default Contacts;
