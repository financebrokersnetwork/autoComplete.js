import createList from "../components/List";
import createItem from "../components/Item";
import onSelection from "./selectionController";

/**
 * Close all open lists
 *
 * @param element
 * @param inputField
 *
 * @return void
 */
const closeAllLists = (element, inputField) => {
  // Get all autoCompleteJS lists
  const list = document.getElementsByClassName("autoComplete_list");
  // Iterate over all autoCompleteJS open lists in the document
  for (let index = 0; index < list.length; index++) {
    // Close all lists
    // except the ones passed as an argument
    if (element !== list[index] && element !== inputField) list[index].parentNode.removeChild(list[index]);
  }
};

/**
 * List all matching results
 *
 * @param query
 * @param data
 * @param event
 * @param feedback
 *
 * @return void
 */
const generateList = (query, data, event, feedback) => {
  const inputValue = event.target.value;
  // Initiate creating list process
  const list = createList(event.target);
  // Iterate over the data
  for (let index = 0; index < data.length; index++) {
    const result = data[index].match;
    // create result item
    const resultItem = createItem(result);
    // Listen to clicks on this item
    resultItem.addEventListener("click", (event) => {
      // Prepare onSelection feedback data object
      const onSelectionData = { query, input: inputValue, results: data, selection: data[index].value };
      // Returns the selected value onSelection
      onSelection(onSelectionData, feedback);
    });
    // Add result to the list
    list.appendChild(resultItem);
  }
};

export { generateList, closeAllLists };
