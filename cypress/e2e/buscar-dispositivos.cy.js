/// <reference types="cypress"/>

describe('Buscar Dispositovs', () => {

    it('Deve retornar todos os dispositivos', () => {
        cy.request({
            method: "GET",
            url: "https://api.restful-api.dev/objects"
        })
            .then((resultado) => {
                expect(resultado.status).equal(200)
                expect(resultado.body).to.be.an('array') //Validando se retorna um array
                //expect(resultado.body.length).to.be.greaterThan(0) // Validando um quantidade minima ou esperada 
            })
    })


    it('Deve buscar um dispositivo especifico', () => {
        cy.request({
            method: "GET",
            url: "https://api.restful-api.dev/objects/3"
        })
            .then((resultado) => {
                // será executado quando a requisição responder
                expect(resultado.status).equal(200)
                expect(resultado.body.id).equal('3')
                //expect(resultado.body.name).equal('Apple iPhone 12 Pro Max') -- Validação por nome
            })
    })

    it('Deve buscar um dispositivo inexistente', () => {
        cy.request({
            method: "GET",
            url: "https://api.restful-api.dev/objects/iddofinotti",
            failOnStatusCode: false
        })
            .then((resultado) => {
                expect(resultado.status).equal(404)
                //expect(resultado.body.error).equal('Oject with id=iddofinotti was not found')
                expect(resultado.body.error).to.be.a('string') //outra forma de validação
            })
    })
})