import { Metadata } from "next";
import DefaultLayout from "../ui/components/Layouts/DefaultLayout";
import Recipes from "../ui/components/Recipes";

export const metadata: Metadata = {
  title: "Momenfy | Recetas",
  description:
    "Pagina de recetas",
};

const RecipesPage = () => {
  return (
    <DefaultLayout>
        <Recipes />
    </DefaultLayout>
  );
};

export default RecipesPage;