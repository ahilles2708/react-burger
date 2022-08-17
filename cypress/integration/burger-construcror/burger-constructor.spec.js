describe('Burger Constructor usability and functionality test', () => {
    before(function () {
        // Login
        Cypress.Cookies.debug(true);
        cy.visit('http://localhost:3000/login');
        cy.get('input').first().type('ahilles27@mail.ru');
        cy.get('input').last().type('Qwer1234');
        cy.get('form button').click();
    })

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('accessToken');
    })

    after(() => {
        cy.clearCookies();
    })

    it('Проверяем, что ингредиенты не добавлены в конструктор', function() {
        cy.get('[class^=burger-constructor_fillingInnerList]').as('fillingInnerList');
        cy.get('@fillingInnerList').contains('Выберите начинку').should('be.visible');
    })

    it('Проверяем, что ингредиенты добавляются в конструктор и перетаскиваются', function() {
        cy.get('[data-type="sauce"]').first().as('sauce');
        cy.get('[data-type="filling"]').last().as('filling');
        cy.get('[class^=burger-constructor_fillingInnerList]').first().as('dropTarget');

        // drag and drop filling
        cy.get('@filling').trigger("dragstart").trigger("dragleave");
        cy.get('@dropTarget').trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");

        cy.get('@sauce').trigger("dragstart").trigger("dragleave");
        cy.get('@dropTarget').trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");

        cy.get('[data-constructor-type="sauce"]').first().as('dragElement');
        cy.get('[data-constructor-type="filling"]').first().as('dropElement');

        cy.get('@dragElement').trigger("dragstart").trigger("dragleave");
        cy.get('@dropElement').trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");
    })

    it('Проверяем, что ингредиенты перетаскиваются в конструктор и считается общая сумма заказа', function() {
        cy.get('[data-type="bun"]').first().as('bun');
        cy.get('[data-type="sauce"]').first().as('sauce');
        cy.get('[data-type="filling"]').last().as('main');
        cy.get('[class^=burger-constructor_fillingInnerList]').first().as('dropTarget');

        // drag and drop buns
        cy.get('@bun').trigger("dragstart").trigger("dragleave");
        cy.get('@dropTarget').trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");

        // drag and drop sauce
        cy.get('@sauce').trigger("dragstart").trigger("dragleave");
        cy.get('@dropTarget').trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");

        let total = 0;
        let expectedTotal = 0;

        cy.get('[class^=constructor-element__price]').each(($price) => {
            total = total + parseInt($price.text());
        }).then(() => {
            cy.get('[class^=burger-constructor_counting] span').invoke('text').then(text => expectedTotal =+ text).then(() => {
                expect(total).equal(expectedTotal);
            });
        });

        cy.get('@bun').find('[class^=counter_counter__num]').as('bunCount');
        cy.get('@bunCount').should('contain', 2);

        cy.get('@sauce').find('[class^=counter_counter__num]').as('sauceCount');
        cy.get('@sauceCount').should('contain', 2);

        cy.get('@main').find('[class^=counter_counter__num]').as('mainCount');
        cy.get('@mainCount').should('contain', 1);
    })

    it('Проверяем, что при удалении ингредиента из конструктора корректно пересчитывается итоговая стоимость бургера, а количество ингредиентов на счетчике уменьшается', function() {
        cy.get('[data-type="sauce"]').first().as('sauce');
        cy.get('[data-constructor-type="sauce"]').first().as('constructor-sauce');
        cy.get('@constructor-sauce').find('[class^=constructor-element__action]').click();

        var total = 0;
        var expectedTotal = 0;

        cy.get('[class^=constructor-element__price]').each(($price) => {
            total = total + parseInt($price.text());
        }).then(() => {
            cy.get('[class^=burger-constructor_counting] span').invoke('text').then(text => expectedTotal =+ text).then(() => {
                expect(total).equal(expectedTotal);
            });
        });

        cy.get('@sauce').find('[class^=counter_counter__num]').as('sauceCount');
        cy.get('@sauceCount').should('contain', 1);
    })

    it('Проверяем, что при клике на ингредиент открывается модальное окно с подробной информацией о выбранном ингредиенте', function() {
        cy.get('[data-type="bun"]').first().as('bun').click();
        cy.get('[class^=modal_modal').as('modal');

        cy.get('@modal').should('be.visible');

        //href ингредиента совпадает с url
        cy.get('@bun').find('a').invoke('attr', 'href').then(attr => {
            cy.url().should('include', attr);
        });      

        cy.get('@bun').find('[class^=burger-ingredients-item_itemName]').invoke('text').then(text => {
            cy.get('@modal').find('[class^=ingredient-details_detailsContainer] > span').should('contain', text);
        })

        cy.get('@modal').find('[class^=modal_closeModal]').first().click();
        cy.get('@modal').should('not.exist');
    })

    it('Проверяем создание заказа, отображение информации о созданном заказе в модальном окне и удаление ингредиентов из конструктора после создания заказа', function() {
        cy.get('[class^=burger-constructor_counting]').find('button').wait(1000).click();
        
        cy.get('[class^=modal_modal').as('modal');
        cy.get('@modal').should('be.visible');

        cy.get('@modal').find('[class^=order-details_orderDescr]').should('contain', 'Заказ оформляется...');

        cy.get('@modal').find('[class^=order-details_orderNumber]', { timeout: 30000 }).invoke('text').should('not.be.empty');

        cy.get('@modal').find('[class^=modal_closeModal]').first().click();
        cy.get('@modal').should('not.exist');

        cy.get('[class^=burger-constructor_fillingInnerList]').as('fillingInnerList');
        cy.get('@fillingInnerList', { timeout: 1000 }).contains('Выберите начинку').should('be.visible');
    })

})