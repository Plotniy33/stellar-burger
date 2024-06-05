import constructorSlice, {
  addIngredient,
  clearIngredients,
  deleteIngredient,
  ingredientMoveDown,
  ingredientMoveUp,
  initialState
} from './constructorSlice';

describe('тестирование работы редьюсера конструктора бургера "constructorSlice"', () => {
  const ingredientBun = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
    id: 'constructorItems'
  };

  const ingredientMain = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
    id: 'ingredientMain'
  };

  const ingredientSauce = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0,
    id: 'ingredientSauce'
  };

  describe('тестирование экшена добавления ингридиента "addIngredient"', () => {
    it('тестирование добавления булки', () => {
      const burgerState = constructorSlice(
        initialState,
        addIngredient(ingredientBun)
      );
      expect(burgerState.constructorItems.bun?._id).toEqual(ingredientBun._id);
    });

    it('тестирование добавления между булок', () => {
      const burgerState = constructorSlice(
        initialState,
        addIngredient(ingredientMain)
      );
      expect(burgerState.constructorItems.ingredients[0]._id).toEqual(
        ingredientMain._id
      );
    });
  });

  describe('тестирование экшенов перемещения "ingredientMoveUp/ingredientMoveDown"', () => {
    const ingredients = [ingredientBun, ingredientMain, ingredientSauce];
    const burgerState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients
      }
    };

    it('тестирование перемещения ингредиента вверх', () => {
      const upState = constructorSlice(burgerState, ingredientMoveUp(2));
      const expected = upState.constructorItems.ingredients;
      expect(expected).toEqual([
        ingredients[0],
        ingredients[2],
        ingredients[1]
      ]);
    });

    it('тестирование перемещения ингредиента вниз', () => {
      const downState = constructorSlice(burgerState, ingredientMoveDown(1));
      const expected = downState.constructorItems.ingredients;
      expect(expected).toEqual([
        ingredients[0],
        ingredients[2],
        ingredients[1]
      ]);
    });
  });

  describe('тестирование экшенов "deleteIngredient/clearIngredients"', () => {
    const ingredients = [ingredientBun, ingredientMain, ingredientSauce];
    const burgerState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients
      }
    };

    it('тестирование удаления ингредиента из конструктора', () => {
      const afterDeleteState = constructorSlice(
        burgerState,
        deleteIngredient('ingredientMain')
      );
      const expected = afterDeleteState.constructorItems.ingredients;
      expect(expected).toHaveLength(2);
    });

    it('тестирование удаления всех ингредиентов из конструктора', () => {
      const afterClearState = constructorSlice(burgerState, clearIngredients());
      const expected = afterClearState.constructorItems.ingredients;
      expect(expected).toHaveLength(0);
    });
  });
});
