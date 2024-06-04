import { Metadata } from "next";
import DefaultLayout from "../../ui/components/Layouts/DefaultLayout";
import Messages from "../../ui/components/Messages";

export const metadata: Metadata = {
  title: "Momenfy | Mensajes Personales",
  description:
    "Pagina de Mensajes Personales",
};

const MessagesPage = () => {
  return (
    <DefaultLayout>
        <Messages />
    </DefaultLayout>
  );
};

export default MessagesPage;