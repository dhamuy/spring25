import { useState } from 'react';
import ShoppingList from './ShoppingList';

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [budget] = useState(100);

  const addItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    formDataObj.purchased = false;
    formDataObj.cost = parseFloat(formDataObj.cost || 0);
    formDataObj.deadline = formDataObj.deadline || '';

    setShoppingList([...shoppingList, formDataObj]);
    event.target.reset();
  };

  const removeItem = (event) => {
    const name = event.target.value;
    setShoppingList(shoppingList.filter(item => item.name !== name));
  };

  return (
    <>
      <h1>Shopping List</h1>

      <form onSubmit={addItem}>
        <input name="name" placeholder="Item name" required />
        <input name="cost" type="number" placeholder="Cost" />
        <input name="deadline" type="date" />
        <button type="submit">Add</button>
      </form>

      <ShoppingList
        shoppingList={shoppingList}
        removeItem={removeItem}
        budget={budget}
      />
    </>
  );
}

export default App;
