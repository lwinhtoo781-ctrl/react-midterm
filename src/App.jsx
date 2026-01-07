import { useMemo, useState } from "react";
import "./App.css";

import deleteIcon from "./assets/delete.svg";
import electrical from "./assets/electrical_services.svg";
import flatware from "./assets/flatware.svg";
import inkPen from "./assets/ink_pen.svg";

export default function App() {
  // Initial items (optional: keep if codebase already has sample items)
  const [items, setItems] = useState([
    { id: 1, name: "Color Pencil set 32", category: "Stationary", price: 11.99 },
    { id: 2, name: "Small Kitty Lamp", category: "Appliance", price: 44.88 },
    { id: 3, name: "Knife Set 4pcs", category: "Kitchenware", price: 23.11 },
  ]);

  // Auto increment ID
  const [nextId, setNextId] = useState(4);

  // Form state (no default category)
  const [name, setName] = useState("");
  const [category, setCategory] = useState(""); // ✅ no default
  const [price, setPrice] = useState(0);

  // Error message
  const [error, setError] = useState("");

  const categories = useMemo(
    () => ["Stationary", "Kitchenware", "Appliance"],
    []
  );

  const categoryIcon = (cat) => {
    if (cat === "Stationary") return inkPen;
    if (cat === "Kitchenware") return flatware;
    if (cat === "Appliance") return electrical;
    return null;
  };

  const validate = () => {
    const trimmedName = name.trim();

    if (!trimmedName) return "Item name must not be empty";

    const duplicate = items.some(
      (it) => it.name.trim().toLowerCase() === trimmedName.toLowerCase()
    );
    if (duplicate) return "Item must not be duplicated";

    if (!categories.includes(category)) return "Please select a category";

    const numPrice = Number(price);
    if (Number.isNaN(numPrice) || numPrice < 0) return "Price must not be less than 0";

    return "";
  };

  const onAddItem = () => {
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    const newItem = {
      id: nextId,
      name: name.trim(),
      category,
      price: Number(price),
    };

    setItems((prev) => [...prev, newItem]);
    setNextId((prev) => prev + 1);

    // reset inputs
    setName("");
    setCategory("");
    setPrice(0);
    setError("");
  };

  const onDelete = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return (
    <div className="app">
      <h2>Item Management</h2>

      <table className="table">
        <thead>
          <tr>
            <th style={{ width: 60 }}>ID</th>
            <th>Name</th>
            <th style={{ width: 140 }}>Category</th>
            <th style={{ width: 120 }}>Price</th>
            <th style={{ width: 90 }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>{it.id}</td>
              <td style={{ textAlign: "left" }}>{it.name}</td>

              {/* ✅ Category icon instead of text */}
              <td>
                <img
                  src={categoryIcon(it.category)}
                  alt={it.category}
                  title={it.category}
                  style={{ width: 22, height: 22 }}
                />
              </td>

              <td>{it.price}</td>

              {/* ✅ Delete icon */}
              <td>
                <button className="iconBtn" onClick={() => onDelete(it.id)} aria-label="delete">
                  <img src={deleteIcon} alt="delete" style={{ width: 18, height: 18 }} />
                </button>
              </td>
            </tr>
          ))}

          {/* ✅ Form row at bottom */}
          <tr>
            <td></td>
            <td style={{ textAlign: "left" }}>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
              />
            </td>

            <td>
              <select
                className="input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </td>

            <td>
              <input
                className="input"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </td>

            <td>
              <button className="addBtn" onClick={onAddItem}>
                Add Item
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ✅ Error message below table */}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
