import React, { useState } from "react";
import DragnDrop from "../components/DragnDrop";
import axios from "axios";

function Publish(props) {
  // Déclarer les states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState([]);
  const [publish, setPublish] = useState(false);

  //   FONCTION PUBLIER
  const handlePublish = async (event) => {
    event.preventDefault();

    // Gestion du formulaire avec infos + images
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    for (let i = 0; i < files.length; i++) {
      console.log(files.length);
      formData.append("pictures", files[i]);
    }
    console.log("formdata = ", formData);
    try {
      const response = await axios.post(
        "https:///leboncoin-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + props.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("La réponse de l'API est : ", response.data);
      setPublish(!publish);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
    // }
  };

  return (
    <div className=" login container">
      {publish === false ? (
        <form className="publish" onSubmit={handlePublish}>
          <h2> Déposer une annonce </h2>
          <hr />
          <p> Titre de l'annonce *</p>
          <input
            placeholder="ex : Lapins nains à vendre"
            type="text"
            name="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <p> Texte de l'annonce *</p>
          <input
            placeholder="Vend un lapin nain blanc femelle 6 mois"
            type="text"
            name="text"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <br />
          <p>Prix * </p>
          <div className="publish price">
            <input
              placeholder="0"
              type="number"
              name="price"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
            €
          </div>

          <br />
          <p> Photo *</p>

          <DragnDrop files={files} setFiles={setFiles} />

          {/* <input
            type="file"
            onChange={event => {
              console.log(event.target.files);

              setFiles(event.target.files);
            }}
            multiple
          /> */}

          {/* Bouton pour publier  */}
          <input
            className="publish-btn"
            type="submit"
            value="Publier votre annonce"
          />
        </form>
      ) : (
        <div className="publish publish-done">Votre offre a été publiée !</div>
      )}
    </div>
  );
}

export default Publish;
