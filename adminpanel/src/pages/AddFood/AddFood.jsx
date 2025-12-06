import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { addFood } from "../../services/foodService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddFood = () => {
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      alert("Bitte ein Bild hochladen");
      return;
    }

    try {
      await addFood(data, image);

      toast.success("Gericht erfolgreich hinzugefügt!");

      setData({
        name: "",
        description: "",
        price: "",
        category: "",
      });

      setImage(null);
    } catch (error) {
      toast.error("Fehler beim Hinzufügen des Gerichts.");
    }
  };

  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-4">
          <div className="card-body">

            <h2 className="mb-4">Gericht hinzufügen</h2>

            <form onSubmit={onSubmitHandler}>

              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img
                    src={image ? URL.createObjectURL(image) : assets.upload}
                    alt=""
                    width={98}
                  />
                </label>

                <input
                  type="file"
                  hidden
                  id="image"
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Titel des Gerichts"
                  required
                  value={data.name}
                  onChange={onChangeHandler}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Beschreibung</label>
                <textarea
                  name="description"
                  className="form-control"
                  placeholder="Details zum Gericht"
                  required
                  rows={5}
                  value={data.description}
                  onChange={onChangeHandler}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Kategorie</label>
                <select
                  className="form-control"
                  name="category"
                  required
                  value={data.category}
                  onChange={onChangeHandler}
                >
                  <option value="">– bitte wählen –</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Burger">Burger</option>
                  <option value="Arabisches">Arabisches</option>
                  <option value="Salat">Salat</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Getränke">Getränke</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Preis (€)</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  required
                  value={data.price}
                  onChange={onChangeHandler}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  !data.name ||
                  !data.description ||
                  !data.price ||
                  !data.category ||
                  !image
                }
              >
                Speichern
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
