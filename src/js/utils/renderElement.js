const renderElement = (id, value, completed = false) => {
	const checked = completed === false ? "" : "checked";
	return `<div class="taskElement" id="${id}">
  <div class="checkbox">
    <input class="checkbox" ${checked} id="checkbox-${id}" type="checkbox" name="checkbox">
    <label for="checkbox-${id}">${value}</label>
  </div>
  <div class="taskElement-close">
    <i class="icon">
      <svg>
        <use xlink:href="./img/sprite.svg#close"></use>
      </svg>
    </i>
  </div>
</div>`;
};

export default renderElement;
