import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteFood, getFoodList } from "../../services/foodService";
import "react-toastify/dist/ReactToastify.css";
import "./ListFood.css";

const ListFood = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const data = await getFoodList();
      setList(data);
    } catch (error) {
      toast.error("Fehler beim Lesen der Gerichte.");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const success = await deleteFood(foodId);
      if (success) {
        toast.success("Gericht erfolgreich gelöscht.");
        fetchList();
      } else {
        toast.error("Fehler beim Entfernen des Gerichts.");
      }
    } catch (error) {
      toast.error("Fehler beim Entfernen des Gerichts.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="py-5 row justify-content-center">
      <div className="col-11 card">

        <table className="table">
          <thead>
            <tr>
              <th>Bild</th>
              <th>Name</th>
              <th>Kategorie</th>
              <th>Preis</th>
              <th>Aktion</th>
            </tr>
          </thead>

          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.imageUrl} alt="" width={48} height={48} />
                </td>

                <td>{item.name}</td>

                <td>{item.category}</td>

                <td>{item.price.toFixed(2)} €</td>

                <td className="text-danger">
                  <i
                    className="bi bi-x-circle-fill"
                    onClick={() => removeFood(item.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
};

export default ListFood;
