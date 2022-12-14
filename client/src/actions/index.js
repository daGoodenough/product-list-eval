export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const CHANGE_PRICE_SORT = 'CHANGE_PRICE_SORT'

export function changeCategoryFilter(category) {
  return {
    type: CHANGE_CATEGORY,
    payload: category,
  }
}

export function changePriceSortFilter(sortMethod) {
  return {
    type: CHANGE_PRICE_SORT,
    payload: sortMethod,
  }
}