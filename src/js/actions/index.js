export const saveTag = tags => ({
  type: "SAVE_TAG",
  payload: tags
});
export const deleteTag = tags => ({
  type: "DELETE_TAG",
  payload: tags
});

export const changeTab = currenttab => ({
  type: "CHANGE_TAB",
  payload: currenttab
});

export const changeProyect = currentproyect => ({
  type: "CHANGE_PROYECT",
  payload: currentproyect
});
export const addArticle = article => ({
  type: "ADD_ARTICLE",
  payload: article
});
export const updateArticle = article => ({
  type: "UPDATE_ARTICLE",
  payload: article
});
export const deleteArticle = article => ({
  type: "DELETE_ARTICLE",
  payload: article
});

export const addProyect = proyect => ({
  type: "ADD_PROYECT",
  payload: proyect
});
export const updateProyect = proyect => ({
  type: "UPDATE_PROYECT",
  payload: proyect
});
export const deleteProyect = proyect => ({
  type: "DELETE_PROYECT",
  payload: proyect
});


