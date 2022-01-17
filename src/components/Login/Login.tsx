import React from "react";
import {LoginForm} from "./LoginForm";
// import style from './style/index.module.scss';

export const Login = () => {
    return (
        <div>
            <h1>demo react app</h1>
            <p>
                This is my <span>demo app</span>. Here I study how create,
                develop and support app used on <span>React - Redux</span> technologies.
            </p>
            <LoginForm />
            <div>
                <h2>Or you can create account:</h2>
                <a href={'https://social-network.samuraijs.com/signUp'} target='_blanc'>
                    <button type='button' />
                </a>
            </div>
        </div>
    );
}