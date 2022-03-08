import { response, rest } from 'msw';
import { API } from '../constants/apiConstants';
import { $inizialize } from '../effector/initialStore/InitialStore';
import { useStore } from 'effector-react';

// const { inizialized } = useStore($inizialize);

const inizialized = false;

export const handlers = [
    rest.get(API.authMe, (req, res, ctx) => {
        if (!inizialized) {
            return res(
                ctx.status(200),
                ctx.json({
                    data: {},
                    fieldsErrors: [],
                    messages: ["You are not authorized"],
                    resultCode: 1,
                })
            )
        }

        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    id: 2,
                    email: 'blabla@bla.bla',
                    login: 'samurai'
                  },
                  fieldsErrors: [],
                  messages: [],
                  resultCode: 0
            })
        )
    }),

    rest.post(API.login, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    resultCode: 0,
                    messages: [],
                    data: { userId: 2 },
                }),
        )
    }),
];