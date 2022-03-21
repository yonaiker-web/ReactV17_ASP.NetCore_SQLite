import React, { useState } from "react";
import Constants from "../utilities/Constants";

export default function PostCreateForm(props) {
  console.log("props", props);
  const initialFormData = Object.freeze({
    title: "",
    content: "",
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (formData.title == "" || formData.content == "") {
      e.preventDefault();
      alert("Debe llenar todos dos campos");
    } else {
      e.preventDefault();

      const postToCreate = {
        postId: 0,
        title: formData.title,
        content: formData.content,
      };

      const url = Constants.API_URL_CREATE_POST;

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postToCreate),
      })
        .then((response) => response.json())
        .then((responseFromServer) => {
          console.log("responseFromServer", responseFromServer);
          //setPosts(responseFromServer);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });

      props.onPostCreated(postToCreate);
    }
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">Crear nuevo post</h1>

      <div className="mt-5">
        <label className="h3 form-label">Titulo del post</label>
        <input
          value={formData.title}
          name="title"
          type="text"
          className="form-control"
          onChange={handleChange}
          placeholder="Titulo del post"
        />
      </div>

      <div className="mt-4">
        <label className="h3 form-label">Contenido del post</label>
        <input
          value={formData.content}
          name="content"
          type="text"
          className="form-control"
          onChange={handleChange}
          placeholder="Contenido del post"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="btn btn-primary btn-lg w-100 mt-5"
      >
        Crear
      </button>

      <button
        onClick={() => props.onPostCreated(null)}
        className="btn btn-danger btn-lg w-100 mt-5"
      >
        Cancelar
      </button>
    </form>
  );
}
