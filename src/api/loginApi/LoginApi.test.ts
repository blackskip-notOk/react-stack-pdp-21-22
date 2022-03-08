import React from 'react';
import {rest} from 'msw';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { fetchInizialize } from './LoginApi';
import { server } from '../../mocks/server.js';
import { API } from 'src/constants/apiConstants';

test("if user didn't login fetchInizialize should return error resultCode", async () => {
    server.use(
        // rest.get(API.authMe, (req, res, ctx) => {
            // return res()
        // }

        // )
    )
})