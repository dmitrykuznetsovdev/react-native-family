import {flowRight, indexOf} from 'lodash';

import {
    GET_CHECKLIST_RANDOM,
    GET_LIST_OF_CHECKLISTS,
    GET_CHECKLIST_OF_SLUG,
    GET_SHARED_CHECKLIST,
    GET_CHECKLIST_PREVIEW,
    CHECKLIST_PRODUCT_ADD,
    CHECKLIST_PRODUCT_REMOVE,
    CHECKLIST_CHANGE_GENDER,
    CHECKLIST_LOADER,
    CHECKLIST_LOADER_PRODUCTS,
    CHECKLIST_DELETE,
    CHECKLIST_TOGGLE_ACTIVE,
    CHECKLIST_SUBCATEGORY_CHECKED,
    CHECKLIST_SUBCATEGORY_CHOOSE,
    CHECKLIST_CATEGORY_CHOOSE,
    CHECKLIST_MODAL
} from '_actions/actions';


/**
 * Помечаем продукт как добавленный или наоборот помечаем как удаленный
 *
 * Зменяем чек-лист в основной коллекции
 *
 * @param collection
 * @param id
 * @param opt_param
 */
export function checkProductAdded(collection, activeChecklist, id, opt_param = true) {
  const coll          = [...collection];
  const index         = indexOf(coll, activeChecklist);
  const list = {...activeChecklist};

  list.categories.forEach((category) => {
    if (category.active) {
      category.items.forEach((item)=> {
        if (item.active) {
          item.products.forEach((product)=> {
            if (product.id == id) {
              product.added = opt_param;
            }
          })
        }
      })
    }
  });

  coll.splice(index, 1, list);

  saveToLocalStorage({
    collectionChecklist: [...coll],
    activeChecklist: list,
    genderActive: list.gender
  });

  return {
    collectionChecklist: coll,
    activeChecklist: list
  }
}

/**
 * Получить активную категорию
 * @param checkList
 * @returns {T}
 */
export function findActiveCategory(checkList) {
  return checkList.categories.find(item => item.active);
}

/**
 * Получить активную подкатегорию
 * @param category
 * @returns {T}
 */
export function findActiveSubCategory(category) {
  return category.items.find(item => item.active);
}

/**
 *
 * @param collection
 * @returns {T}
 */
export function findActiveChecklist(collection) {
  return collection.find(item => item.active);
}

/**
 *
 * @param collection
 * @param id
 * @returns {T}
 */
export function findChecklistById(collection, id) {
  return collection.find(item => item.id == id);
}



/**
 *
 * Находим чек-лист по id и добавляем в активную подкатегорию
 * товары которые загрузили
 *
 * В параметрах принимаем id чек-листа в который нужно добавить
 * нужно для того что активный в данный момент лист может измениться ->
 * если создать новый или просто переключится между листами
 *
 * TODO : Добавлем товары в массив products непосредственно в сам чеклист
 * TODO : последние запрошенные товары становятся активными
 *
 * @param collection
 * @param products
 * @param params
 * @returns {*}
 */
export function addProductsForSubCategory(collection, products, params) {
  let coll        = [...collection];
  const checklist = findChecklistById(coll, params.idChecklist);

  if (!checklist) return coll

  const index        = indexOf(coll, checklist);
  let activeCategory = findActiveCategory(checklist);
  let activeSubCat   = findActiveSubCategory(activeCategory);

  checklist.products = [...products]; // TODO товары в сам чеклист
  activeSubCat.products = [...products]; // TODO товары в подкатегорию к которой они принедлежат

  activeCategory.items = [
    ...activeCategory.items,
    ...activeSubCat
  ];

  checklist.categories = [
    ...checklist.categories,
    ...activeCategory
  ];

  coll.splice(index, 1, checklist);
  return coll;
}


/**
 *
 * Открыть одну и категорий, сделать ее активной
 * Если не пришел параметр position, то берем первую в списке
 *
 * @param activeCheckList
 * @param position
 * @returns {{}}
 */
export function setActiveCategory(activeCheckList, position) {
  let copyChecklist = {...activeCheckList};
  let cat           = [...copyChecklist.categories];

  cat = cat.filter((item, i) => {
    if (position && item.position == position)
      item.active = true;
    else if (!position && i == 0)
      item.active = true;
    else
      item.active = false;
    return item;
  })

  copyChecklist.categories = cat;
  return copyChecklist;
}

/**
 * Выбор активной подкатегории
 * Если не пришел параметр position, то берем первую в списке
 *
 * @param activeCheckList
 * @param position
 * @returns {{}}
 */
export function setActiveSubCategory(activeCheckList, position) {
  let copyChecklist = {...activeCheckList};

  copyChecklist.categories.forEach((category) => {
    if (category.active) {
      category.items.forEach((item, i) => {
        if (position && item.position == position)
          item.active = true;
        else if (!position && i == 0)
          item.active = true;
        else
          item.active = false;
      })
    }
  });
  return copyChecklist;
}

export function setActiveSubCategoryFirst(checklist) {
  let copyChecklist = {...checklist};
  copyChecklist.categories.find((category) => {
    if (category.active) {
      category.items[0].active = true;
      return true;
    }
  });
  return copyChecklist;
}

/**
 * Отмечаем чекбокс на подкатегории
 *
 * @param activeCheckList
 * @param position
 * @param isChecked
 * @returns {{}}
 */
export function checkedSubCategory(activeCheckList, position, isChecked = true) {
  let copyChecklist = {...activeCheckList};
  let category      = findActiveCategory(copyChecklist);

  category.items = category.items.filter(item => {
    if (item.position == position && isChecked) {
      item.checked = true;
    } else if (item.position == position && !isChecked) {
      item.checked = false;
    }
    return item;
  })

  copyChecklist.categories = [
    ...copyChecklist.categories,
    ...category
  ]

  return copyChecklist;
}


/**
 * Снимаем статус активного чек-листа
 * и ставим на новый
 *
 * @param collection
 * @param id
 * @returns {Array.<T>}
 */
export function setActiveCheckList(collection, id) {
  let newCollection = [...collection];
  return newCollection.filter((item)=> {
    item.active = (item.id == id);
    return item;
  })
}

/**
 * Находим активный чек-лист
 * может быть только один активный чек-лист
 *
 * если мы удаляем активный чек-лист, то ставим активным последний
 * @param collection
 * @returns {Array}
 */
export function setLastActive(collection) {
  let coll = [...collection];
  if (coll.length) {
    const active         = findActiveChecklist(coll);
    const sizeCollection = coll.length;

    if (!active) {
      let last    = coll[sizeCollection > 1 ? sizeCollection - 1 : 0];
      last.active = true;
    }

    return coll;
  }
}


/**
 * свойство products во всех подкатегориях
 * так же добавляем свойство products в объект чек-листа если его там нет
 *
 * @param checklist
 * @returns {{}}
 */
export function setProductsProperty(checklist) {
  let copyChecklist = {...checklist};

  if (!copyChecklist.products) {
    copyChecklist.products = [];
  }

  copyChecklist.categories.forEach(category => {
    category.items.forEach(item => {
      item.products = !item.products ? [] : item.products;
    })
  })

  return {...copyChecklist};
}

/**
 * Добавялем новый чек-лист и делаем его активным
 *
 * парметр checklist может быть null
 *
 * @param collectionChecklist
 * @param checklist
 * @returns {*}
 */
export function addChecklist(collectionChecklist, checklist) {

  if (!checklist) return collectionChecklist;

  const id      = Number.parseInt(checklist.id);
  let coll      = [...collectionChecklist];
  let findAdded = findChecklistById(coll, id);

  if (findAdded) {
    console.warn('duplication checklist');
    return coll;
  }

  coll.push(checklist);
  coll = setActiveCheckList(coll, id);
  return coll;
}

/**
 * _.flowRight == compose
 *
 * Возвращаем чеклист с добавленными свойствами
 *
 * @param checklist
 * @returns {Object}
 */
function setDefaultPropertyForNewChecklist(checklist) {
  const active = flowRight(
      setProductsProperty,
      setActiveSubCategory,
      setActiveCategory
  )

  return active(checklist)
}


/**
 * сохраняем все чеклисты в localStorage
 * @param data = {
 *   collectionChecklist:
 *   activeChecklist:
 *   genderActive:
 * }
 */
function saveToLocalStorage(data) {

}

/**
 * удаляем чек-лист по id
 * проверяем есть ли активный чек-лист, если нет, то ставим последний в списке
 * @param collection
 * @param id
 * @returns {Array}
 */
export function deleteChecklist(collection, id) {
  let coll = [...collection];
  let idL  = Number.parseInt(id);
  if (findChecklistById(collection, idL)) {
    coll = coll.filter(item => item.id != idL);
    if (coll.length)
      coll = setLastActive(coll);
  }
  return coll;
}


/**
 * подставляем в url - slug чек-листа
 * парамерт top - говорит что скроллить наверх не нужно
 *
 * @param slug
 */
function replaceUrlSlug(slug) {

}


/**
 *
 * TODO : получилось что то монструозное
 *
 * Возвращаем просто нужный объект со свойствами state
 * Устанавливаем title активного чек-листа
 * Активный чеклист
 * Активную подкатегорию
 * Активный пол
 *
 * @param collection
 * @returns
 * {
 *  {
 *    collectionChecklist: Array,
 *    activeChecklistTitle: string
 *  }
 * }
 */
function returnNewCollectionAndActiveTitle(collection, isShared = false) {
  const coll        = [...collection];
  const active      = {...findActiveChecklist(coll)};
  const activeCheck = active ? active : {};
  const isActive    = Object.keys(activeCheck).length;
  const slug        = !isActive ? '' : activeCheck.slug;


  let data = {
    collectionChecklist: coll,
    activeChecklist: activeCheck,
    genderActive: isActive ? activeCheck.gender : 0
  }

  if(!isShared) {
    replaceUrlSlug(slug);
    saveToLocalStorage(data);
  }

  return data;
}


/**
 *
 * @param activeChecklist
 * @returns {*}
 */
function chooseSubCategory(activeChecklist) {
  const category = flowRight(findActiveSubCategory, findActiveCategory);
  return category(activeChecklist);
}

/**
 * фильтруем список шаблонов чеклистов - gender
 * @param data
 * @param gender_type
 * @returns {*}
 */
export function checklistGenderFilter(data, gender_type) {
  return data.filter(item => item.gender == gender_type);
}


const checklist = (state = {
  collectionChecklist: [],
  activeChecklist: {
    products: []
  },
  genderActive: 0,

  gender: {
    boy: [],
    girl: []
  },
  random: {
    items: []
  },
  loader: false,
  loaderProducts: false,
  modal: {
    id: null,
    show: false
  }
}, action) => {

  switch (action.type) {

    // на входной странице вещей
    case GET_CHECKLIST_RANDOM:
      return {
        ...state,
        random: {
          ...state.random,
          items: [...action.data.items.shuffle().slice(0, 4)]
        }
      }

    // все остальное на отдельной странице чек-листов
    case GET_LIST_OF_CHECKLISTS:
      return {
        ...state,
        gender: {
          boy: checklistGenderFilter(action.items, 0),
          girl: checklistGenderFilter(action.items, 1)
        }
      }
    case GET_CHECKLIST_OF_SLUG:
      return {
        ...state,
        ...returnNewCollectionAndActiveTitle(
            addChecklist(
                state.collectionChecklist,
                setDefaultPropertyForNewChecklist(action.checklist.item)
            )
        )
      }
    case GET_SHARED_CHECKLIST:
      return {
        ...state,
        ...returnNewCollectionAndActiveTitle(
            addChecklist(
                state.collectionChecklist,
                setDefaultPropertyForNewChecklist(action.checklist)
            ),
            true
        )
      }
    case CHECKLIST_DELETE:
      return {
        ...state,
        ...returnNewCollectionAndActiveTitle(
            deleteChecklist(state.collectionChecklist, action.id)
        )
      }
    case CHECKLIST_TOGGLE_ACTIVE:
      return {
        ...state,
        ...returnNewCollectionAndActiveTitle(
            setActiveCheckList(state.collectionChecklist, action.id)
        )
      }
    case CHECKLIST_PRODUCT_ADD:
      return {
        ...state,
        ...checkProductAdded(state.collectionChecklist, state.activeChecklist , action.id)
      }
    case CHECKLIST_PRODUCT_REMOVE:
      return {
        ...state,
        ...checkProductAdded(state.collectionChecklist, state.activeChecklist, action.id, false)
      }
    case GET_CHECKLIST_PREVIEW:
      return {
        ...state,
        collectionChecklist: addProductsForSubCategory(
            state.collectionChecklist,
            action.items,
            action.params
        ),
        activeChecklist: {
          ...state.activeChecklist,
          products: action.items
        }

      }
    case CHECKLIST_SUBCATEGORY_CHECKED:
      return {
        ...state,
        activeChecklist: {
          ...state.activeChecklist,
          ...checkedSubCategory(
              state.activeChecklist,
              action.position,
              action.checked
          )
        }
      }

  /**
   * когда открываем категорию
   * делаем ее активной, остальные сбрасываем
   * так же если нет активных подкатегорий, ставим первую active = true
   */
    case CHECKLIST_CATEGORY_CHOOSE:
      let activeChecklist     = setActiveCategory(state.activeChecklist, action.position);
      const activeSubCategory = chooseSubCategory(activeChecklist);
      if (!activeSubCategory) {
        activeChecklist = setActiveSubCategoryFirst(activeChecklist);
      }
      return {
        ...state,
        activeChecklist: {
          ...state.activeChecklist,
          ...activeChecklist,
          products: chooseSubCategory(activeChecklist).products
        }
      }
    case CHECKLIST_SUBCATEGORY_CHOOSE:
      const checklist = setActiveSubCategory(state.activeChecklist, action.position);
      return {
        ...state,
        activeChecklist: {
          ...state.activeChecklist,
          ...checklist,
          products: chooseSubCategory(checklist).products
        }
      }
    case CHECKLIST_MODAL:
      return {
        ...state,
        modal: action.modal
      }
    case CHECKLIST_CHANGE_GENDER:
      return {
        ...state,
        genderActive: action.gender
      }
    case CHECKLIST_LOADER:
      return {
        ...state,
        loader: action.loader
      }
    case CHECKLIST_LOADER_PRODUCTS:
      return {
        ...state,
        loaderProducts: action.loader
      }
    default:
      return {...state}

  }
}

export default checklist;
