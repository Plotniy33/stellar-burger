import Cypress from 'cypress';

const testUrl = 'http://localhost:4000';
const bun = `[data-cy ='643d69a5c3f7b9001cfa093c']`;
const main = `[data-cy ='643d69a5c3f7b9001cfa0941']`;
const sauce = `[data-cy ='643d69a5c3f7b9001cfa0942']`;

describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit(testUrl);
  });
});

describe('тестирование добавления ингредиента из списка в конструктор', function () {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  });
  it('добавление булки и начинки', () => {
    cy.get(bun).children('button').click();
    cy.get(main).children('button').click();
    cy.get(sauce).children('button').click();
  });
});

describe('тестирование работы модальных окон', function () {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  });
  it('открытие модального окна ингредиента', () => {
    cy.get(sauce).click();
    cy.url().should('include', '643d69a5c3f7b9001cfa0942');
  });
  it('закрытие модального окна ингредиента по клику на крестик', () => {
    cy.get(sauce).click();
    cy.get(`[data-cy ='modal-close']`).click();
  });
  it('закрытие модального окна ингредиента по клику на оверлей', () => {
    cy.get(sauce).click();
    cy.get(`[data-cy ='modal-overlay']`).click({ force: true });
  });
});

describe('тестирование процесса создания заказа', function () {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.setCookie('accessToken', 'fake-accessToken');
    localStorage.setItem('refreshToken', 'fake-refreshToken');
  });
  afterEach(() => {
    cy.clearAllCookies();
    localStorage.clear();
  });
  it('добавление ингредиентов в заказ, клик на кнопку оформления, проверка номера заказа', () => {
    cy.get(bun).children('button').click();
    cy.get(main).children('button').click();
    cy.get(sauce).children('button').click();
    cy.get(`[data-cy ='order-click']`).click();
    cy.get(`[data-cy ='order-details']`).should('contains.text','41529');
  });
});
