import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButtons,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonTitle,
  useIonToast,
  IonText,
  IonButton
} from "@ionic/react";
import { arrowBackOutline } from 'ionicons/icons';
import { useContactCtx } from "../context/ContactContext";
import { useForm } from "react-hook-form";

let initialValues = {
  category: "",
  firstName: "",
  lastName: "",
  firstPhoneNumber: "",
  secondPhoneNumber: ""
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const showError = (errors: any, name: string) => errors[name] && <IonText color="danger" className="ion-padding-start ion-margin-top">
  <small>
    <span role="alert" className="ion-padding-top">
      { errors[name].message && errors[name].message}
      { errors[name].type === "required" && "This field is required"}
      { errors[name].type === "pattern" && "This field invalid content"}
    </span>
  </small>
</IonText>


const FormTab: React.FC = () => {

  const history: any = useHistory()
  const contactUiProps: any = useContactCtx()
  const [present, dismiss] = useIonToast();

  const { register, handleSubmit, formState} = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange"
  });

  useEffect(() => {
    if (contactUiProps.success.isCreated){
      present({
        buttons: [{ text: 'close', handler: contactUiProps.clearState }],
        message: 'New Contact has been created',
        onWillDismiss: contactUiProps.clearState,
      })
    }else if (contactUiProps.success.isUpdated){
      present({
        buttons: [{ text: 'close', handler: contactUiProps.clearState }],
        message: 'New Contact has been updated',
        onWillDismiss: contactUiProps.clearState,
      })
    }
  }, [contactUiProps.success])


  useEffect(() => {
    if (contactUiProps.error.duplicationError){
      present({
        buttons: [{ text: 'close', handler: contactUiProps.clearState }],
        message: 'This Contact is already existe',
        onWillDismiss: contactUiProps.clearState,
      })
    }
  }, [contactUiProps.error])

  const onSubmit = (data: any) => {
    contactUiProps.addContact(data)
  };

  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => history.goBack()}><IonIcon icon={arrowBackOutline} /></IonButton>
            </IonButtons>
            <IonTitle> Add contact </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <form onSubmit={handleSubmit(onSubmit)}>
          <IonItem>
            <IonLabel position="floating">First Name</IonLabel>
            <IonInput {...register("firstName", {
              required: true,
              minLength: { value: 4, message: "Must be 4 chars long" }
            })} />
          </IonItem>
          { showError(formState.errors, "firstName") }

          <IonItem>
            <IonLabel position="floating">Last Name</IonLabel>
            <IonInput { ...register("lastName", {
              required: true,
              minLength: { value: 4, message: "Must be 4 chars long" }
            }) }/>
          </IonItem>
          { showError(formState.errors, "lastName") }

          <IonItem>
            <IonLabel position="floating">First Phone Number</IonLabel>
            <IonInput { ...register("firstPhoneNumber", {
              required: true,
              pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/ }) }/>
          </IonItem>
          { showError(formState.errors, "firstPhoneNumber") }

          <IonItem>
            <IonLabel position="floating">Second Phone Number</IonLabel>
            <IonInput { ...register("secondPhoneNumber", {
              required: true,
              pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/ }) }/>
          </IonItem>
          { showError(formState.errors, "secondPhoneNumber") }

          <IonItem>
            <IonLabel>Category</IonLabel>
            <IonSelect { ...register("category", { required: true }) }>
              { contactUiProps.contactsByCategory && Object.keys(contactUiProps.contactsByCategory).map((category) => (
                <IonSelectOption key={category} value={category}>{capitalize(category)}</IonSelectOption>
              )) }
            </IonSelect>
          </IonItem>
          { showError(formState.errors, "category") }
          <IonButton expand="block" type="submit">
            save
          </IonButton>
        </form>
        </IonContent>
      </IonPage>
  );
};

export default FormTab
