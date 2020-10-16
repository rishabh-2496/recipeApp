import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "tailwind.macro";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./../../components/common/input";
import { toast } from "react-toastify";
import InputArea from "./../../components/common/InputArea";
import { connect } from "react-redux";
import { addRecipeStart } from "./actions";
import {
  ObjectToFormData,
  addCollectionToFormData,
} from "./../../utils/genericUtils";
import ReactLoading from "react-loading";
import AddIngredients from "./../../components/addIngredients";

const Container = styled.div`
  ${tw`w-full h-screen  mt-0 flex items-center bg-gray-100 flex justify-center overflow-y-scroll  `}
`;

const Card = styled.div`
  ${tw`mx-auto w-4/5 md:w-1/2 lg:w-1/2 bg-white flex justify-center px-4 pt-8 pb-10 rounded-md shadow-md `}
`;

const FieldContainer = styled.div`
  ${tw`my-6`}
`;

const Div = styled.div`
  ${tw`w-2/3`}
`;

const CenterDiv = styled.div`
  ${tw`w-full flex  justify-center `}
`;

const P = styled.p`
  ${tw`text-purple-500 mt-6 font-semibold`}
`;

const Title = styled.p`
  ${tw`font-bold text-center text-2xl`}
`;

const SubTitle = styled.p`
  ${tw`text-gray-400 text-center`}
`;

const ImagesContainer = styled.div`
  ${tw`flex flex-wrap mt-2`}
`;
const Images = styled.img`
  ${tw`w-12 h-12 mx-1 my-1`}
`;

const FileInput = styled.input`
  ${tw`mt-3`}
`;

const IngredientContainer = styled.div`
  ${tw`flex flex-wrap mt-2 `}
`;

const Ingredient = styled.div`
  ${tw`bg-yellow-500 mr-1 mt-1 px-2  rounded-md text-white flex`}
`;

const IngredientText = styled.p`
  ${tw`mr-1`}
`;

const Cancel = styled.button`
  ${tw`outline-none`}
`;

const Icon = styled.img`
  ${tw`outline-none mt-1`}
`;

const AddRecipe = ({
  addRecipeStart,
  recipeData,
  dataFetching,
  failureMessage,
}) => {
  const [images, setImages] = useState([]);
  const [imagesURL, setImagesURL] = useState([]);
  const [ingredients, addIngredient] = useState([]);

  if (recipeData && recipeData.message) {
    toast.success(recipeData.message);
    window.location = "/";
  }
  if (failureMessage) toast.error(failureMessage);

  const setField = (images) => {
    let imagesArray = Array.from(images);
    if (imagesArray.length > 5) {
      toast.error("max 5 images can be selected");
      imagesArray.splice(5);
      toast.success("first 5 images selected");
    }
    if (imagesArray) {
      setImages(imagesArray);
      const imagesURL = imagesArray.map((image) => URL.createObjectURL(image));
      setImagesURL(imagesURL);
    }
  };

  const handleAddIngredient = (ingredient) => {
    if (ingredients.includes(ingredient))
      return toast.error("ingredient already added");
    if (ingredients.length < 20) addIngredient([...ingredients, ingredient]);
    else toast.error("max ingredients 20");
  };

  const handleDeleteIngredient = (value) => {
    let filterIngredients = ingredients.filter(
      (ingredient) => ingredient !== value
    );
    addIngredient([...filterIngredients]);
  };

  useEffect(() => {
    return () => URL.revokeObjectURL(images);
  }, [images]);

  return (
    <Container>
      {dataFetching && (
        <ReactLoading
          type={"spokes"}
          color={"#6c5ce7"}
          height={50}
          width={50}
          className={"elevate"}
        />
      )}
      <Card>
        <Div>
          <Title>Post Recipe</Title>
          <SubTitle>Share Your Amazing Recipe</SubTitle>
          <AddIngredients handleAddIngredient={handleAddIngredient} />
          <IngredientContainer>
            {ingredients.map((item) => (
              <Ingredient>
                <IngredientText>{item}</IngredientText>
                <Cancel onClick={() => handleDeleteIngredient(item)}>
                  <Icon
                    src="/cancel.png"
                    width={13}
                    height={13}
                    alt="cancel"
                  ></Icon>
                </Cancel>
              </Ingredient>
            ))}
          </IngredientContainer>
          <Formik
            initialValues={{ name: "", description: "", directions: "" }}
            validationSchema={Yup.object({
              name: Yup.string()
                .required("Recipe Name Required")
                .min(3, "Must be atleast 3 characters")
                .max(300, "Too long Name"),
              description: Yup.string()
                .required("Description Required")
                .min(10, "Must be atleast 10 characters")
                .max(1000, "Too long description"),
              directions: Yup.string()
                .min(20, "Must be atleast 20 characters")
                .max(7000, "Too long directions")
                .required("Directions Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              if (images.length <= 0)
                return toast.error("please upload min 3 images");
              if (ingredients.length < 2)
                return toast.error("please add min 2 ingredients");
              let formData = ObjectToFormData(values);
              addCollectionToFormData("images", images, formData);
              addCollectionToFormData("ingredients", ingredients, formData);
              addRecipeStart(formData);
              setSubmitting(false);
            }}
          >
            <Form>
              <FieldContainer>
                <Input
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Recipe Name"
                ></Input>
              </FieldContainer>
              <FieldContainer>
                <Input
                  label="description"
                  name="description"
                  type="text"
                  placeholder="Short Description"
                ></Input>
              </FieldContainer>

              <FieldContainer>
                <InputArea
                  label="Directions"
                  name="directions"
                  placeholder="Directions"
                ></InputArea>
              </FieldContainer>

              <FieldContainer>
                <FileInput
                  type="file"
                  name="file"
                  id="file"
                  className="inputfile"
                  multiple
                  onChange={(event) => setField(event.currentTarget.files)}
                ></FileInput>
                <ImagesContainer>
                  {imagesURL &&
                    imagesURL.map((image) => <Images src={image}></Images>)}
                </ImagesContainer>
              </FieldContainer>

              <CenterDiv>
                <button
                  className="pushy__btn pushy__btn--md pushy__btn--purple"
                  type="submit"
                >
                  Post Recipe
                </button>
              </CenterDiv>
            </Form>
          </Formik>
        </Div>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  recipeData: state.addRecipe.recipeData,
  dataFetching: state.addRecipe.dataFetching,
  failureMessage: state.addRecipe.failureMessage,
});

const mapDispatchToProps = { addRecipeStart };

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
