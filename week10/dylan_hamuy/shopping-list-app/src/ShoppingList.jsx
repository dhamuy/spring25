function ShoppingList({ shoppingList, removeItem, budget }) {
  const totalSpent = shoppingList.reduce((acc, item) => acc + Number(item.cost), 0);
  const remainingBudget = budget - totalSpent;

  return (
    <>
      <h2>Remaining Budget: ${remainingBudget.toFixed(2)}</h2>
      {shoppingList.map((item, index) => (
        <div key={index}>
          <span>
            {item.name} - ${item.cost.toFixed(2)}
            {item.deadline && ` | due ${item.deadline}`}
          </span>
          <button onClick={removeItem} value={item.name}>x</button>
        </div>
      ))}
    </>
  );
}

export default ShoppingList;
