/// <reference types="cypress"/>

describe('Deve cadastrar um dispositivo', () => {

    let deviceId // variavel global para armazenar o id do dispositivo criado

    it('Cadastrar um novo dispositivo', () => {
        cy.request({
            method: "POST",
            url: "https://api.restful-api.dev/objects",
            body: {
                name: "PC Qazando 3.0",
                data: {
                    year: 2024,
                    price: 1999.99,
                    "CPU model": "Intel Core i5",
                    "Hard disk size": "10 TB"
                }
            }
        })
            .then((resultado) => {
                expect(resultado.status).to.equal(200)
                expect(resultado.body).to.have.property('id')
                expect(resultado.body.name).to.equal("PC Qazando 3.0")

                deviceId = resultado.body.id // salva o id retornado
            })
    })

    it('Deve deletar o dispositivo criado', () => {
        cy.request({
            method: "DELETE",
            url: `https://api.restful-api.dev/objects/${deviceId}`
        }).then((resultado) => {
            expect(resultado.status).to.equal(200)
            expect(resultado.body.message).to.equal(`Object with id = ${deviceId} has been deleted.`)
        })
    })
})
