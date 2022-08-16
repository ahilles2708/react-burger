import { IItemProps, IOrderNewData, TOrder } from "../types";

export const newOrder: Readonly<IOrderNewData> = {
    "ingredients": [
      {
        "_id": "60d3b41abdacab0026a733c7",
        "name": "Флюоресцентная булка R2-D3",
        "type": "bun",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/bun-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
        "__v": 0
      },
      {
        "_id": "60d3b41abdacab0026a733c9",
        "name": "Мясо бессмертных моллюсков Protostomia",
        "type": "main",
        "proteins": 433,
        "fat": 244,
        "carbohydrates": 33,
        "calories": 420,
        "price": 1337,
        "image": "https://code.s3.yandex.net/react/code/meat-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
        "__v": 0
      },
      {
        "_id": "60d3b41abdacab0026a733c7",
        "name": "Флюоресцентная булка R2-D3",
        "type": "bun",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/bun-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
        "__v": 0
      }
    ],
    "_id": "62f92ef842d34a001c280c0d",
    "owner": {
      "name": "test1",
      "email": "ahilles27@mail.ru",
      "createdAt": "2022-05-15T21:12:32.713Z",
      "updatedAt": "2022-07-07T18:54:16.452Z"
    },
    "status": "done",
    "name": "Бессмертный флюоресцентный бургер",
    "createdAt": "2022-08-14T17:20:56.404Z",
    "updatedAt": "2022-08-14T17:20:56.654Z",
    "number": 22925,
    "price": 3313
  }

export const orders: ReadonlyArray<TOrder> = [
    {
        name: "Space флюоресцентный бургер",
        _id: "6224ccfc25b9a4001b6e2f5e",
        number: 10000,
        status: "done",
        createdAt: "2022-06-23T20:46:10.047Z",
        updatedAt: "2022-06-23T20:46:10.236Z",
        ingredients: [
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733cd"
        ]
    },
    {
        name: "Фалленианский антарианский краторный бургер",
        _id: "62c1ff6a42d34a001c2741a6",
        number: 10001,
        status: "done",
        createdAt: "2022-06-23T20:43:22.132Z",
        updatedAt: "2022-06-23T20:43:22.334Z",
        ingredients: [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733cf",
            "60d3b41abdacab0026a733d1"
        ]
    },
    {
        name: "Space флюоресцентный бургер",
        _id: "62c1f15d42d34a001c27414c",
        number: 10002,
        status: "done",
        createdAt: "2022-06-23T19:43:25.920Z",
        updatedAt: "2022-06-23T19:43:26.130Z",
        ingredients: [
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733cd",
            "60d3b41abdacab0026a733c7"
        ]
    },
];

export const bun: IItemProps = {
    "_id":"60d3b41abdacab0026a733c6",
    "name":"Краторная булка N-200i",
    "type":"bun",
    "proteins":80,
    "fat":24,
    "carbohydrates":53,
    "calories":420,
    "price":1255,
    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v":0
};

export const ingredients: ReadonlyArray<IItemProps> = [
    {
        "_id":"60d3b41abdacab0026a733c8",
        "name":"Филе Люминесцентного тетраодонтимформа",
        "type":"main",
        "proteins":44,
        "fat":26,
        "carbohydrates":85,
        "calories":643,
        "price":988,
        "image":"https://code.s3.yandex.net/react/code/meat-03.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png",
        "__v":0
    },
    {
        "_id":"60d3b41abdacab0026a733cf",
        "name":"Соус с шипами Антарианского плоскоходца",
        "type":"sauce",
        "proteins":101,
        "fat":99,
        "carbohydrates":100,
        "calories":100,
        "price":88,
        "image":"https://code.s3.yandex.net/react/code/sauce-01.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/sauce-01-large.png",
        "__v":0
    },
    {
        "_id":"60d3b41abdacab0026a733c9",
        "name":"Мясо бессмертных моллюсков Protostomia",
        "type":"main",
        "proteins":433,
        "fat":244,
        "carbohydrates":33,
        "calories":420,
        "price":1337,
        "image":"https://code.s3.yandex.net/react/code/meat-02.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
        "__v":0
    }
];

export const getItemsRequest = async () => {
    return await new Promise(resolve =>
        setTimeout(() => {
            resolve({
                success: true,
                data: [
                    {
                        "_id":"60d3b41abdacab0026a733c6",
                        "name":"Краторная булка N-200i",
                        "type":"bun",
                        "proteins":80,
                        "fat":24,
                        "carbohydrates":53,
                        "calories":420,
                        "price":1255,
                        "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                        "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                        "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png","__v":0
                    },
                    {
                        "_id":"60d3b41abdacab0026a733c7",
                        "name":"Флюоресцентная булка R2-D3",
                        "type":"bun",
                        "proteins":44,
                        "fat":26,
                        "carbohydrates":85,
                        "calories":643,
                        "price":988,
                        "image":"https://code.s3.yandex.net/react/code/bun-01.png",
                        "image_mobile":"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                        "image_large":"https://code.s3.yandex.net/react/code/bun-01-large.png",
                        "__v":0
                    },
                    {
                        "_id":"60d3b41abdacab0026a733c8","name":"Филе Люминесцентного тетраодонтимформа","type":"main","proteins":44,"fat":26,"carbohydrates":85,"calories":643,"price":988,"image":"https://code.s3.yandex.net/react/code/meat-03.png","image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png","image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png","__v":0
                    },
                    {
                        "_id":"60d3b41abdacab0026a733c9","name":"Мясо бессмертных моллюсков Protostomia","type":"main","proteins":433,"fat":244,"carbohydrates":33,"calories":420,"price":1337,"image":"https://code.s3.yandex.net/react/code/meat-02.png","image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png","image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png","__v":0
                    },
                    {
                        "_id":"60d3b41abdacab0026a733ca","name":"Говяжий метеорит (отбивная)","type":"main","proteins":800,"fat":800,"carbohydrates":300,"calories":2674,"price":3000,"image":"https://code.s3.yandex.net/react/code/meat-04.png","image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png","image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png","__v":0
                    },
                    {
                        "_id":"60d3b41abdacab0026a733cb","name":"Биокотлета из марсианской Магнолии","type":"main","proteins":420,"fat":142,"carbohydrates":242,"calories":4242,"price":424,"image":"https://code.s3.yandex.net/react/code/meat-01.png","image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png","image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png","__v":0
                    },
                    {
                        "_id":"60d3b41abdacab0026a733cc","name":"Соус Spicy-X","type":"sauce","proteins":30,"fat":20,"carbohydrates":40,"calories":30,"price":90,"image":"https://code.s3.yandex.net/react/code/sauce-02.png","image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png","__v":0
                    },
                    {
                        "_id":"60d3b41abdacab0026a733cd","name":"Соус фирменный Space Sauce","type":"sauce","proteins":50,"fat":22,"carbohydrates":11,"calories":14,"price":80,"image":"https://code.s3.yandex.net/react/code/sauce-04.png","image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png","__v":0
                    },
                    {
                        "_id":"60d3b41abdacab0026a733ce","name":"Соус традиционный галактический","type":"sauce","proteins":42,"fat":24,"carbohydrates":42,"calories":99,"price":15,"image":"https://code.s3.yandex.net/react/code/sauce-03.png","image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png","__v":0
                    },
                    {
                        "_id":"60d3b41abdacab0026a733cf","name":"Соус с шипами Антарианского плоскоходца","type":"sauce","proteins":101,"fat":99,"carbohydrates":100,"calories":100,"price":88,"image":"https://code.s3.yandex.net/react/code/sauce-01.png","image_mobile":"https://code.s3.yandex.net/react/code/sauce-01-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sauce-01-large.png","__v":0
                    },
                    {
                        "_id":"60d3b41abdacab0026a733d0","name":"Хрустящие минеральные кольца","type":"main","proteins":808,"fat":689,"carbohydrates":609,"calories":986,"price":300,"image":"https://code.s3.yandex.net/react/code/mineral_rings.png","image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png","image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png","__v":0
                    },
                    {
                        "_id":"60d3b41abdacab0026a733d1","name":"Плоды Фалленианского дерева","type":"main","proteins":20,"fat":5,"carbohydrates":55,"calories":77,"price":874,"image":"https://code.s3.yandex.net/react/code/sp_1.png","image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png","__v":0
                    },
                    {
                        "_id":"60d3b41abdacab0026a733d2","name":"Кристаллы марсианских альфа-сахаридов","type":"main","proteins":234,"fat":432,"carbohydrates":111,"calories":189,"price":762,"image":"https://code.s3.yandex.net/react/code/core.png","image_mobile":"https://code.s3.yandex.net/react/code/core-mobile.png","image_large":"https://code.s3.yandex.net/react/code/core-large.png","__v":0
                    },
                    {
                        "_id":"60d3b41abdacab0026a733d3","name":"Мини-салат Экзо-Плантаго","type":"main","proteins":1,"fat":2,"carbohydrates":3,"calories":6,"price":4400,"image":"https://code.s3.yandex.net/react/code/salad.png","image_mobile":"https://code.s3.yandex.net/react/code/salad-mobile.png","image_large":"https://code.s3.yandex.net/react/code/salad-large.png","__v":0
                    },
                    {
                        "_id":"60d3b41abdacab0026a733d4","name":"Сыр с астероидной плесенью","type":"main","proteins":84,"fat":48,"carbohydrates":420,"calories":3377,"price":4142,"image":"https://code.s3.yandex.net/react/code/cheese.png","image_mobile":"https://code.s3.yandex.net/react/code/cheese-mobile.png","image_large":"https://code.s3.yandex.net/react/code/cheese-large.png","__v":0}
                ]
             });
        }, 3500)
    );
};