function _createModal(options) {
  const DEFAULT_WIDTH = "600px";
  const modal = document.createElement("div");
  modal.classList.add("vmodal");
  modal.insertAdjacentHTML(
    "afterbegin",
    `
  <div class="modal-overlay" data-close="true">
  <div class="modal" style="width: ${options.width || DEFAULT_WIDTH}">
	  <div class="modal__content" >
		  <div class="modal__title-bc">
			  <h3 class="modal__title">${options.title || "modal"}</h3>

${
  options.closable
    ? `
<span  data-close="true">&times;</span>
`
    : ""
}
			  </div>
			  <div data-content>
${options.content || ""}</div>
	  </div>
  </div>
</div> 
`
  );
  document.body.appendChild(modal);
  return modal;
}

// ? object option{
// 	title :string
// 	closible : false || true
// 	content : string
// with : string ("400")
// destroy(): void    ubiraet modal okno udalayt
// ~~~~~~~~~~~~~~~~~~~~~~~~
// setContent(hyml :string): void | PUBLIC
// onClose(): void
// onOpen(): void
// beforeCluse(): false || after
// ~~~~~~~~~~~~~~~~~~~~~~~
// animate css
// }

$.modal = function (options) {
  const ANIMATION_SPEED = 300;
  const $modal = _createModal(options);
  let clousing = false;
  let destroyed = false;

  const modal = {
    open() {
      if (destroyed) {
        return console.log("module is destroyed");
      }
      !clousing && $modal.classList.add("open");
    },
    close() {
      clousing = true;
      $modal.classList.remove("open");
      $modal.classList.add("hide");
      setTimeout(() => {
        $modal.classList.remove("hide");
        clousing = false;
      }, ANIMATION_SPEED);
    },
  };
  const listener = (e) => {
    if (e.target.dataset.close) {
      modal.close();
    }
  };

  $modal.addEventListener("click", listener);

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener("click", listener);
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector("[data-content]").textContent = html;
    },
  });
};
